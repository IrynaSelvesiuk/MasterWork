import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Student } from 'src/student/student.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToOne(() => Student, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @CreateDateColumn()
  createdAt: Date;
}
