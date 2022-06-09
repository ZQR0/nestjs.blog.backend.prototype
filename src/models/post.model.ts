import { IsString, isString } from "class-validator";

export class PostModel {

    readonly id: number

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    creator: string;

}