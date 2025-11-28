import z from 'zod';

export const teacherRegisterSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email('Невірна пошта'),
  password: z
    .string()
    .min(8, 'Пароль повинен містити щонайменше 8 символів')
    .max(16, 'Пароль занадто довгий'),
  avatarUrl: z.string().optional(),
  subjectIds: z.array(z.string().min(1, 'Виберіть хоча б 1 предмет')),
  yearsOfExperience: z
    .number()
    .min(0, 'Досвід повинен бути більше 0')
    .max(50, 'Складно в це повірити')
    .optional(),
  bio: z.string().max(200, 'Максимально - 200 символів').optional(),
  location: z.string(),
  hourlyRate: z.number(),
});

export type TeacherRegisterSchema = z.infer<typeof teacherRegisterSchema>;
