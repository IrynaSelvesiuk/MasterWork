import { useMutation } from '@tanstack/react-query';
import { teacherService } from '../services/teacher-service';
import { TeacherProfileFormSchema } from '../schemas/teacher-profile-form-schema';

export const useUpdateMyProfile = () => {
  return useMutation({
    mutationFn: (data: TeacherProfileFormSchema) =>
      teacherService.updateMyProfile(data),
  });
};
