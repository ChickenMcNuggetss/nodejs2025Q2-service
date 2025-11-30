import { Injectable } from '@nestjs/common';
import {
  Database,
  DatabaseArrayFields,
  DatabaseFavoriteFields,
} from '../interfaces/db';

@Injectable()
export class DatabaseService {
  private readonly db: Database = {
    users: [],
    tracks: [],
    artists: [],
    albums: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  } as const;

  getAll<T extends DatabaseArrayFields>(field: T): Database[T] {
    return [...this.db[field]] as Database[T];
  }

  create<T extends DatabaseArrayFields>(field: T, newEntity: Database[T][0]) {
    const dbField = this.db[field];
    // @ts-expect-error We've checked type of new entity already
    dbField.push(newEntity);
    return newEntity;
  }

  delete<T extends DatabaseArrayFields>(field: T, id: string) {
    const entityToDelete = this.db[field].find((entity) => {
      return entity.id === id;
    });
    if (!entityToDelete) {
      return false;
    }
    // @ts-expect-error We've checked type of new entity already
    this.db[field].splice(this.db[field].indexOf(entityToDelete), 1);
    return true;
  }

  update<T extends DatabaseArrayFields>(
    field: T,
    id: string,
    infoToUpdate: Partial<Database[T][0]>,
  ) {
    const entity = this.db[field].find(
      (entity) => entity.id === id,
    ) as Database[T][0];
    // @ts-expect-error We've checked type of new entity already
    const index = this.db[field].indexOf(entity as Database[T][0]);
    this.db[field][index] = {
      ...entity,
      ...infoToUpdate,
    };

    return { ...this.db[field][index] } as Database[T][0];
  }

  getById<T extends DatabaseArrayFields>(field: T, id: string) {
    return this.db[field].find((entity) => entity.id === id) as
      | Database[T][0]
      | undefined;
  }

  getFavorites() {
    return { ...this.db.favorites };
  }

  getInFavoritesById<T extends DatabaseFavoriteFields>(field: T, id: string) {
    return this.db.favorites[field].find((entity) => entity.id === id) as
      | Database['favorites'][T][0]
      | undefined;
  }

  addFavoritesField<T extends DatabaseFavoriteFields>(
    field: T,
    entity: Database['favorites'][T][0],
  ) {
    // @ts-expect-error We've checked type of new entity already
    this.db.favorites[field].push(entity as Database['favorites'][T][0]);
  }

  removeFromFavorites<T extends DatabaseFavoriteFields>(field: T, id: string) {
    const entityToDelete = this.db.favorites[field].find(
      (entity) => entity.id === id,
    );
    if (!entityToDelete) {
      return false;
    }
    this.db.favorites[field].splice(
      // @ts-expect-error We've checked type of new entity already
      this.db.favorites[field].indexOf(entityToDelete),
      1,
    );

    return true;
  }

  setArtistIdLinkToNull(id: string) {
    this.db.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    this.db.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }

  setAlbumIdLinkToNull(id: string) {
    this.db.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
