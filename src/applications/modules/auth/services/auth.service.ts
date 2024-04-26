import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services/user.service';
import { SessionService } from '../../sessions/services/session.service';
import { User } from 'src/domain/entities/user.entity';
import { PayloadToken } from 'src/domain/contracts/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sessionsService: SessionService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return null;

    return user;
  }

  async generateSession(access_token: string, user: User) {
    const session = {
      accessToken: access_token,
      user,
    };

    return await this.sessionsService.create(session);
  }

  async generateJwt(user: User) {
    const payload: PayloadToken = {
      sub: user.id,
      role: user.role,
      name: user.fullName,
      email: user.email,
    };

    const access_token: string = this.jwtService.sign(payload);

    await this.generateSession(access_token, user);

    return {
      access_token,
      user,
    };
  }
}
