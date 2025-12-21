import { useMutation } from '@tanstack/react-query';
import { teacherService } from '../services/teacher-service';
import { TeacherProfileFormSchema } from '../schemas/teacher-profile-form-schema';
import { queryClient } from '@/shared/config/query-client';
import { QUERY_KEY } from '@/shared/constants/query-keys';

export const useUpdateMyProfile = () => {
  return useMutation({
    mutationFn: (data: TeacherProfileFormSchema) =>
      teacherService.updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TEACHER_PROFILE] });
    },
  });
};
