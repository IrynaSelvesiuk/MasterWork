import { QUERY_KEY } from '@/shared/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { teacherService } from '../services/teacher-service';

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TEACHER_PROFILE],
    queryFn: () => teacherService.getMe(),
  });
};
