import { User } from 'src/user/user.entity';
import { CreateTeacherDto } from '../dto/create-teacher.dto';

export type CreateTeacherInput = Omit<
  CreateTeacherDto,
  'email' | 'password' | 'firstName' | 'lastName' | 'role'
> & {
  user: User;
};
