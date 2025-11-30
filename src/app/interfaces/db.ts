import { Album } from './album';
import { Artist } from './artist';
import { Track } from './track';
import { User } from './user';

export interface Database {
  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favorites: {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  };
}

export type DatabaseArrayFields = Exclude<keyof Database, 'favorites'>;

export type DatabaseFavoriteFields = keyof Database['favorites'];
