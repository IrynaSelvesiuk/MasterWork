import z from 'zod';
import { registerSchema } from './register-schema';

export const updateStudentSchema = registerSchema.partial();

export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;
