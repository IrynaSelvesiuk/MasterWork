import z from 'zod';
import { teacherEducationSchema } from './teacher-education-schema';
import { teacherExperienceSchema } from './teacher-experience-schema';

export const teacherProfileFormSchema = z.object({
  headline: z.string().min(10, 'Заголовок має бути не менше 10 символів'),
  bio: z.string().min(50, 'Біографія має бути не менше 50 символів'),
  hourlyRate: z.number().min(0, 'Ставка не може бути негативною'),
  location: z.string().min(1, "Місцезнаходження є обов'язковим"),
  videoUrl: z.string().url('Невірний URL').or(z.literal('')),
  speaks: z.array(z.string()).min(1, 'Вкажіть хоча б одну мову'),
  subjectIds: z
    .array(z.string())
    .min(1, 'Виберіть хоча б один предмет')
    .max(5, 'Ви можете вибрати не більше 5 предметів'),
  education: z.array(teacherEducationSchema),
  experience: z.array(teacherExperienceSchema),
});

export type TeacherProfileFormSchema = z.infer<typeof teacherProfileFormSchema>;
