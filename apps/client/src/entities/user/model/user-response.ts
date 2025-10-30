import { Role } from '@/shared/enums/role.enum';

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role[];
  createdAt: string;
}
