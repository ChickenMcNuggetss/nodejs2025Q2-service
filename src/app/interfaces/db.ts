import { Track } from './track';
import { User } from './user';

export interface Database {
  users: User[];
  tracks: Track[];
}
