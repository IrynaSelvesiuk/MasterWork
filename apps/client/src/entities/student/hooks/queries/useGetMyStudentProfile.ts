import { QUERY_KEY } from '@/shared/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { studentService } from '../../services/student.service';

export const useGetMyStudentProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEY.STUDENT_PROFILE],
    queryFn: () => studentService.getMe(),
  });
};
