import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {TaskDataService} from "./taskdata/taskdata.service";
import {DatabaseService} from "./database/database.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly taskdataService: TaskDataService,
              private readonly databaseService: DatabaseService
  ) {}

  @Get('/get-all-tasks')
  async getAllTasks() {
    return await this.taskdataService.findAll({ order: { id: 'ASC' } });
  };

  @Get('/get-one-task')
  async getOneTask(@Query('taskId') taskId: number) {
    return await this.taskdataService.findOne({ where: { id: taskId } });
  }

  @Get('/get-raw-query-result')
  async getRawQueryResult(
      @Query('rawQuery') rawQuery,
      @Query('database') database
  ) {
    return await this.appService.getRawQueryResult(rawQuery, database);
  }

  @Get('/get-all-db')
  async getAllDb() {
    return await this.databaseService.findAll();
  }
  @Post('/save-one-task')
  async saveOneTask(@Body() task: Object) {
    console.log(task);
    return await this.taskdataService.saveOne(task);
  }
}
