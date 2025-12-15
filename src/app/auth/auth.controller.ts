import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto.refreshToken);
  }
}
