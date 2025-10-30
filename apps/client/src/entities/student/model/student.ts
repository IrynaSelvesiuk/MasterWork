import { UserResponse } from '@/entities/user/model/user';

export interface Student {
  id: string;

  avatarUrl?: string;
  walletBalance: number;
  learningGoals?: string;
  languages: string[];
}

export interface StudentResponse {
  id: string;
  languages: string[];
  learningGoals: string;
  walletBalance: number;
  user: UserResponse;
  avatarUrl?: string;

  createdAt: Date;
  updatedAt: Date;
}
