import { axiosClient } from '@/shared/config/axios-config';
import { useQuery } from '@tanstack/react-query';

export const useBookedSlots = (teacherId: string) => {
  return useQuery({
    queryKey: ['booked-slots', teacherId],
    queryFn: async () => {
      const { data } = await axiosClient.get<string[]>(
        `/bookings/teacher/${teacherId}/booked-slots`
      );
      return data;
    },
    enabled: !!teacherId,
    staleTime: 60_000,
  });
};
