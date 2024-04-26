import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { User } from '../../../../domain/entities/user.entity';

export class TodoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsOptional()
  user: User;
}

export class UpdateTodoDto extends PartialType(TodoDto) {}
