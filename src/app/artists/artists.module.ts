import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
