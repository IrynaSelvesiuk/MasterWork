import { QUERY_KEY } from '@/shared/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { teacherService } from '../services/teacher-service';

export const useGetTeacherDashboard = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => teacherService.getDashboard(),
  });
};
