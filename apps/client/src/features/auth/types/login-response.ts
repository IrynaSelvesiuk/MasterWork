import { Role } from '@/shared/enums/role.enum';

export interface LoginResponse {
  message: string;
  userDto: {
    id: string;
    email: string;
    role: Role[];
    firstName: string;
    lastName: string;
    createAt: string;
  };
}
