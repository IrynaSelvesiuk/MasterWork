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
import { CreateTutorDto } from 'src/tutor/dto/createTutor.dto';
import { LoginTutorDto } from 'src/tutor/dto/login-tutor.dto';
import { Environment } from 'src/enums/env.enum';
import { TokenName } from '../enums/token-name.enum';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../constants/token-maxAge';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createTutorDto: CreateTutorDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.register(createTutorDto);

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

    return res.send({ message: 'Registration successful' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginTutorDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

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

    return res.send({ message: 'Login successful', user });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie(TokenName.ACCESS);
    res.clearCookie(TokenName.REFRESH);
    return res.send({ message: 'Logged out successfully' });
  }
}
