import { Controller, Get } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResponseDto } from './dto/subject-response.dto';

@Controller('subjects')
export class Subjectcontroller {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async getAll(): Promise<SubjectResponseDto[]> {
    return this.subjectService.findAll();
  }
}
