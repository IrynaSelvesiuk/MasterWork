import { Expose } from 'class-transformer';

export class SubjectResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  category: string;
}
