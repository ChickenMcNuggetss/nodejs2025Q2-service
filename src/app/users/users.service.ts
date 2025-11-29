import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../db/database-service';
import { isUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private dbService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const date = new Date().valueOf();
    const newUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    const newDbUser = { ...this.dbService.create('users', newUser) };
    delete newDbUser.password;
    return newDbUser;
  }

  findAll() {
    return this.dbService.getAll('users');
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = this.dbService.getById('users', id);
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = this.dbService.getById('users', id);
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    const updatedUser = this.dbService.updateUser(id, {
      password: updateUserDto.newPassword,
    });

    delete updatedUser.password;
    return updatedUser;
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isUserDeleted = this.dbService.delete('users', id);
    if (!isUserDeleted) {
      throw new HttpException("Record doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
