import { axiosClient } from '@/shared/config/axios-config';
import { API_URL } from '@/shared/constants/api-url';
import { StudentResponse } from '../model/student';

class StudentService {
  constructor() {}

  async getMe() {
    const response = await axiosClient.get<StudentResponse>(API_URL.STUDENT.ME);

    return response.data;
  }
}

export const studentService = new StudentService();
