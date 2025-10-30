import { IsString, MinLength } from 'class-validator';

export class UpdateEducationDto {
  @IsString()
  @MinLength(1, { message: 'Ступінь не може бути порожнім' })
  degree: string;

  @IsString()
  @MinLength(1, { message: 'Університет не може бути порожнім' })
  university: string;

  @IsString()
  @MinLength(1, { message: 'Роки не можуть бути порожніми' })
  years: string;
}
