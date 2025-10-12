import { useMutation } from '@tanstack/react-query';
import { LoginFormData } from '../schemas/login-schema';
import { MUTATION_KEY } from '@/shared/constants/mutation-key';
import { authService } from '../auth-service';

export const useLogin = () =>
  useMutation({
    mutationKey: [MUTATION_KEY.LOGIN],
    mutationFn: (data: LoginFormData) => authService.login(data),
  });
