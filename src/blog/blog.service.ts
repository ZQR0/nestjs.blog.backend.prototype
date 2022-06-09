import { Injectable, Response } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostEntity } from "src/entities/post.entity";
import { PostModel } from "src/models/post.model";
import { Repository, DeleteResult, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { threadId } from "worker_threads";


@Injectable()
export class BlogService {
    
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
    ) {}

    public async index(): Promise<string> {
        const result = 'Blog Service works';

        return result;
    }

    public async createPost(post: PostModel): Promise<PostEntity> {

        
        const result = await this.postsRepository.save(
            this.postsRepository.create(post)
        );

        return result;
    }

    public async updatePost(post: PostModel): Promise<UpdateResult> {
        return await this.postsRepository.update(post.id, post);
    }

    public async deletePost(id: number): Promise<DeleteResult> {
        return await this.postsRepository.delete(id);
    }

    public async findPostById(id: number): Promise<PostEntity | null | string> {
        const post = await this.postsRepository.findOneOrFail({
            where: {
                id
            }
        })

        if (!post) {
            return await "No post with this ID";
        }

        return post;
    }

    // public async findBySlug(slug: string): Promise<PostEntity | null> {
    //     return await this.postsRepository.findOneOrFail({
    //         where: {
    //             slug
    //         }
    //     })
    // }

    // public async uniqueSlug(post: PostModel): Promise<PostModel | null> {
    //     post.slug = await this.slugProvider.slugify(post.title);
    //     const exists = await this.findSlugs(post.slug);

    //     if (!exists || exists.length === 0) {
    //         return post;
    //     }
        
    //     if (exists.length === 1 && post.id === exists[0].id) {
    //         return post;
    //     }

    //     post.slug = post.slug + this.slugProvider.replacement() + exists.length

    //     return await post;
    // }

    // private async findSlugs(slug: string): Promise<PostEntity[]> {
    //     return await this.postsRepository.createQueryBuilder('post').where('slug like :slug', { slug: `${slug}%` }).getMany();
    // }

}