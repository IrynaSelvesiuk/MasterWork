import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ConfigType } from 'src/config/env.config';
import { JwtPayload } from '../types/jwt-payload.interface';

@Injectable()
export class TokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly configService: ConfigService<ConfigType>,
    private readonly jwtService: JwtService,
  ) {
    this.accessSecret = configService.get('jwt.accessSecret', { infer: true })!;
    this.refreshSecret = configService.get('jwt.refreshSecret', {
      infer: true,
    })!;
    this.accessExpiresIn = configService.get('jwt.accessExpiresIn', {
      infer: true,
    })!;
    this.refreshExpiresIn = configService.get('jwt.refreshExpiresIn', {
      infer: true,
    })!;
  }

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn,
    });
  }

  async generateRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn,
    });
  }

  async generateTokens(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);
    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.accessSecret,
      });
    } catch (e: unknown) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Access token has expired');
      }
      if (e instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid access token');
      }
      throw new UnauthorizedException(
        'An unknown error occurred with the access token',
      );
    }
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.refreshSecret,
      });
    } catch (e: unknown) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token has expired');
      }
      if (e instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      throw new UnauthorizedException(
        'An unknown error occurred with the refresh token',
      );
    }
  }
}
