import { Role } from 'src/enums/roles.enum';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}
