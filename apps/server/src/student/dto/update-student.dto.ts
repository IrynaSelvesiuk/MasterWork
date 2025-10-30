import { IsArray, IsInt } from 'class-validator';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

export class UpdateStudentDto extends UpdateUserDto {
  @IsArray()
  languages: string[];

  @IsInt()
  walletBalance: number;
}
