import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiltersDto } from 'src/domain/dtos/filters.dto';
import { Todos } from 'src/domain/entities/todo.entity';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { TodoDto, UpdateTodoDto } from '../dtos/todo.dto';
import { PatchTodoDto } from '../dtos/patch.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos) private todoRepository: Repository<Todos>,
  ) {}

  async created(payload: TodoDto) {
    try {
      const todo = this.todoRepository.create(payload);

      return await this.todoRepository.save(todo);
    } catch (error) {
      throw new BadRequestException('No se pudo crear el negocio');
    }
  }

  async getAll(params?: FiltersDto) {
    try {
      const { limit, offset, ordering, field } = params;
      const where = {};
      const take = limit ? limit : 20;
      const skip = offset ? offset : 0;

      return await this.todoRepository.find({
        where,
        take,
        skip,
        order: {
          [`${field ? field : 'id'}`]: ordering ? ordering : 'DESC',
        },
      });
    } catch (error) {
      throw new BadRequestException('No se pudieron obtener los negocios');
    }
  }

  async getOne(id: number, user: User) {
    const todo = await this.todoRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        id,
      },
    });

    if (!todo)
      throw new NotFoundException('No se encontro el TODO, seleccionado');

    return todo;
  }

  async deleted(id: number, user: User) {
    try {
      await this.getOne(id, user);

      return await this.todoRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(
        'Se produjo un error al intentar eliminar el TODO',
      );
    }
  }

  async updated(id: number, payload: UpdateTodoDto, user: User) {
    try {
      const todo = await this.getOne(id, user);

      const tempUpdated = {
        title: payload.title,
        description: payload.description,
        isCompleted: payload.isCompleted,
      };

      this.todoRepository.merge(todo, tempUpdated);

      return await this.todoRepository.save(todo);
    } catch (error) {
      throw error;
    }
  }

  async patched(id: number, payload: PatchTodoDto, user: User) {
    try {
      const todo = await this.getOne(id, user);

      const tempUpdated = {
        isCompleted: payload.isCompleted,
      };

      this.todoRepository.merge(todo, tempUpdated);

      return await this.todoRepository.save(todo);
    } catch (error) {
      throw error;
    }
  }
}
