import { Module } from '@nestjs/common';
import { PostEntity } from 'src/entities/post.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    providers: [BlogService],
    controllers: [BlogController],
    exports: [TypeOrmModule]
})
export class BlogModule {}
