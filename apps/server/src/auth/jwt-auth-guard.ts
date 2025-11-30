import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './services/token.service';
import { TokenName } from './enums/token-name.enum';
import { RequestWithUser } from '../shared/types/request-with-user';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    const authHeader = req.headers['authorization'];
    let token: string | undefined;

    if (req.cookies && typeof req.cookies[TokenName.ACCESS] === 'string') {
      token = req.cookies[TokenName.ACCESS];
    } else if (authHeader && typeof authHeader === 'string') {
      token = authHeader.split(' ')[1];
    }

    if (!token) throw new UnauthorizedException('No token provided');

    const payload = await this.tokenService.verifyAccessToken(token);

    const user = await this.userService.findOneBy('id', String(payload.sub));
    if (!user) throw new UnauthorizedException('User not found');

    req.user = user;
    return true;
  }
}
