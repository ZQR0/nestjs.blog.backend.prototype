import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { PostEntity } from './entities/post.entity';
import { BaseEntityEx } from './entities/base.entity';
import { ChatModule } from './chat/chat.module'

@Module({
  imports: [
    BlogModule,
    AuthModule,
    UserModule,
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Your db password',
      database: 'nestblog',
      entities: [UserEntity, PostEntity, BaseEntityEx],
      synchronize: true, 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
