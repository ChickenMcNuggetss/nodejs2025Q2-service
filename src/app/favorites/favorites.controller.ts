import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.addToFavorites(id, 'tracks');
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addToFavorites(id, 'albums');
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addToFavorites(id, 'artists');
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeFromFavorites(id, 'tracks');
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeFromFavorites(id, 'albums');
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeFromFavorites(id, 'artists');
  }
}
