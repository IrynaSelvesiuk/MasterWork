import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateEducationDto } from './update-education.dto';
import { UpdateExperienceDto } from './update-experience.dto';

export class UpdateTeacherProfileDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  subjectIds?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  yearsOfExperience?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  hourlyRate?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, {
    message: 'Заголовок (headline) має бути не менше 10 символів',
  })
  headline?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Некоректний URL для відео' })
  videoUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  speaks?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateEducationDto)
  education?: UpdateEducationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExperienceDto)
  experience?: UpdateExperienceDto[];
}
