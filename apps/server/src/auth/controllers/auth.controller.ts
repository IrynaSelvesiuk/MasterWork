import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { Environment } from 'src/enums/env.enum';
import { TokenName } from '../enums/token-name.enum';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../constants/token-maxAge';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(createUserDto);

    res.cookie(TokenName.ACCESS, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === Environment.PRODUCTION,
      sameSite: 'strict',
      maxAge: ACCESS_TOKEN_EXPIRATION,
    });

    res.cookie(TokenName.REFRESH, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === Environment.PRODUCTION,
      sameSite: 'strict',
      maxAge: REFRESH_TOKEN_EXPIRATION,
    });

    const userDto = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return res.send({ message: 'Registration successful', userDto });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(loginUserDto);

    res.cookie(TokenName.ACCESS, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === Environment.PRODUCTION,
      sameSite: 'strict',
      maxAge: ACCESS_TOKEN_EXPIRATION,
    });

    res.cookie(TokenName.REFRESH, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === Environment.PRODUCTION,
      sameSite: 'strict',
      maxAge: REFRESH_TOKEN_EXPIRATION,
    });

    const userDto = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return res.send({ message: 'Login successful', userDto });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie(TokenName.ACCESS);
    res.clearCookie(TokenName.REFRESH);
    return res.send({ message: 'Logged out successfully' });
  }
}
