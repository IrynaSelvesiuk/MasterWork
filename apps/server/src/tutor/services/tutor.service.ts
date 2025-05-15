import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutor } from '../entities/tutor.entity';
import { Repository } from 'typeorm';
import { CreateTutorDto } from '../dto/createTutor.dto';

@Injectable()
export class TutorService {
  constructor(
    @InjectRepository(Tutor)
    private readonly tutorRepository: Repository<Tutor>,
  ) {}

  public async find(): Promise<Tutor[]> {
    return this.tutorRepository.find();
  }

  public async findOneBy<K extends keyof Tutor>(
    key: K,
    value: Tutor[K],
  ): Promise<Tutor | null> {
    return this.tutorRepository.findOne({ where: { [key]: value } });
  }

  public async create(createTutorDto: CreateTutorDto): Promise<Tutor> {
    const tutor = this.tutorRepository.create(createTutorDto);
    return await this.tutorRepository.save(tutor);
  }

  public async delete(id: string): Promise<void> {
    await this.tutorRepository.delete(id);
  }
}
