import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { UserEntity } from "src/entities/user.entity";
import { UserModel } from "src/models/user.model";

@Injectable()
export class UserService {
    
    private saltRounds: number;

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    public async index(): Promise<string> {
        const result: string = await 'User service works!!!';

        return result;
    }

    public async create(user: UserModel): Promise<UserEntity> {
        const result = await this.usersRepository.save(
            this.usersRepository.create(user)
        )

        return result;
    }

    public async findById(id: number): Promise<UserEntity | null> {
        const result = await this.usersRepository.findOneOrFail({
            where: {
                id
            }
        });

        return result;
    }

    public async findByName(username: string): Promise<UserEntity | null> {
        const result = await this.usersRepository.findOne({
            where: {
                username,
            }
        })

        return result;
    }

    public async destroy(id: number): Promise<DeleteResult> {
        const result = await this.usersRepository.delete(id);

        return result;
    }

    public async update(user: UserEntity): Promise<UpdateResult> {
        return await this.usersRepository.update(user.id, user);
    }
}