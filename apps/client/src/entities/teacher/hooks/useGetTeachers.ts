import { QUERY_KEY } from '@/shared/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { teacherService } from '../services/teacher-service';
import { TutorQueryParams } from '../types/tutor-query-params';

export const useGetTeachers = (filters: TutorQueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.TEACHERS, filters],
    queryFn: () => teacherService.getTeachers(filters),
  });
};
