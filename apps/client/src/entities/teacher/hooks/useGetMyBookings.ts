import { useQuery } from '@tanstack/react-query';
import { teacherService } from '../services/teacher-service';

export const useGetMyBookings = () => {
  return useQuery({
    queryKey: ['myBookings'],
    queryFn: () => teacherService.getMyBookings(),
  });
};
