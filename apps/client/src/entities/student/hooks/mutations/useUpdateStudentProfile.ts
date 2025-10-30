import { useMutation } from '@tanstack/react-query';
import { studentService } from '../../services/student.service';
import { UpdateStudentSchema } from '../../schemas/update-student-schema';

export const useUpdateStudentProfile = () => {
  return useMutation({
    mutationFn: (data: UpdateStudentSchema) => studentService.updateMe(data),
  });
};
