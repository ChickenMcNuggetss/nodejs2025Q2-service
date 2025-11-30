import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../db/database-service';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';

@Injectable()
export class ArtistsService {
  constructor(private dbService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    return this.dbService.create('artists', newArtist);
  }

  findAll() {
    return this.dbService.getAll('artists');
  }

  findOne(id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.dbService.getById('artists', id);
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.dbService.getById('artists', id);
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    const updatedArtist = this.dbService.update('artists', id, updateArtistDto);
    return updatedArtist;
  }

  remove(id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isArtistExist = this.dbService.delete('artists', id);
    if (!isArtistExist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    console.log(id, 'Id');
    this.dbService.setArtistIdLinkToNull(id);
  }
}
