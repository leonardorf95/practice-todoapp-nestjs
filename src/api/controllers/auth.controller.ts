import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/applications/modules/auth/services/auth.service';
import { SessionService } from 'src/applications/modules/sessions/services/session.service';
import { User } from 'src/domain/entities/user.entity';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user as User;

    return await this.authService.generateJwt(user);
  }

  @Get('logout')
  async logout(@Req() req: Request) {
    const user = req.user as User;

    return await this.sessionService.remove(user);
  }
}
