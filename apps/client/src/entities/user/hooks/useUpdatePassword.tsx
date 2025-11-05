import { authService } from '@/features/auth';
import { useMutation } from '@tanstack/react-query';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => authService.changePassword(currentPassword, newPassword),
  });
};
