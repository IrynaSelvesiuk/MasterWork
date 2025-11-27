import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RequestWithUser } from 'src/shared/types/request-with-user';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBooking(
    @Req() req: RequestWithUser,
    @Body() data: CreateBookingDto,
  ) {
    const userId = req.user.id;

    return this.bookingService.createBooking(userId, data);
  }

  @Get('teacher')
  @UseGuards(JwtAuthGuard)
  async getTeacherBookings(@Req() req: RequestWithUser) {
    const teacherId = req.user.id;
    const bookings = await this.bookingService.getBookingsForTeacher(teacherId);
    console.log(bookings);
    return bookings;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateBookingStatus(
    @Param('id') id: string,
    @Body('status') status: 'confirmed' | 'rejected',
  ) {
    return this.bookingService.updateBookingStatus(id, status);
  }

  @Get('student')
  @UseGuards(JwtAuthGuard)
  async getStudentBookings(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.bookingService.getBookingsForStudent(userId);
  }
}
