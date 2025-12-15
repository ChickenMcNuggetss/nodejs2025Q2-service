import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { LoggingService } from '../logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url} ${JSON.stringify(req.body)}`,
      );
    });
    next();
  }
}
