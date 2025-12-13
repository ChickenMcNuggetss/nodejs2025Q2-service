import { Injectable, Logger } from '@nestjs/common';
import { LogFileService } from './log-file/log-file.service';
import { LogLevel } from '../enums/log-levels';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger('loggingService', { timestamp: true });
  private logFileService = new LogFileService();

  log(message: string) {
    this.logFileService.write(message, LogLevel.Log);
    this.logger.log(message);
  }

  error(message: string) {
    this.logFileService.write(message, LogLevel.Error);
    this.logger.error(`Error: ${message}`);
  }
}
