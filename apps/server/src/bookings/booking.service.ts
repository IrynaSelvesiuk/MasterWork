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
    console.log(dto);
    const student = await this.studentService.findOneByUserId(studentId);
    if (!student) {
      console.error(`Student not found for userId: ${studentId}`);
      throw new NotFoundException(
        `Student profile not found for user ${studentId}`,
      );
    }

    const teacher = await this.teacherService.findProfileByUserId(
      dto.teacherId,
    );
    if (!teacher) {
      console.error(`Teacher not found for id: ${dto.teacherId}`);
      throw new NotFoundException(
        `Teacher profile not found for id ${dto.teacherId}`,
      );
    }
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

  async getBookingsForStudent(userId: string) {
    return this.bookingRepository.find({
      where: {
        student: {
          user: {
            id: userId, // TypeORM magic: filters student by their linked User ID
          },
        },
      },
      relations: {
        teacher: {
          user: true, // Load teacher details (name, email)
        },
      },
      order: {
        date: 'DESC', // Show newest bookings first
      },
    });
  }
}
