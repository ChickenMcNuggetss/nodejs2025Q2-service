import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/database-service';
import { DatabaseFavoriteFields } from '../interfaces/db';
import { isUUID } from 'class-validator';

@Injectable()
export class FavoritesService {
  constructor(private dbService: DatabaseService) {}

  findAll() {
    return this.dbService.getFavorites();
  }

  addToFavorites(id: string, field: DatabaseFavoriteFields) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const entityToAdd = this.dbService.getById(field, id);
    if (!entityToAdd) {
      throw new HttpException(
        "Entity doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.dbService.addFavoritesField(field, { ...entityToAdd });
  }

  removeFromFavorites(id: string, field: DatabaseFavoriteFields) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isEntityDeleted = this.dbService.removeFromFavorites(field, id);
    if (!isEntityDeleted) {
      throw new HttpException("Entity doesn't favorite", HttpStatus.NOT_FOUND);
    }
  }
}
