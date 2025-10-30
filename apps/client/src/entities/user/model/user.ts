import { Role } from '@/shared/enums/role.enum';

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  joinedDate: string;
  image?: string | null;
  role: Role[];
}
