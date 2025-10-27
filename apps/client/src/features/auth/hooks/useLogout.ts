import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/auth-service';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/entities/user/model/store';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/router/routes';

export const useLogout = () => {
  const { clearUser } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess() {
      clearUser();

      queryClient.clear();

      router.push(ROUTES.BASE);

      toast.success('Ви вийшли з системи');
    },
    onError() {
      toast.error('Трапилась несподівана помилка');
    },
  });
};
