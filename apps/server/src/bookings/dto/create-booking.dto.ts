import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  teacherId: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  note?: string;
}
