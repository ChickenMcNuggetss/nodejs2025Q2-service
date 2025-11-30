import { Injectable } from '@nestjs/common';
import { Database } from '../interfaces/db';

@Injectable()
export class DatabaseService {
  private readonly db: Database = {
    users: [],
    tracks: [],
    artists: [],
    albums: [],
  } as const;

  getAll<T extends keyof Database>(field: T): Database[T] {
    return [...this.db[field]] as Database[T];
  }

  create<T extends keyof Database>(field: T, newEntity: Database[T][0]) {
    const dbField = this.db[field];
    // @ts-expect-error We've checked type of new entity already
    dbField.push(newEntity);
    return newEntity;
  }

  delete<T extends keyof Database>(field: T, id: string) {
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

  update<T extends keyof Database>(
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

  getById<T extends keyof Database>(field: T, id: string) {
    return this.db[field].find((entity) => entity.id === id) as
      | Database[T][0]
      | undefined;
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
