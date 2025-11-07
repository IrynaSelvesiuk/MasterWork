// features/student/profile/ui/basic-info-fields.tsx
import { StudentProfileFormSchema } from '@/entities/student/schemas/student-profile-schema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<StudentProfileFormSchema>;
  errors: FieldErrors<StudentProfileFormSchema>;
}

export const BasicInfoFields = ({ register, errors }: Props) => (
  <div className="space-y-6">
    {/** Ім’я */}
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Ім’я
      </label>
      <input
        {...register('firstName')}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 
                   text-gray-800 shadow-sm transition 
                   focus:border-green-600 focus:ring-2 focus:ring-green-200 
                   hover:border-gray-400"
        placeholder="Введіть ім’я"
      />
      {errors.firstName && (
        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
      )}
    </div>

    {/** Прізвище */}
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Прізвище
      </label>
      <input
        {...register('lastName')}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 
                   text-gray-800 shadow-sm transition 
                   focus:border-green-600 focus:ring-2 focus:ring-green-200 
                   hover:border-gray-400"
        placeholder="Введіть прізвище"
      />
      {errors.lastName && (
        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
      )}
    </div>

    {/** Email */}
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        {...register('email')}
        type="email"
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 
                   text-gray-800 shadow-sm transition 
                   focus:border-green-600 focus:ring-2 focus:ring-green-200 
                   hover:border-gray-400"
        placeholder="Введіть email"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>
  </div>
);
