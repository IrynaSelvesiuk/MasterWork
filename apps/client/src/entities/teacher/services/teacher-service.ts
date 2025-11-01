import { axiosClient } from '@/shared/config/axios-config';
import {
  TeacherDashboardResponse,
  TeacherProfile,
  TeacherResponse,
} from '../model/teacher-entity';
import { API_URL } from '@/shared/constants/api-url';
import { TeacherProfileFormSchema } from '../schemas/teacher-profile-form-schema';
import { TutorQueryParams } from '../types/tutor-query-params';
import { Booking } from '@/entities/booking';
import { BookingStatus } from '@/entities/booking/model/booking';

class TeacherService {
  constructor() {}

  async getMe(): Promise<TeacherProfile> {
    const response = await axiosClient.get<TeacherProfile>(API_URL.TEACHER.ME);
    console.log(response);
    return response.data;
  }

  async updateMyProfile(data: TeacherProfileFormSchema) {
    const response = await axiosClient.patch(API_URL.TEACHER.ME, data);

    return response.data;
  }

  async getTeachers(params: TutorQueryParams) {
    const response = await axiosClient.get<TeacherResponse>(
      API_URL.TEACHER.ALL,
      {
        params,
      }
    );
    return response.data;
  }

  async getMyBookings() {
    const response = await axiosClient.get<Booking[]>(API_URL.BOOKINGS.TEACHER);

    return response.data;
  }

  async updateBooking(id: string, status: BookingStatus) {
    const response = await axiosClient.patch(
      API_URL.BOOKINGS.BASE_ID(id),
      status
    );

    return response.data;
  }

  async getDashboard() {
    const response = await axiosClient.get<TeacherDashboardResponse>(
      API_URL.TEACHER.DASHBOARD
    );

    return response.data;
  }
}

export const teacherService = new TeacherService();
