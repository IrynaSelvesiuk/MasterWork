import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateExperienceDto {
  @IsString()
  @MinLength(1, { message: 'Посада не може бути порожньою' })
  role: string;

  @IsString()
  @MinLength(1, { message: 'Місце не може бути порожнім' })
  location: string;

  @IsString()
  @MinLength(1, { message: 'Роки не можуть бути порожніми' })
  years: string;

  @IsOptional()
  @IsString()
  description?: string;
}
