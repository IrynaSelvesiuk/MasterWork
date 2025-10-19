import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Невірний формат email'),
  password: z.string().min(6, 'Пароль має містити щонайменше 6 символів'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
