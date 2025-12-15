import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Track } from '../tracks/track.entity';
import { Album } from '../albums/album.entity';
import { Favorite } from '../favorites/favorite.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @ManyToMany(() => Favorite, (favorite) => favorite.artists)
  favorites: Favorite[];
}
