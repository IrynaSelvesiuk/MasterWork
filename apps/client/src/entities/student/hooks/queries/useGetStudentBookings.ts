import { useQuery } from '@tanstack/react-query';
import { Booking } from '@/entities/booking';
import { axiosClient } from '@/shared/config/axios-config';

export const useGetStudentBookings = () => {
  return useQuery({
    queryKey: ['student-bookings'],
    queryFn: async () => {
      const { data } = await axiosClient.get<Booking[]>('/bookings/student');
      return data;
    },
  });
};
