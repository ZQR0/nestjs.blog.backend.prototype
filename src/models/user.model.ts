import { IsEmail, IsString } from "class-validator";

export class UserModel {
    readonly id: number;

    @IsString()
    username: string;

    @IsString()
    password: string;
}