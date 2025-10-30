import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: string): Promise<Student | null> {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException(`Student with id ${id} does not exists`);
    }

    return student;
  }

  async findOneByUserId(userId: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { user: { id: userId } },
      relations: {
        user: true,
      },
    });

    if (!student) {
      throw new NotFoundException('Student was not found');
    }

    return student;
  }

  async createStudent(data: CreateStudentDto, user: User) {
    const newStudent = this.studentRepository.create({
      learningGoals: data?.learningGoals || '',
      walletBalance: 0,
      languages: [],
      user,
    });

    return this.studentRepository.save(newStudent);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.studentRepository.delete(id);
  }
}
