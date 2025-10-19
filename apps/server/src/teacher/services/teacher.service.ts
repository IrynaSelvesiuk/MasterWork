import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Teacher } from '../teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherInput } from '../types/create-teacher-input';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(data: CreateTeacherInput): Promise<Teacher> {
    const teacher = this.teacherRepository.create(data);
    return await this.teacherRepository.save(teacher);
  }

  async findAll() {
    return await this.teacherRepository.find({ relations: ['user'] });
  }

  async findByUserId(userId: number) {
    return await this.teacherRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
