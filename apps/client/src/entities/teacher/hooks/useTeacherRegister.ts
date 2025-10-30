import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/mutation-key';
import { TeacherRegisterSchema } from '../schemas/teacher-register-schema';
import { teacherAuthService } from '../services/teacher-auth-service';

export const useTeacherRegister = () => {
  return useMutation({
    mutationKey: [MUTATION_KEY.REGISTER],
    mutationFn: async (data: TeacherRegisterSchema) =>
      teacherAuthService.register(data),
  });
};
