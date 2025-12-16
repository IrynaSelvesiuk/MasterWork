import { axiosClient } from '@/shared/config/axios-config';
import { API_URL } from '@/shared/constants/api-url';
import { StudentResponse } from '../model/student';
import { UpdateStudentSchema } from '../schemas/update-student-schema';

export type BookingRequest = {
  teacherId: string;
  startTime: string;
  note?: string;
};
class StudentService {
  constructor() {}

  async getMe() {
    const response = await axiosClient.get<StudentResponse>(API_URL.STUDENT.ME);

    return response.data;
  }

  async updateMe(data: UpdateStudentSchema) {
    const response = await axiosClient.patch<StudentResponse>(
      API_URL.STUDENT.ME,
      data
    );

    return response.data;
  }

  async bookLesson({ teacherId, startTime, note }: BookingRequest) {
    console.log({ teacherId, startTime, note });
    const res = await axiosClient.post(API_URL.BOOKINGS.BASE, {
      teacherId,
      startTime,
      note,
    });
    return res.data;
  }
}

export const studentService = new StudentService();
