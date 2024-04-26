import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../../../domain/entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class SessionDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  user: User;
}

export class UpdateSessionDto extends PartialType(SessionDto) {}
