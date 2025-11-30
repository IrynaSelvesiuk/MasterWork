import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';
import { Review } from '../teacher/entities/review.entity';
import { User } from '../user/user.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.student, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  avatarUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text', array: true })
  languages: string[];

  @Column()
  learningGoals: string;

  @OneToMany(() => Booking, (booking) => booking.student)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.student)
  reviews: Review[];
}
