import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/domain/entities/session.entity';
import { SessionService } from './services/session.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionService],
  controllers: [],
  exports: [SessionService],
})
export class SessionsModule {}
