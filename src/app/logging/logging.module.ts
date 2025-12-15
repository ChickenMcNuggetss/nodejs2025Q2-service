import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LogFileService } from './services/log-file.service';

@Module({
  providers: [LoggingService, LogFileService],
  exports: [LoggingService],
})
export class LoggingModule {}
