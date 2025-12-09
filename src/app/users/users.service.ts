import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    const newUser = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    const updatedUser = await this.usersRepository.update(
      { id },
      {
        password: updateUserDto.newPassword,
      },
    );
    return updatedUser;
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException("Record doesn't exist", HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.delete({ id });
  }
}
