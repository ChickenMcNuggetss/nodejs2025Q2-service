import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { Track } from '../tracks/track.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
