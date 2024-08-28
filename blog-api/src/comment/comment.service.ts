import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './comment.entity';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
    private comments: Comment[] = [];

    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService,
    ) {}

    async create(createCommentDto: CreateCommentDto) {
        const comment = new Comment();
        comment.id = this.comments.length + 1;
        comment.user_id = createCommentDto.user_id;
        comment.post_id = createCommentDto.post_id;
        comment.description = createCommentDto.description;
        this.comments.push(comment);

        // Enviar e-mail para o usuário da postagem
        const post = await this.postService.findOne(createCommentDto.post_id);
        const postOwner = await this.userService.findOne(post.user_id);
        // Aqui você pode usar um serviço de e-mail para enviar a notificação
        // emailService.send(postOwner.email, 'Novo comentário em sua postagem', 'Você tem um novo comentário.');

        return comment;
    }

    findAll(): Comment[] {
        return this.comments;
    }

    findOne(id: number): Comment {
        const comment = this.comments.find(comment => comment.id === id);
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }
        return comment;
    }

    update(id: number, userId: number, updateCommentDto: UpdateCommentDto): Comment {
        const comment = this.findOne(id);
        if (comment.user_id !== userId) {
            throw new ForbiddenException('You can only edit your own comments');
        }
        comment.description = updateCommentDto.description;
        return comment;
    }

    remove(id: number, userId: number): void {
        const comment = this.findOne(id);
        if (comment.user_id === userId) {
            comment.removed_by_user = true;
        } else {
            const post = this.postService.findOne(comment.post_id);
            if (post.user_id === userId) {
                comment.removed_by_post_owner = true;
            } else {
                throw new ForbiddenException('You can only delete your own comments or if you are the post owner');
            }
        }
    }
}
