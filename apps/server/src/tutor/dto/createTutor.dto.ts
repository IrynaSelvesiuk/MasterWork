import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTutorDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  subject: string;

  @IsString()
  @MinLength(6)
  password: string;
}
