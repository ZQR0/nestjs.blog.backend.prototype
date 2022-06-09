import { BaseEntityEx } from "./base.entity";
import { Entity, Column } from "typeorm";

@Entity()
export class PostEntity extends BaseEntityEx {

    @Column()
    title: string;

    @Column()
    content: string;


    @Column()
    published: boolean = true;

    @Column({
        type: Date,
        nullable: true
    })
    published_at: Date | null;

}