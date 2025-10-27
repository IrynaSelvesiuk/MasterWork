import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Teacher } from '../teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { SubjectService } from 'src/subject/subject.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly subjectService: SubjectService,
  ) {}

  async createTeacher(
    createTeacherDto: CreateTeacherDto,
    user: CreateUserDto,
  ): Promise<Teacher> {
    const { subjectIds, ...teacherData } = createTeacherDto;

    const teacher = this.teacherRepository.create({ ...teacherData, user });

    if (subjectIds && subjectIds.length > 0) {
      const subjectEntities =
        await this.subjectService.findManyByIds(subjectIds);

      if (subjectEntities.length !== subjectIds.length) {
        const foundIds = subjectEntities.map((s) => s.id);
        const notFoundIds = subjectIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `The following Subject IDs were not found: ${notFoundIds.join(', ')}`,
        );
      }

      teacher.subjects = subjectEntities;
    }

    return this.teacherRepository.save(teacher);
  }

  async findAll() {
    return await this.teacherRepository.find({ relations: ['user'] });
  }

  async findByUserId(userId: string) {
    return await this.teacherRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
