import { useMutation } from '@tanstack/react-query';
import { studentService } from '../../services/student.service';
import { UpdateStudentSchema } from '../../schemas/update-student-schema';
import { queryClient } from '@/shared/config/query-client';
import { QUERY_KEY } from '@/shared/constants/query-keys';

export const useUpdateStudentProfile = () => {
  return useMutation({
    mutationFn: (data: UpdateStudentSchema) => studentService.updateMe(data),
    onSuccess: () => {
      // 🔥 інвалідити query, щоб перезавантажити профіль
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.STUDENT_PROFILE] });
    },
  });
};
