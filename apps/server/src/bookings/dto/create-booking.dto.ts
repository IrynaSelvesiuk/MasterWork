import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  teacherId: string;

  @IsDateString()
  startTime: string;

  @IsOptional()
  @IsString()
  note?: string;
}
