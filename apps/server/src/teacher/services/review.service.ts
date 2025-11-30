import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { StudentService } from '../../student/student.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,

    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,

    private readonly studentService: StudentService,
  ) {}

  async create(dto: CreateReviewDto, userId: string) {
    const teacher = await this.teacherRepo.findOne({
      where: { id: dto.teacherId },
    });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const student = await this.studentService.findOneByUserId(userId);

    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment,
      teacher,
      student,
    });

    return this.reviewRepo.save(review);
  }

  async getTeacherReviews(teacherId: string) {
    return this.reviewRepo.find({
      where: { teacher: { id: teacherId } },
      relations: {
        student: {
          user: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }
}
