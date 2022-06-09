import { Controller, Get, Post, Put, Delete, Body , ValidationPipe, UnprocessableEntityException, UnauthorizedException, UseGuards, NotFoundException} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { PostEntity } from "src/entities/post.entity";
import { PostModel } from "src/models/post.model";
import { AuthGuard } from "@nestjs/passport";
import { Param } from "@nestjs/common";
import { UpdateResult } from "typeorm";


@UseGuards(AuthGuard('jwt'))
@Controller('blog')
export class BlogController {

    constructor(
        private readonly blogService: BlogService
    ) {}

    @Get('test')
    public async index(): Promise<string> {
        return await "Blog contoller works!!!";
    }

    @Post('create')
    public async createPost(@Body(new ValidationPipe()) post: PostModel): Promise<PostEntity> {
        const exists = await this.blogService.findPostById(post.id);

        if (exists) {
            throw new UnprocessableEntityException();
        }

        return this.blogService.createPost(post);
    }

    @Get('/{id}')
    public async getById(@Param('id') id: number): Promise<PostEntity | string> {
        const post = await this.blogService.findPostById(id);

        if (!post) {
            throw new NotFoundException();
        }

        return post;
    }

    @Put('/{id}')
    public async updatePost(
        @Param('id') id: number,
        @Body(new ValidationPipe()) post: PostModel,
    ): Promise<UpdateResult> {
        const selfPost: PostEntity | string = await this.blogService.findPostById(post.id);

        if (!selfPost) {
            throw new NotFoundException();
        }

        return await this.blogService.updatePost({
            ...selfPost,
            ...post
        });
    }


}