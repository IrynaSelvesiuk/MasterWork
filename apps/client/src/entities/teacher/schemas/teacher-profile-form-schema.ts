import z from 'zod';
import { teacherEducationSchema } from './teacher-education-schema';
import { teacherExperienceSchema } from './teacher-experience-schema';

export const teacherProfileFormSchema = z.object({
  headline: z.string().min(10).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().min(50).optional(),
  hourlyRate: z.number().min(0).optional(),
  location: z.string().min(1).optional(),
  speaks: z.array(z.string()).optional(),
  subjectIds: z.array(z.string()).max(5).optional(),
  education: z.array(teacherEducationSchema).optional(),
  experience: z.array(teacherExperienceSchema).optional(),
});

export type TeacherProfileFormSchema = z.infer<typeof teacherProfileFormSchema>;
