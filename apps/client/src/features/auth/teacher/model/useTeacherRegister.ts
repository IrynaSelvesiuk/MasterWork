import { useMutation } from '@tanstack/react-query';
import { teacherAuthService } from './teacher-auth-service';
import { TeacherRegisterSchema } from './schemas/teacher-register-schema';
import { MUTATION_KEY } from '@/shared/constants/mutation-key';

export const useTeacherRegister = () => {
  return useMutation({
    mutationKey: [MUTATION_KEY.REGISTER],
    mutationFn: async (data: TeacherRegisterSchema) =>
      teacherAuthService.register(data),
  });
};
