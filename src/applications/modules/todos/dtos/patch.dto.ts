import { IsBoolean, IsOptional } from 'class-validator';
import { User } from '../../../../domain/entities/user.entity';

export class PatchTodoDto {
  @IsBoolean()
  isCompleted: boolean;

  @IsOptional()
  user: User;
}
