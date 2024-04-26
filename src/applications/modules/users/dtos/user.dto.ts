import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @Length(8)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
