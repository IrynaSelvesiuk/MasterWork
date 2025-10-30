import { IsArray, IsInt } from 'class-validator';

export class UpdateStudentDto {
  @IsArray()
  languages: string[];

  @IsInt()
  walletBalance: number;
}
