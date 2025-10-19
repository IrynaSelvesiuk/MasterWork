'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ROUTES } from '@/shared/router/routes';
import {
  registerSchema,
  RegisterFormData,
} from '../model/schemas/register-schema';
import { useRegister } from '../model/mutations/useRegister';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user/model/store';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const { mutate, isPending, error } = useRegister();
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const onSubmit = (data: RegisterFormData) => {
    mutate(data, {
      onSuccess: (responseData) => {
        reset();
        setUser({
          userId: responseData.userDto.id,
          firstName: responseData.userDto.firstName,
          lastName: responseData.userDto.lastName,
          email: responseData.userDto.email,
          joinedDate: responseData.userDto.createdAt,
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
