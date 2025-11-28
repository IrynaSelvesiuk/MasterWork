'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import InputForm from '../../ui/input-form';
import TextAreaForm from '../../ui/text-area-form';
import { useAuthStore } from '@/entities/user/model/store';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/router/routes';
import {
  teacherRegisterSchema,
  TeacherRegisterSchema,
} from '@/entities/teacher';
import { useTeacherRegister } from '@/entities/teacher/hooks/useTeacherRegister';
import { ChooseSubjectsInput } from '@/features/select-subjects';
import { ImagePicker } from '@/features/image-picker/ui/image-picker';

const TeacherRegisterForm = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeacherRegisterSchema>({
    resolver: zodResolver(teacherRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      bio: '',
      subjectIds: [''],
      yearsOfExperience: undefined,
      hourlyRate: undefined,
      location: '',
      avatarUrl: '',
    },
  });
  const { mutate, error } = useTeacherRegister();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const onSubmit = (data: TeacherRegisterSchema) => {
    mutate(
      { ...data, avatarUrl: avatarUrl ? avatarUrl : '' },
      {
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

          toast.success(`Привіт ${responseData.userDto.firstName}!`);
          router.push(ROUTES.TUTORS);
        },
        onError: () => {
          toast.error(error?.message || 'Трапилась помилка під час реєстрації');
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    >
      <div className="md:col-span-2 flex flex-col items-center gap-3">
        <ImagePicker onUpload={(url) => setAvatarUrl(url)} />
        {avatarUrl && (
          <p className="text-sm text-green-600">Фото завантажено ✅</p>
        )}
      </div>
      {/* Personal info */}
      <InputForm
        label="Ім'я"
        type="text"
        register={register('firstName')}
        error={errors.firstName}
        required
      />

      <InputForm
        label="Прізвище"
        type="text"
        register={register('lastName')}
        error={errors.lastName}
        required
      />

      <InputForm
        label="Електронна адреса"
        type="email"
        register={register('email')}
        error={errors.email}
        required
      />

      <InputForm
        label="Пароль"
        type="password"
        register={register('password')}
        error={errors.password}
        required
      />

      {/* Numeric fields */}
      <InputForm
        label="Педагогічний досвід (роки)"
        type="number"
        register={register('yearsOfExperience', { valueAsNumber: true })}
        error={errors.yearsOfExperience}
      />

      <InputForm
        label="Погодинна оплата (грн)"
        type="number"
        register={register('hourlyRate', { valueAsNumber: true })}
        error={errors.hourlyRate}
        required
      />

      {/* Full-width fields */}
      <div className="md:col-span-2">
        <InputForm
          label="Розташування"
          type="text"
          register={register('location')}
          error={errors.location}
          required
        />
      </div>

      <div className="md:col-span-2">
        <TextAreaForm
          label="Про себе"
          register={register('bio')}
          error={errors.bio}
        />
      </div>

      <div className="md:col-span-2">
        <ChooseSubjectsInput
          label="Предмети"
          name="subjectIds"
          control={control}
          errors={errors}
          required
        />
      </div>

      {/* Submit button */}
      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Реєстрація...' : 'Зареєструватись як викладач'}
        </button>
      </div>
    </form>
  );
};

export default TeacherRegisterForm;
