import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isUUID } from 'class-validator';
import { DatabaseService } from '../db/database-service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private dbService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    return this.dbService.create('albums', newAlbum);
  }

  findAll() {
    return this.dbService.getAll('albums');
  }

  findOne(id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.dbService.getById('albums', id);
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = this.dbService.getById('albums', id);
    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    const updatedAlbum = this.dbService.update('albums', id, updateAlbumDto);
    return updatedAlbum;
  }

  remove(id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isArtistExist = this.dbService.delete('albums', id);
    if (!isArtistExist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    this.dbService.setAlbumIdLinkToNull(id);
  }
}
