import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
import { Review } from './review.entity';
import { Availability } from './availability.enitity';
import { TeacherStatus } from '../types/teacher-status';
import { Booking } from '../../bookings/booking.entity';
import { User } from '../../user/user.entity';
import { Subject } from '../../subject/subject.entity';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.teacher, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  headline?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ type: 'int', nullable: true })
  yearsOfExperience?: number;

  @Column({ type: 'decimal', nullable: true })
  hourlyRate?: number;

  @Column({ nullable: true })
  location?: string;

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  subjects: Subject[];

  @OneToMany(() => Booking, (booking) => booking.teacher)
  bookings: Booking[];

  @Column({
    type: 'enum',
    enum: TeacherStatus,
    default: TeacherStatus.PENDING,
  })
  status: TeacherStatus;

  @OneToMany(() => Education, (education) => education.teacher, {
    cascade: true,
  })
  education: Education[];

  @OneToMany(() => Experience, (experience) => experience.teacher, {
    cascade: true,
  })
  experience: Experience[];

  @OneToMany(() => Review, (review) => review.teacher)
  reviews: Review[];

  @OneToMany(() => Availability, (availability) => availability.teacher, {
    cascade: true,
  })
  availability: Availability[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
