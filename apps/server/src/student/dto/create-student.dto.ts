import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {
  @IsString()
  @IsOptional()
  learningGoals?: string;
}
