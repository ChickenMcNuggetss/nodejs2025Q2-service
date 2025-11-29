import { Injectable } from '@nestjs/common';
import { Database } from '../interfaces/db';
import { User } from '../interfaces/user';
import { Track } from '../interfaces/track';

@Injectable()
export class DatabaseService {
  private readonly db: Database = {
    users: [],
    tracks: [],
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

  updateUser(id: string, userInfo: Partial<User>) {
    const user = this.db.users.find((user) => user.id === id);
    const index = this.db.users.indexOf(user);
    this.db.users[index] = {
      ...user,
      ...userInfo,
      version: ++user.version,
      updatedAt: new Date().valueOf(),
    };

    return { ...this.db.users[index] };
  }

  getById<T extends keyof Database>(field: T, id: string) {
    return this.db[field].find((entity) => entity.id === id) as
      | Database[T][0]
      | undefined;
  }

  updateTrack(id: string, trackInfo: Partial<Track>) {
    const track = this.db.tracks.find((track) => track.id === id);
    const index = this.db.tracks.indexOf(track);
    this.db.tracks[index] = {
      ...track,
      ...trackInfo,
    };

    return { ...this.db.tracks[index] };
  }
}
