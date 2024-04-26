import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/applications/modules/users/dtos/user.dto';
import { UsersService } from 'src/applications/modules/users/services/user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtGuard } from 'src/infrastructure/guard/jwt.guard';
import { RolesGuard } from 'src/infrastructure/guard/roles.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async created(@Body() payload: CreateUserDto) {
    return await this.usersService.created(payload);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getOne(id);
  }
}
