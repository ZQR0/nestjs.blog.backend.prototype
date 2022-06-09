import { Module } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContoller } from './user.contoller';
import { UserService } from './user.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    exports: [TypeOrmModule],
    providers: [UserService],
    controllers: [UserContoller],
})
export class UserModule {}