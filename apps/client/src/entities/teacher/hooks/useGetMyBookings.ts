import { useQuery } from '@tanstack/react-query';
import { teacherService } from '../services/teacher-service';

export const useGetMyBookings = () => {
  return useQuery({
    queryKey: ['myBookings'],
    queryFn: () => teacherService.getMyBookings(),
    refetchOnMount: 'always', // 🔥 завжди робить запит при монтованні
    refetchOnWindowFocus: true, // оновлює, коли користувач повертається на вкладку
  });
};
