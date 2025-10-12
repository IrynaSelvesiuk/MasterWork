import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from 'src/shared/hash/services/hash.service';
import { TokenService } from './token.service';
import { JwtPayload } from '../types/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { Role } from 'src/enums/roles.enum';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

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

  public async login(loginUser: LoginUserDto): Promise<{
    user: { id: number; email: string; role?: Role };
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.findOneBy('email', loginUser.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.hashService.compare(
      loginUser.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = this.generatePayload(user);
    const tokens = await this.tokenService.generateTokens(payload);

    return {
      user,
      ...tokens,
    };
  }

  public async register(createUserDto: CreateUserDto): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.createUser(createUserDto);
    const payload = this.generatePayload(user);
    const tokens = await this.tokenService.generateTokens(payload);

    return { user, ...tokens };
  }

  public async logout() {}
}
