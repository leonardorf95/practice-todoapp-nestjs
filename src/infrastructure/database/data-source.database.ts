import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: '192.168.0.103',
  port: 5432,
  username: 'postgres',
  password: 'Admin$01',
  database: 'todo-app',
  synchronize: false,
  logging: false,
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['src/domain/entities/*.entity.ts'],
});
