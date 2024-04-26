import { IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';
import { User } from '../entities/user.entity';

export class FiltersDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  id: number;

  @IsOptional()
  ordering: string;

  @IsOptional()
  field: string;

  @IsOptional()
  user: User;
}
