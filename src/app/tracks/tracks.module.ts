import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseService } from '../db/database-service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, DatabaseService],
})
export class TracksModule {}
