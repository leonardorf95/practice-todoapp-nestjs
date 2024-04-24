import { Module } from '@nestjs/common';
import { AuthController } from 'src/api/controllers/auth.controller';

@Module({ imports: [], controllers: [AuthController] })
export class AuthModule {}
