import { Module } from '@nestjs/common';
import { AuthController } from 'src/api/controllers/auth.controller';
import { JwtStratergy } from 'src/infrastructure/strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { LocalStratergy } from 'src/infrastructure/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/common/configs/config';
import { ConfigType } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [
    UsersModule,
    SessionsModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '60m',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStratergy, JwtStratergy],
})
export class AuthModule {}
