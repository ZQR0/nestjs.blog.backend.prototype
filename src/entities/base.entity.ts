import { Entity, PrimaryGeneratedColumn } from "typeorm";

// Base entity
@Entity()
export class BaseEntityEx {

    @PrimaryGeneratedColumn()
    id: number

}