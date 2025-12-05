import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumsRepository.create(createAlbumDto);
    return await this.albumsRepository.save(album);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.albumsRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    const updatedAlbum = await this.albumsRepository.update(
      { id },
      updateAlbumDto,
    );
    return updatedAlbum;
  }

  async remove(id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return await this.albumsRepository.delete({ id });
  }
}
