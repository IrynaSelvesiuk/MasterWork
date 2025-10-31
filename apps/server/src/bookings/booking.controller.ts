import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
