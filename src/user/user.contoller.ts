import { Controller, Get, Post, Put, Delete, Body, UnprocessableEntityException, ValidationPipe, Param, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "src/entities/user.entity";
import { UserModel } from "src/models/user.model";
import { UpdateResult } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@Controller('user')
export class UserContoller {
    
    constructor(private userService: UserService) {}
    
    @Get('test')
    public async index(@Request() request): Promise<string> {
        return await this.userService.index();
    }

    @Post()
    public async create(
        @Body(new ValidationPipe()) user: UserModel
    ): Promise<UserEntity> {

        const usernameExists = await this.userService.findByName(user.username);

        if (usernameExists) {
            throw new UnprocessableEntityException();
        }

        return await this.userService.create(user);

    }

    @Put( "/{id}" )
    public async update(
        @Param('id') id: number,
        @Body(new ValidationPipe()) user: UserModel
    ): Promise<UpdateResult> {

        const userEntity = await this.userService.findById(id);

        if (!userEntity) {
            throw new NotFoundException();
        }

        return await this.userService.update({
            ...userEntity,
            ...user
        })

    }

    @Get( "/{id}" )
    public async show(@Param('id') id: number): Promise<UserEntity> {
        const user = await this.userService.findById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

}