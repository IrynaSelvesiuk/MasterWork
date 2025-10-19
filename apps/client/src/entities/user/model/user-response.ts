import { Role } from '@/shared/enums/role.enum';

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role[];
  createdAt: string;
}
