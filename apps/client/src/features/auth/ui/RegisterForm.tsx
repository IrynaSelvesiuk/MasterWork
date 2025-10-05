'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ROUTES } from '@/shared/router/routes';
import {
  registerSchema,
  RegisterFormData,
} from '../model/schemas/register-schema';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log('Register data:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-green-800 mb-1"
        >
          Ім’я
        </label>
        <input
          id="name"
          {...register('name')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.name ? 'border-red-400 ring-red-300' : 'focus:ring-green-500'
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
        disabled={isSubmitting}
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
