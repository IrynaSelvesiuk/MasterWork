import { useQuery } from '@tanstack/react-query';
import { teacherService } from '../services/teacher-service';

export const useGetTeacherDashboard = () => {
  return useQuery({
    queryKey: ['my-dashboard'],
    queryFn: () => teacherService.getDashboard(),
  });
};
