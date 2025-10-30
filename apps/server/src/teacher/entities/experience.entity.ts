import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  location: string;

  @Column()
  years: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.experience, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
