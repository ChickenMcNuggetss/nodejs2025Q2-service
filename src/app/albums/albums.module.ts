import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Album])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
