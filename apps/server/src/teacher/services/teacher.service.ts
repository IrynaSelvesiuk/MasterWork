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
import { BookingService } from 'src/bookings/booking.service';
import { BookingStatus } from 'src/bookings/booking.entity';

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
    private readonly bookingService: BookingService,
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

  async findAllSorted(options: {
    page?: number;
    limit?: number;
    sortBy?: 'rating' | 'experience' | 'hourlyRate' | 'createdAt';
    order?: 'ASC' | 'DESC';
    subject?: string;
    location?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'DESC',
      subject,
      location,
    } = options;

    const qb = this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.user', 'user')
      .leftJoinAndSelect('teacher.subjects', 'subject')
      .leftJoinAndSelect('teacher.reviews', 'review')
      .loadRelationCountAndMap('teacher.reviewCount', 'teacher.reviews')
      .skip((page - 1) * limit)
      .take(limit);

    // Filtering
    if (subject) {
      qb.andWhere('subject.name ILIKE :subject', { subject: `%${subject}%` });
    }

    if (location) {
      qb.andWhere('teacher.location ILIKE :location', {
        location: `%${location}%`,
      });
    }

    // Sorting
    switch (sortBy) {
      case 'rating':
        qb.addSelect('AVG(review.rating)', 'avgRating')
          .groupBy('teacher.id')
          .addGroupBy('user.id')
          .addGroupBy('subject.id')
          .orderBy('avgRating', order);
        break;

      case 'experience':
        qb.orderBy('teacher.yearsOfExperience', order);
        break;

      case 'hourlyRate':
        qb.orderBy('teacher.hourlyRate', order);
        break;

      case 'createdAt':
      default:
        qb.orderBy('teacher.createdAt', order);
        break;
    }

    const [teachers, total] = await qb.getManyAndCount();

    return {
      data: teachers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getDashboard(id: string) {
    const teacher = await this.findProfileByUserId(id);

    if (!teacher) throw new NotFoundException('Teacher not found');

    const bookings = await this.bookingService.getBookingsForTeacher(id);

    const confirmed = bookings.filter(
      (b) => b.status === BookingStatus.CONFIRMED,
    );
    const pending = bookings.filter((b) => b.status === BookingStatus.PENDING);

    const upcoming = confirmed.filter((b) => new Date(b.date) > new Date());
    const past = confirmed.filter((b) => new Date(b.date) <= new Date());

    return {
      teacher: {
        id: teacher.id,
        name: teacher.user?.firstName + ' ' + teacher.user?.lastName,
        headline: teacher.headline,
        avatarUrl: teacher.avatarUrl,
      },
      stats: {
        totalBookings: bookings.length,
        confirmed: confirmed.length,
        pending: pending.length,
        upcomingLessons: upcoming.length,
        pastLessons: past.length,
      },
      recentBookings: bookings
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        .slice(0, 5)
        .map((b) => ({
          id: b.id,
          date: b.date,
          status: b.status,
          student: {
            id: b.student.id,
            name: `${b.student.user?.firstName} ${b.student.user?.lastName}`,
          },
        })),
    };
  }
}
