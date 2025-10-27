import { Controller } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class Subjectcontroller {
  constructor(private readonly subjectService: SubjectService) {}
}
