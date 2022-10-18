import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskDataController } from "./taskdata.controller";
import { TaskDataService } from "./taskdata.service";
import { Module } from "@nestjs/common";
import { TaskData } from "./taskdata.entity";

@Module({
    providers: [TaskDataService],
    imports: [TypeOrmModule.forFeature([TaskData])],
    exports: [TaskDataService],
    controllers: [TaskDataController],
})
export class TaskDataModule {}