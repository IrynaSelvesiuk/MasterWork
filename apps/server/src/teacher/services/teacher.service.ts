import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { SubjectService } from 'src/subject/subject.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Education } from '../entities/education.entity';
import { Experience } from '../entities/experience.entity';
import { UpdateTeacherProfileDto } from '../dto/update-teacher-profile.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
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

  async findById(teacherId: string) {
    return await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: {
        user: true,
        subjects: true,
        education: true,
        experience: true,
        reviews: true,
      },
    });
  }

  async findProfileByUserId(userId: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'subjects', 'education', 'experience', 'reviews'],
    });

    if (!teacher) {
      throw new NotFoundException('Профіль вчителя не знайдено');
    }
    return teacher;
  }

  async updateProfile(
    teacherId: string,
    dto: UpdateTeacherProfileDto,
  ): Promise<Teacher> {
    const { subjectIds, education, experience, ...simpleProfileData } = dto;

    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: { user: true },
    });
    if (!teacher) {
      throw new NotFoundException(`Вчителя з ID ${teacherId} не знайдено`);
    }

    this.teacherRepository.merge(teacher, simpleProfileData);
    await this.teacherRepository.save(teacher);

    if (subjectIds) {
      const subjects = await this.subjectService.findManyByIds(subjectIds);
      teacher.subjects = subjects;
      await this.teacherRepository.save(teacher);
    }

    if (education) {
      await this.educationRepository.delete({ teacher: { id: teacherId } });

      const newEducation = education.map((eduDto) =>
        this.educationRepository.create({ ...eduDto, teacher }),
      );
      await this.educationRepository.save(newEducation);
    }

    if (experience) {
      await this.experienceRepository.delete({ teacher: { id: teacherId } });

      const newExperience = experience.map((expDto) =>
        this.experienceRepository.create({ ...expDto, teacher }),
      );
      await this.experienceRepository.save(newExperience);
    }

    return this.findProfileByUserId(teacher.user.id);
  }
}
