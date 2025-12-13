import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger('loggingService', { timestamp: true });

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string) {
    this.logger.error(`Error: ${message}`);
  }
}
