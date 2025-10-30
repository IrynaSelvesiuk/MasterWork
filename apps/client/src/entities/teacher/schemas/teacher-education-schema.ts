import z from 'zod';

export const teacherEducationSchema = z.object({
  degree: z.string().min(1, "Ступінь є обов'язковим"),
  university: z.string().min(1, "Університет є обов'язковим"),
  years: z.string().min(1, "Роки є обов'язковими"),
});

export type TeacherEducationSchema = z.infer<typeof teacherEducationSchema>;
