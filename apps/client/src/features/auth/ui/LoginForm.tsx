'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { loginSchema, LoginFormData } from '../model/schemas/login-schema';
import { ROUTES } from '@/shared/router/routes';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('Login data:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
      >
        {isSubmitting ? 'Увійти...' : 'Увійти'}
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Ще немає акаунту?{' '}
        <Link
          href={ROUTES.REGISTER}
          className="text-green-700 font-medium hover:underline"
        >
          Зареєструватися
        </Link>
      </p>
    </form>
  );
};
