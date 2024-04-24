import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      throw new UnauthorizedException('No tienes una sesión valida.');
    }

    const bearer = headers.authorization.replace('Bearer ', '');
    const preUser: any = jwt.decode(bearer);

    req.user = {
      sub: preUser.id,
      role: preUser.role,
      name: `${preUser.name} ${preUser.firstName}`,
      email: preUser.email,
    };

    next();
  }
}
