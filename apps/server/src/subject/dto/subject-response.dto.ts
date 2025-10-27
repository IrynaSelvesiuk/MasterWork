import { Subject } from '../subject.entity';

export class SubjectResponseDto {
  id: string;
  name: string;
  category: string;
  description: string;

  constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
    this.category = subject.category;
    this.description = subject.description;
  }
}
