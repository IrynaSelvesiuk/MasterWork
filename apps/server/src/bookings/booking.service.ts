import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GoogleCalendarService } from '../shared/mail/google-calendar.service';
import { MailService } from '../shared/mail/mail.service';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/services/teacher.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly mailService: MailService,
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  async createBooking(studentId: string, dto: CreateBookingDto) {
    const student = await this.studentService.findOneByUserId(studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const teacher = await this.teacherService.findById(dto.teacherId);
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const startTime = new Date(dto.startTime);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    if (startTime < new Date()) {
      throw new BadRequestException('Дата вже минула');
    }

    const conflict = await this.bookingRepository.findOne({
      where: {
        teacher: { id: teacher.id },
        startTime: LessThan(endTime),
        endTime: MoreThan(startTime),
      },
    });

    if (conflict) {
      throw new BadRequestException('Цей слот вже зайнятий');
    }

    const booking = this.bookingRepository.create({
      student,
      teacher,
      startTime,
      endTime,
      note: dto.note,
      status: BookingStatus.PENDING,
    });

    return this.bookingRepository.save(booking);
  }

  async getBookingsForTeacher(userId: string) {
    const teacher = await this.teacherService.findProfileByUserId(userId);

    return this.bookingRepository.find({
      where: { teacher: { id: teacher.id } },
      relations: { student: { user: true } },
      order: { startTime: 'ASC' },
    });
  }

  async getBookedSlotsForTeacher(teacherId: string) {
    return this.bookingRepository.find({
      where: {
        teacher: { id: teacherId },
        status: BookingStatus.CONFIRMED,
      },
      select: ['startTime', 'endTime'],
      order: { startTime: 'ASC' },
    });
  }

  async updateBookingStatus(id: string, status: 'confirmed' | 'rejected') {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        student: { user: true },
        teacher: { user: true },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const mappedStatus =
      status === 'confirmed' ? BookingStatus.CONFIRMED : BookingStatus.REJECTED;

    booking.status = mappedStatus;

    if (mappedStatus === BookingStatus.CONFIRMED) {
      const meetLink = await this.googleCalendarService.createMeeting(
        `Lesson with ${booking.teacher.user.firstName}`,
        `General Lesson`,
        booking.startTime,
        booking.endTime,
      );

      booking.meetingLink = meetLink;
    }

    await this.bookingRepository.save(booking);

    await this.mailService.sendBookingStatusEmail(
      booking.student.user.email,
      status,
      `${booking.teacher.user.firstName} ${booking.teacher.user.lastName}`,
      booking.startTime,
      booking.meetingLink || '',
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
        startTime: 'DESC', // Show newest bookings first
      },
    });
  }
}
