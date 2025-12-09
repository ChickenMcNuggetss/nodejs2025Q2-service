import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { isUUID } from 'class-validator';
import { Track } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.tracksRepository.create(createTrackDto);
    return await this.tracksRepository.save(track);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    const updatedTrack = await this.tracksRepository.update(
      { id },
      updateTrackDto,
    );
    return updatedTrack;
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return await this.tracksRepository.delete({ id });
  }
}
