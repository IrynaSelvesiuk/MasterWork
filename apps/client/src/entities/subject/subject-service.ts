import { axiosClient } from '@/shared/config/axios-config';
import { Subject } from './model/subject';
import { API_URL } from '@/shared/constants/api-url';

class SubjectService {
  constructor() {}

  async getAllSubjects() {
    const response = await axiosClient.get<Subject[]>(API_URL.SUBJECT.ALL);

    return response.data;
  }
}

export const subjectService = new SubjectService();
