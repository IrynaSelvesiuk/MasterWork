import { axiosClient } from '@/shared/config/axios-config';
import { TeacherProfile } from '../model/teacher-entity';
import { API_URL } from '@/shared/constants/api-url';
import { TeacherProfileFormSchema } from '../schemas/teacher-profile-form-schema';

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
}

export const teacherService = new TeacherService();
