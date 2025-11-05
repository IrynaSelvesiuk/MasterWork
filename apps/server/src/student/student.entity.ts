import { Booking } from 'src/bookings/booking.entity';
import { Review } from 'src/teacher/entities/review.entity';
import { User } from 'src/user/user.entity';
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

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.student, { onDelete: 'CASCADE' })
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

  @Column({
    type: 'integer',
    default: 0,
  })
  walletBalance: number;

  @OneToMany(() => Booking, (booking) => booking.student)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.student)
  reviews: Review[];
}
