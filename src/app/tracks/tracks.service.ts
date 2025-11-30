import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../db/database-service';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';

@Injectable()
export class TracksService {
  constructor(private dbService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };
    return this.dbService.create('tracks', newTrack);
  }

  findAll() {
    return this.dbService.getAll('tracks');
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = this.dbService.getById('tracks', id);
    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = this.dbService.getById('tracks', id);
    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    const updatedTrack = this.dbService.update('tracks', id, updateTrackDto);
    return updatedTrack;
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isTrackExist = this.dbService.delete('tracks', id);
    if (!isTrackExist) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    this.dbService.removeFromFavorites('tracks', id);
  }
}
