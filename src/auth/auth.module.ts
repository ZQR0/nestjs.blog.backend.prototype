import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [AuthService, UserService, JwtService],
    controllers: [AuthController],
    imports: [UserModule]
})
export class AuthModule {}
