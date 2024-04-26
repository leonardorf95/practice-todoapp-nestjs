import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/domain/entities/session.entity';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { SessionDto } from '../dtos/session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async create(payload: SessionDto) {
    try {
      const newSession = this.sessionRepository.create(payload);

      if (!newSession.user) {
        throw new BadRequestException(
          'No se asigno ningun usuario a la sesisón',
        );
      }

      const existSession = await this.findOne(payload.user);

      if (existSession) {
        await this.remove(null, existSession.id);
      }

      return await this.sessionRepository.save(newSession);
    } catch (error) {
      throw new BadRequestException(
        'Error al generar la petición crear una nueva sesión',
      );
    }
  }

  async findOne(user: User) {
    try {
      return await this.sessionRepository.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Error al generar la petición consultar todos los usuario',
      );
    }
  }

  async remove(user: User = null, sessionId: number = null) {
    try {
      let lastSession: any;
      let id: number = 0;

      if (user) {
        lastSession = await this.findOne(user);
        id = lastSession.id;
      } else {
        id = sessionId;
      }

      return await this.sessionRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(
        'Error al generar la petición de remover la session',
      );
    }
  }
}
