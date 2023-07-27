import { NestMiddleware, BadRequestException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddlaware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('ID Inválido');
    }

    next();
  }
}
