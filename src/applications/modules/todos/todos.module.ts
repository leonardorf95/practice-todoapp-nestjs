import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from 'src/domain/entities/todo.entity';
import { TodosService } from './services/todos.service';
import { TodoController } from 'src/api/controllers/todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  providers: [TodosService],
  controllers: [TodoController],
  exports: [TodosService],
})
export class TodosModule {}
