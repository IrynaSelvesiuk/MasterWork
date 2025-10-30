import { Role } from '@/shared/enums/role.enum';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  image?: string | null;
  role: Role[];
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role[];
  verifiedTutor: boolean;
  createdAt: string;
  updatedAt: string;
}
