import { Injectable } from '@nestjs/common';
import { DataSource } from "typeorm";

@Injectable()
export class AppService {
  async getRawQueryResult(rawQuery, database) {
    const AppDataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "olymp_user",
      password: "user",
      database: database,
      schema: 'public',
      synchronize: true,
    });

    const appDataSource = await AppDataSource.initialize();
    const queryRunner = await appDataSource.createQueryRunner();

    return await queryRunner.manager.query(
        `${rawQuery}`
    );
  }
}
