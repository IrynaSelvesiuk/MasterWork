import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { TeacherService } from 'src/teacher/services/teacher.service';
import { StudentService } from 'src/student/student.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
  ) {}

  async createBooking(studentId: string, dto: CreateBookingDto) {
    const student = await this.studentService.findOneByUserId(studentId);
    const teacher = await this.teacherService.findById(dto.teacherId);

    if (!student || !teacher) throw new NotFoundException('User not found');

    const booking = this.bookingRepository.create({
      student,
      teacher,
      date: new Date(dto.date),
      note: dto.note,
    });

    return this.bookingRepository.save(booking);
  }

  async getBookingsForTeacher(userId: string) {
    const teacher = await this.teacherService.findProfileByUserId(userId);

    return this.bookingRepository.find({
      where: { teacher: { id: teacher.id } },
      relations: { student: true },
      order: { date: 'ASC' },
    });
  }
}
