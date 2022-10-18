import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TaskData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    description: string;

    @Column({
        nullable: false,
    })
    right_query: string;

    @Column({
        nullable: false,
    })
    db_name: string;
}