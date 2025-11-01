import { User } from '@/entities/user';

export interface StudentInfo {
  id: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  languages: string[];
  learningGoals: string;
  walletBalance: number;
  user: User;
}

export interface TeacherInfo {
  id: string;
  bio: string;
  headline: string;
  avatarUrl: string;
  yearsOfExperience: number;
  hourlyRate: string;
  location: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  date: string;
  note?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  student: StudentInfo;
  teacher: TeacherInfo;
}

export type BookingStatus = 'confirmed' | 'rejected';
