import z from 'zod';

export const teacherRegisterSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(16, 'Password is too long'),

  subjects: z.array(z.string().min(1, 'Subject is required')),
  yearsOfExperience: z
    .number()
    .min(0, 'Experience must be positive')
    .max(50, 'Experience seems unrealistic')
    .optional(),
  bio: z.string().max(200, 'Bio must not exceed 200 characters').optional(),
  location: z.string(),
  hourlyRate: z.number(),
});

export type TeacherRegisterSchema = z.infer<typeof teacherRegisterSchema>;
