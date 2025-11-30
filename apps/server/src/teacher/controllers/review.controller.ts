import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { RequestWithUser } from '../../shared/types/request-with-user';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReview(
    @Body() dto: CreateReviewDto,
    @Request() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.reviewService.create(dto, userId);
  }

  @Get('teacher/:teacherId')
  async getTeacherReviews(@Param('teacherId') teacherId: string) {
    return this.reviewService.getTeacherReviews(teacherId);
  }
}
