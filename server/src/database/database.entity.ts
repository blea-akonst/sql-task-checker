import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Database {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
}