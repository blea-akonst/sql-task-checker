import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DbModule } from './db/db.module';
import { DatabaseModule } from "./database/database.module";
import { TaskDataModule } from "./taskdata/taskdata.module";

@Module({
  imports: [DbModule, DatabaseModule, TaskDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
