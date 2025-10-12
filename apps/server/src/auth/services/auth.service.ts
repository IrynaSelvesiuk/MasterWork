import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from 'src/shared/hash/services/hash.service';
import { TokenService } from './token.service';
import { JwtPayload } from '../types/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { Role } from 'src/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  private generatePayload(user: User): JwtPayload {
    return { sub: user.id, email: user.email };
  }

  public async login(
    email: string,
    password: string,
  ): Promise<{
    user: { id: number; email: string; role?: Role };
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.findOneBy('email', email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.hashService.compare(
      password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = this.generatePayload(user);
    const tokens = await this.tokenService.generateTokens(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.roles,
      },
      ...tokens,
    };
  }

  public async register(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.createUser(createUserDto);
    const payload = this.generatePayload(user);
    return this.tokenService.generateTokens(payload);
  }

  public async logout() {}
}
