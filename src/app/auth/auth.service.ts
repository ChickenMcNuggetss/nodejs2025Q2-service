import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';

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
  ) {}

  public async signup(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = {
      ...(await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      })),
    };
    delete user.password;
    return { ...user };
  }

  public async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(
      createUserDto.login,
      createUserDto.password,
    );
    if (!user.status) {
      throw new HttpException(user.message, HttpStatus.FORBIDDEN);
    }
    const payload = {
      sub: user.payload.id,
      login: user.payload.login,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: Number(process.env.JWT_EXPIRESIN) || 900,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRESIN) || 86400,
    });
    return { accessToken, refreshToken };
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        'No refresh token in body',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = await this.jwtService.verifyAsync(refreshToken);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: Number(process.env.JWT_EXPIRESIN) || 900,
    });

    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRESIN) || 86400,
    });

    return { accessToken, newRefreshToken };
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<UserValidationResponse | null> {
    const user = await this.usersService.findOneByLogin(login);
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
