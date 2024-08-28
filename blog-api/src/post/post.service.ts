import {Injectable, NotFoundException, ForbiddenException} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {Post} from './post.entity';
import {PostHistory} from './post-history.entity';
import {Comment} from "../comment/comment.entity";

@Injectable()
export class PostService {
    private posts: Post[] = [];
    private postHistories: PostHistory[] = [];
    private comments: Comment[] = [];


    create(createPostDto: CreatePostDto) {
        const post = new Post();
        post.id = this.posts.length + 1;
        post.user_id = createPostDto.user_id;
        post.title = createPostDto.title;
        post.description = createPostDto.description;
        post.image = createPostDto.image;
        this.posts.push(post);
        return post;
    }

    findAll(): Post[] {
        return this.posts;
    }

    findOne(id: number): Post {
        const post = this.posts.find(post => post.id === id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    update(id: number, userId: number, updatePostDto: UpdatePostDto): Post {
        const post = this.findOne(id);
        if (post.user_id !== userId) {
            throw new ForbiddenException('You can only edit your own posts');
        }

        const postHistory = new PostHistory();
        postHistory.id = this.postHistories.length + 1;
        postHistory.post_id = post.id;
        postHistory.description = post.description;
        postHistory.edited_at = new Date();
        this.postHistories.push(postHistory);

        post.title = updatePostDto.title;
        post.description = updatePostDto.description;
        post.image = updatePostDto.image;
        return post;
    }

    remove(id: number, userId: number): void {
        const post = this.findOne(id);
        if (post.user_id !== userId) {
            throw new ForbiddenException('You can only delete your own posts');
        }
        this.posts = this.posts.filter(post => post.id !== id);
    }

    incrementViews(id: number): void {
        const post = this.findOne(id);
        post.views += 1;
    }

    likePost(id: number): void {
        const post = this.findOne(id);
        post.likes += 1;
    }

    dislikePost(id: number): void {
        const post = this.findOne(id);
        post.dislikes += 1;
    }

    generateReport() {
        return this.posts.map(post => {
            const postComments = this.comments.filter(comment => comment.post_id === post.id);
            return {
                title: post.title,
                commentsCount: postComments.length,
                views: post.views,
                likes: post.likes,
                dislikes: post.dislikes,
            };
        });
    }
}
