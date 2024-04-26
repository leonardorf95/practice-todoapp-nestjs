import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PatchTodoDto } from 'src/applications/modules/todos/dtos/patch.dto';
import {
  TodoDto,
  UpdateTodoDto,
} from 'src/applications/modules/todos/dtos/todo.dto';
import { TodosService } from 'src/applications/modules/todos/services/todos.service';
import { FiltersDto } from 'src/domain/dtos/filters.dto';
import { User } from 'src/domain/entities/user.entity';
import { JwtGuard } from 'src/infrastructure/guard/jwt.guard';
import { RolesGuard } from 'src/infrastructure/guard/roles.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('/api/todos')
export class TodoController {
  constructor(private todosService: TodosService) {}

  @Post()
  async created(@Req() req: Request, @Body() payload: TodoDto) {
    const user = req.user as User;
    payload.user = user;
    return await this.todosService.created(payload);
  }

  @Get()
  async findAll(@Req() req: Request, @Query() params: FiltersDto) {
    const user = req.user as User;
    params.user = user;
    return await this.todosService.getAll(params);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const user = req.user as User;
    return await this.todosService.getOne(id, user);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTodoDto,
  ) {
    const user = req.user as User;
    return await this.todosService.updated(id, payload, user);
  }

  @Patch(':id')
  async patch(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PatchTodoDto,
  ) {
    const user = req.user as User;
    return await this.todosService.patched(id, payload, user);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const user = req.user as User;
    return await this.todosService.deleted(id, user);
  }
}
