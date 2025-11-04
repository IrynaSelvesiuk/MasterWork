import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  learningGoals?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];
}
