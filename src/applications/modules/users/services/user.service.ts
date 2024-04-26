import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/roles.enum';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new NotFoundException('No se encontro al usuario');

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Se ha producido un error en UsersService.findByEmail -> ',
        error.message,
      );
    }
  }

  async created(payload: CreateUserDto) {
    try {
      const user = this.userRepository.create(payload);
      const hasPassword = await bcrypt.hash(user.password, 10);
      user.password = hasPassword;
      user.role = !user.role
        ? Role.ADMINISTRATOR
        : Role[payload.role.toUpperCase()];

      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }

  async getOne(id: number) {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });

      if (!user) throw new NotFoundException('No se encontro al usuario');

      return user;
    } catch (error) {
      throw new NotFoundException('No se encontro al usuario');
    }
  }
}
