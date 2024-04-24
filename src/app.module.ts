import { ConfigModule } from '@nestjs/config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as Joi from 'joi';
import { enviroments } from './common/configs/environments';
import config from './common/configs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { SessionMiddleware } from './api/middleware/session.middleware';
import { ModulesModule } from './api/applications/modules/modules.module';
import { AuthModule } from './applications/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.dev.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_NAME: Joi.string().required(),
        DATABASE_SERVER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        PORT_APP: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ModulesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .exclude({ path: '/api/auth/login', method: RequestMethod.POST })
      .forRoutes(
        { path: '/api/auth/logout', method: RequestMethod.GET },
        { path: '/api/users', method: RequestMethod.ALL },
        { path: '/api/todos', method: RequestMethod.ALL },
      );
  }
}
