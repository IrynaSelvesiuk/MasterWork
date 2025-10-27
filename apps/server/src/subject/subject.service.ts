import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { In, Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SEED_SUBJECTS } from './data/seed-subjects';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async onModuleInit() {
    await this.seedSubjects();
  }

  private async seedSubjects() {
    try {
      const count = await this.subjectRepository.count();

      if (count === 0) {
        console.log('No subjects found. Seeding database with initial list...');

        // Створюємо сутності з масиву об'єктів
        const subjectsToCreate = SEED_SUBJECTS.map((subjectData) =>
          this.subjectRepository.create(subjectData),
        );

        await this.subjectRepository.save(subjectsToCreate);
        console.log(`Successfully seeded ${subjectsToCreate.length} subjects.`);
      }
    } catch (error) {
      console.error('Error seeding subjects:', error);
    }
  }

  async create(data: CreateSubjectDto): Promise<Subject> {
    const subjectExists = await this.subjectRepository.find({
      where: {
        name: data.name,
      },
    });

    if (subjectExists) {
      throw new ConflictException(`${data.name} subject already exists`);
    }

    const subject = this.subjectRepository.create(data);

    return this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  findManyByIds(ids: string[]): Promise<Subject[]> {
    return this.subjectRepository.findBy({
      id: In(ids),
    });
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new BadRequestException(`Subject with id ${id} does not exist`);
    }

    return subject;
  }

  async update(id: string, data: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new BadRequestException(`Subject with id ${id} does not exist`);
    }

    this.subjectRepository.merge(subject, data);

    return this.subjectRepository.save(subject);
  }

  async delete(id: string): Promise<void> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new BadRequestException(`Subject with id ${id} does not exist`);
    }

    await this.subjectRepository.remove(subject);
  }
}
