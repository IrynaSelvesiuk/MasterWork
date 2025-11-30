import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { Environment } from '../../enums/env.enum';
import { RequestWithUser } from '../../shared/types/request-with-user';
import { CreateTeacherDto } from '../../teacher/dto/create-teacher.dto';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { UserResponseDto } from '../../user/dto/user-response.dto';
import { UserService } from '../../user/user.service';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../constants/token-maxAge';
import { TokenName } from '../enums/token-name.enum';
import { JwtAuthGuard } from '../jwt-auth-guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() data: CreateTeacherDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(data);

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

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Req() req: RequestWithUser,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    const userId = req.user.id;

    return this.userService.updatePassword(
      userId,
      body.currentPassword,
      body.newPassword,
    );
  }
}
