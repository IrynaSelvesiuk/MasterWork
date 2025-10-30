// features/student/profile/ui/basic-info-fields.tsx
import { StudentProfileFormSchema } from '@/entities/student/schemas/student-profile-schema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<StudentProfileFormSchema>;
  errors: FieldErrors<StudentProfileFormSchema>;
}

export const BasicInfoFields = ({ register, errors }: Props) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Ім’я</label>
      <input {...register('firstName')} className="input" />
      {errors.firstName && (
        <p className="text-red-500 text-sm">{errors.firstName.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium">Прізвище</label>
      <input {...register('lastName')} className="input" />
      {errors.lastName && (
        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium">Email</label>
      <input {...register('email')} type="email" className="input" />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
    </div>
  </div>
);
