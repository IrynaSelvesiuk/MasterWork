import { axiosClient } from '@/shared/config/axios-config';
import { TeacherRegisterSchema } from './schemas/teacher-register-schema';
import { API_URL } from '@/shared/constants/api-url';

class TeacherAuthService {
  constructor() {}

  async register(data: TeacherRegisterSchema) {
    const response = await axiosClient.post(API_URL.AUTH_REGISTER, {
      ...data,
      role: 'TEACHER',
    });

    return response.data;
  }
}

export const teacherAuthService = new TeacherAuthService();
