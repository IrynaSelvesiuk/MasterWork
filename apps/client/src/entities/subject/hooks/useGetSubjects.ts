import { subjectService } from '@/entities/subject';
import { QUERY_KEY } from '@/shared/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetSubjects = () => {
  return useQuery({
    queryKey: [QUERY_KEY.SUBJECTS],
    queryFn: async () => {
      return subjectService.getAllSubjects();
    },
  });
};
