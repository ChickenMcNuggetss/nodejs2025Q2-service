import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([Favorite, Track, Artist, Album]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
