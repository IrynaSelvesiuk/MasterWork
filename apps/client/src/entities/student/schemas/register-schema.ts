import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(2, 'Ім’я має містити щонайменше 2 символи'),
  lastName: z.string().min(2, 'Ім’я має містити щонайменше 2 символи'),
  email: z.email('Невірний формат email'),
  password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
  learningGoals: z.string().optional(),
  languages: z.array(z.string()),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
