import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';

type UserValidationResponse = {
  status: boolean;
  payload?: User;
  message?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  public async login(createUserDto: CreateUserDto, res: Response) {
    const user = await this.validateUser(
      createUserDto.login,
      createUserDto.password,
    );
    if (!user.status) {
      throw new HttpException(user.message, HttpStatus.UNAUTHORIZED);
    }
    const payload = {
      sub: user.payload.id,
      name: user.payload.login,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: Number(process.env.JWT_EXPIRESIN) ?? 900,
    });
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
    });
    res.send('Login successful');
  }

  public async signup(createUserDto: CreateUserDto) {
    const userExist = !!(await this.usersService.findOne(createUserDto.login));
    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const payload = {
      sub: user.id,
      login: user.login,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: Number(process.env.JWT_EXPIRESIN) ?? 900,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRESIN) ?? 86400,
    });

    return { accessToken, refreshToken };
  }

  public async refresh(user: any) {
    const payload = {
      login: user.login,
      sub: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: Number(process.env.JWT_EXPIRESIN) ?? 900,
    });

    return { accessToken };
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<UserValidationResponse | null> {
    const user = await this.usersService.findOne(login);
    if (user && (await this.compareWithHashString(password, user.password))) {
      return { status: true, payload: user };
    } else {
      return { status: false, message: 'Invalid login or password!' };
    }
  }

  async compareWithHashString(
    plainStr: string,
    hashedStr: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainStr, hashedStr);
    return isMatch;
  }
}
