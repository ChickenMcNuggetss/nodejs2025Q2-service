import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabaseModule } from '../db/database.module';
import { Album } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Album])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
