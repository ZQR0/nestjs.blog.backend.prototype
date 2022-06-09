import { Injectable, BadRequestException } from "@nestjs/common";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { JwtPayloadInterface } from "./auth.jwt.interface";
import { AuthModel } from "src/models/auth.model";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    public async validateUser(payload: JwtPayloadInterface): Promise<UserEntity | null> {
        return await this.userService.findById(payload.id);
    }

    public async authenticate(auth: AuthModel): Promise<string> {
        const user = await this.userService.findByName(auth.username);

        if (!user) {
            throw new BadRequestException();
        }

        return this.jwtService.sign({id: user.id});
    }

}