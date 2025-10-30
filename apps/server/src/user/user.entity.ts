import { Role } from 'src/enums/roles.enum';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
