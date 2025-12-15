import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToMany(() => Artist, (artist) => artist.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fav_artists',
    joinColumn: { name: 'favoriteId', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'artistId',
      referencedColumnName: 'id',
    },
  })
  artists: Artist[];
  @ManyToMany(() => Album, (album) => album.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fav_albums',
    joinColumn: { name: 'favoriteId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'albumId', referencedColumnName: 'id' },
  })
  albums: Album[]; // favorite albums ids
  @ManyToMany(() => Track, (track) => track.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fav_tracks',
    joinColumn: { name: 'favoriteId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tracksId', referencedColumnName: 'id' },
  })
  tracks: Track[]; // favorite tracks ids
}
