import { Expose } from 'class-transformer';
import { Role } from 'src/enums/roles.enum';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: Role;

  @Expose()
  createdAt: Date;
}
