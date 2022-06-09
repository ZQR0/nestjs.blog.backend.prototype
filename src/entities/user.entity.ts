import { BaseEntityEx } from "./base.entity";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends BaseEntityEx {

    @Column({
        unique: true
    })
    username: string;

    @Column({
        select: false
    })
    password: string;

    @Column({
        default: true
    })
    isActive: boolean;

}