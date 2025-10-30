import { axiosClient } from '@/shared/config/axios-config';
import { API_URL } from '@/shared/constants/api-url';
import { TeacherRegisterSchema } from '../schemas/teacher-register-schema';

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
