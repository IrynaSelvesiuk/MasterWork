import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { Repository } from 'typeorm';
import { TeacherService } from 'src/teacher/services/teacher.service';
import { StudentService } from 'src/student/student.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { MailService } from 'src/shared/mail/mail.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly mailService: MailService,
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
      relations: { student: { user: true } },
      order: { date: 'ASC' },
    });
  }

  async updateBookingStatus(id: string, status: 'confirmed' | 'rejected') {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        student: {
          user: true,
        },
        teacher: {
          user: true,
        },
      },
    });

    if (!booking) throw new NotFoundException('Booking not found');

    const mappedStatus =
      status === 'confirmed' ? BookingStatus.CONFIRMED : BookingStatus.REJECTED;

    booking.status = mappedStatus;
    await this.bookingRepository.save(booking);

    await this.mailService.sendBookingStatusEmail(
      booking.student.user.email,
      status,
      `${booking.teacher.user.firstName} ${booking.teacher.user.lastName}`,
      booking.date,
    );

    return booking;
  }
}
