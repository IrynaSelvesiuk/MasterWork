import z from 'zod';

export const teacherExperienceSchema = z.object({
  role: z.string().min(1, "Посада є обов'язковою"),
  location: z.string().min(1, "Місце є обов'язковим"),
  years: z.string().min(1, "Роки є обов'язковими"),
  description: z.string().optional(),
});

export type TeacherExperienceSchema = z.infer<typeof teacherExperienceSchema>;
