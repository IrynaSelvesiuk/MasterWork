export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  joinedDate: string;
  image?: string | null;
}
