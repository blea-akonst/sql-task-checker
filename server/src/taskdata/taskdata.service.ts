import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TaskData} from "./taskdata.entity";

@Injectable()
export class TaskDataService {
    constructor(@InjectRepository(TaskData) private readonly taskdataRepository: Repository<TaskData>) {}

    async findAll(params?): Promise<TaskData[]> {
        return await this.taskdataRepository.find(params);
    }

    async findOne(params): Promise<TaskData> {
        return await this.taskdataRepository.findOne(params);
    }

    async saveOne(task): Promise<TaskData> {
        const taskEntity = new TaskData();

        if (task.id) {
            taskEntity.id = +(task.id);
        }
        taskEntity.name  = task.name;
        taskEntity.description = task.description;
        taskEntity.db_name = task.db_name;
        taskEntity.right_query = task.right_query;

        console.log(taskEntity);

        return await this.taskdataRepository.save(taskEntity);
    }
}