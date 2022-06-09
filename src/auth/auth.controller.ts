import { Controller, Get, Post, Body, Param, ValidationPipe, UnprocessableEntityException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthModel } from "src/models/auth.model";
import { UserModel } from "src/models/user.model";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Get('test')
    public async index(): Promise<string> {
        const result: string = 'Auth works';

        return result;
    }

    @Post('login/')
    public async login(@Body(new ValidationPipe()) auth: AuthModel): Promise<string> {
        const result = await this.authService.authenticate(auth);

        return result;
    }

    @Post('register/')
    public async register(@Body(new ValidationPipe()) userModel: UserModel): Promise<string> {
        const usernameExists = await this.userService.findByName(userModel.username);

        if (usernameExists) {
            throw new UnprocessableEntityException();
        }

        const user = await this.userService.create(userModel);

        return this.authService.authenticate(user);
        
    }
}