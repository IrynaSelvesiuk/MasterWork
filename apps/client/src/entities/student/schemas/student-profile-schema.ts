import { z } from 'zod';
import { registerSchema } from './register-schema';

export const studentProfileSchema = registerSchema.partial();
export type StudentProfileFormSchema = z.infer<typeof studentProfileSchema>;
