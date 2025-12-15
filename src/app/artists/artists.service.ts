import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isUUID } from 'class-validator';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistsRepository.create(createArtistDto);
    return await this.artistsRepository.save(artist);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return await this.artistsRepository.update({ id }, updateArtistDto);
  }

  async remove(id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return await this.artistsRepository.delete({ id });
  }
}
