import { axiosClient } from '@/shared/config/axios-config';
import { TeacherProfile, TeacherResponse } from '../model/teacher-entity';
import { API_URL } from '@/shared/constants/api-url';
import { TeacherProfileFormSchema } from '../schemas/teacher-profile-form-schema';
import { TutorQueryParams } from '../types/tutor-query-params';
import { Booking } from '@/entities/booking';

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

    return response.data.data;
  }

  async getMyBookings() {
    const response = await axiosClient.get<Booking[]>(API_URL.BOOKINGS.TEACHER);

    return response.data;
  }
}

export const teacherService = new TeacherService();
