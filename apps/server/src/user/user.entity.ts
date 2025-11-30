import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/roles.enum';
import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('simple-array', { default: 'STUDENT' })
  role: Role;

  @Column({ default: false })
  verifiedTutor: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  teacher?: Teacher;

  @OneToOne(() => Teacher, (student) => student.user)
  student?: Student;
}
