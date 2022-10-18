import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseController } from "./database.controller";
import { DatabaseService } from "./database.service";
import { Module } from "@nestjs/common";
import { Database } from "./database.entity";

@Module({
    providers: [DatabaseService],
    imports: [TypeOrmModule.forFeature([Database])],
    exports: [DatabaseService],
    controllers: [DatabaseController],
})
export class DatabaseModule {}