'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ROUTES } from '@/shared/router/routes';
import {
  registerSchema,
  RegisterFormData,
} from '../../../../entities/student/schemas/register-schema';
import { useRegister } from '../../../../entities/student/hooks/mutations/useRegister';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user/model/store';
import { ChooseLanguagesInput } from '@/features/select-languages';
import { ImagePicker } from '@/features/image-picker/ui/image-picker';
import { useState } from 'react';

export const RegisterForm = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      learningGoals: '',
      languages: [],
      avatarUrl: '',
    },
  });

  const { mutate, isPending, error } = useRegister();
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    mutate(data, {
      onSuccess: (responseData) => {
        reset();
        setUser({
          id: responseData.userDto.id,
          firstName: responseData.userDto.firstName,
          lastName: responseData.userDto.lastName,
          email: responseData.userDto.email,
          createdAt: responseData.userDto.createdAt,
          role: responseData.userDto.role,
          image: null,
        });

        toast.success(`Привіт ${user?.firstName}!`);
        router.push(ROUTES.TUTORS);
      },
      onError: () => {
        toast.error(error?.message || 'Something went wrong while registering');
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="md:col-span-2 flex flex-col items-center gap-3">
        <ImagePicker
          onUpload={(url) => {
            setAvatarUrl(url);
            setValue('avatarUrl', url);
          }}
        />
        {avatarUrl && (
          <p className="text-sm text-green-600">Фото завантажено ✅</p>
        )}
      </div>
      {/* Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-green-800 mb-1"
        >
          Ім’я
        </label>
        <input
          id="name"
          {...register('firstName')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.firstName
              ? 'border-red-400 ring-red-300'
              : 'focus:ring-green-500'
          }`}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-green-800 mb-1"
        >
          Прізвище
        </label>
        <input
          id="name"
          {...register('lastName')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.lastName
              ? 'border-red-400 ring-red-300'
              : 'focus:ring-green-500'
          }`}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-green-800 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.email
              ? 'border-red-400 ring-red-300'
              : 'focus:ring-green-500'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-green-800 mb-1"
        >
          Пароль
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.password
              ? 'border-red-400 ring-red-300'
              : 'focus:ring-green-500'
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="learningGoals"
          className="block text-sm font-medium text-green-800 mb-1"
        >
          Ваші навчальні цілі (необов&apos;язково)
        </label>
        <textarea
          id="learningGoals"
          rows={3}
          {...register('learningGoals')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.learningGoals
              ? 'border-red-400 ring-red-300'
              : 'focus:ring-green-500'
          }`}
          placeholder="Наприклад: 'Хочу вільно спілкуватися англійською у подорожах'"
        />
        {errors.learningGoals && (
          <p className="text-red-500 text-sm mt-1">
            {errors.learningGoals.message}
          </p>
        )}
      </div>

      <ChooseLanguagesInput<RegisterFormData>
        label="Мови, якими ви володієте"
        name="languages"
        control={control}
        errors={errors}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Вже маєте акаунт?{' '}
        <Link
          href={ROUTES.LOGIN}
          className="text-green-700 font-medium hover:underline cursor-pointer"
        >
          Увійти
        </Link>
      </p>
    </form>
  );
};
