import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Database } from "./database.entity";

@Injectable()
export class DatabaseService {
    constructor(@InjectRepository(Database) private readonly databaseRepository: Repository<Database>) {}

    async findAll(): Promise<Database[]> {
        return await this.databaseRepository.find();
    }
}