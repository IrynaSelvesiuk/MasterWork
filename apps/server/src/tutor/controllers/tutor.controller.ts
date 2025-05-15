import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TutorService } from '../services/tutor.service';
import { CreateTutorDto } from '../dto/createTutor.dto';
import { Tutor } from '../entities/tutor.entity';

@Controller('tutors')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Get()
  async findAll(): Promise<Tutor[]> {
    return this.tutorService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tutor> {
    const tutor = await this.tutorService.findOneBy('id', id);
    if (!tutor) {
      throw new NotFoundException(`Tutor with ID ${id} not found`);
    }
    return tutor;
  }

  @Post()
  async create(@Body() createTutorDto: CreateTutorDto): Promise<Tutor> {
    return this.tutorService.create(createTutorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.tutorService.delete(id);
  }
}
