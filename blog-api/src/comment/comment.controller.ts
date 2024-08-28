import {Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import {CommentService} from './comment.service';
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }

    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto);
    }

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        const userId = 1; // Substitua pelo ID do usuário autenticado
        return this.commentService.update(+id, userId, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        const userId = 1; // Substitua pelo ID do usuário autenticado
        return this.commentService.remove(+id, userId);
    }
}
