import { IsString } from "class-validator";

export class AuthModel {

    @IsString()
    username: string

    @IsString()
    password: string

}