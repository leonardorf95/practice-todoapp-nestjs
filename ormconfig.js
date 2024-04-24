module.exports = {
  type: 'postgres',
  host: '192.168.0.103',
  port: 5432,
  username: 'postgres',
  password: 'Admin$01',
  database: 'todo-app',
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
