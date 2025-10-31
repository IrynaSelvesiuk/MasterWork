import toast from 'react-hot-toast';
import { BookingRequest, studentService } from '../../services/student.service';
import { useMutation } from '@tanstack/react-query';

export const useBookLesson = () => {
  return useMutation({
    mutationFn: (data: BookingRequest) => studentService.bookLesson(data),
    onSuccess: () => {
      toast.success('Запит на урок надіслано!');
    },
    onError: () => {
      toast.error('Помилка при бронюванні');
    },
  });
};
