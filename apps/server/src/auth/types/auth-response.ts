import { Role } from 'src/enums/roles.enum';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { User } from 'src/user/user.entity';

export interface AuthResponse {
  user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'> & { role?: Role };
  teacher?: Pick<
    Teacher,
    'id' | 'bio' | 'subjects' | 'yearsOfExperience' | 'hourlyRate' | 'location'
  >;
  accessToken: string;
  refreshToken: string;
}
