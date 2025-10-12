import { useMutation } from '@tanstack/react-query';
import { RegisterFormData } from '../schemas/register-schema';
import { authService } from '../auth-service';
import { MUTATION_KEY } from '@/shared/constants/mutation-key';

export const useRegister = () => {
  return useMutation({
    mutationKey: [MUTATION_KEY.REGISTER],
    mutationFn: (data: RegisterFormData) => authService.register(data),
  });
};
