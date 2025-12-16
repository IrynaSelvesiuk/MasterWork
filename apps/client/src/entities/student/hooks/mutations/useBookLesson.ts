import toast from 'react-hot-toast';
import { BookingRequest, studentService } from '../../services/student.service';
import { useMutation } from '@tanstack/react-query';

interface NestErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useBookLesson = () => {
  return useMutation({
    mutationFn: (data: BookingRequest) => studentService.bookLesson(data),
    onSuccess: () => {
      toast.success('Запит на урок надіслано!');
    },
    onError: (error: unknown) => {
      let message = 'Помилка при бронюванні';

      if (typeof error === 'object' && error !== null) {
        const e = error as NestErrorResponse;
        if (e.response?.data?.message) {
          message = e.response.data.message;
        }
      }

      toast.error(message);
    },
  });
};
