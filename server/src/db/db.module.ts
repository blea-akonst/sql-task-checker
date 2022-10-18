import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { Database } from "../database/database.entity";
import { TaskData } from "../taskdata/taskdata.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: '123456',
        database: 'data',
        schema: 'public',
        entities: [Database, TaskData],
        synchronize: true,
    })]
})
export class DbModule {}
