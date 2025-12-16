import { Subject } from '@/entities/subject';
import { User } from '@/entities/user';

export interface TeacherResponse {
  data: TeacherProfile[];
  limit: string;
  page: string;
  total: number;
  totalPages: number;
}

export type TeacherProfile = {
  id: string;
  bio: string;
  headline: string;
  avatarUrl: string | null;
  yearsOfExperience: number;
  hourlyRate: number;
  location: string;
  status: TeacherStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
  subjects: Subject[];
  education: Education[];
  experience: Experience[];
  reviews: Review[];

  name?: string;
  reviewsCount?: number;
  rating?: number;
  speaks?: string[];
};

export enum TeacherStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type Education = {
  id: string;
  degree: string;
  university: string;
  years: string;
};

export type Experience = {
  id: string | number;
  role: string;
  location: string;
  years: string;
  description: string;
};

export type Review = {
  id: string | number;
  studentName: string;
  rating: number;
  comment: string;
};

export interface TeacherDashboardResponse {
  teacher: {
    id: string;
    name: string;
    headline: string;
    avatarUrl: string;
  };
  stats: {
    totalBookings: number;
    confirmed: number;
    pending: number;
    upcomingLessons: number;
    pastLessons: number;
  };
  recentBookings: {
    id: string;
    startTime: string;
    endTime: string;
    status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
    student: {
      id: string;
      name: string;
    };
  }[];
}
