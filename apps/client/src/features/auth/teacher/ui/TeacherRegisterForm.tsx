'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  teacherRegisterSchema,
  TeacherRegisterSchema,
} from '../model/schemas/teacher-register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import InputForm from '../../ui/input-form';
import TextAreaForm from '../../ui/text-area-form';
import ChooseSubjectsInput from '../../ui/choose-subjects-input';
import { useTeacherRegister } from '../model/useTeacherRegister';
import { useAuthStore } from '@/entities/user/model/store';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/router/routes';

const TeacherRegisterForm = () => {
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
      subjects: [''],
      yearsOfExperience: undefined,
      hourlyRate: undefined,
      location: '',
    },
  });
  const { mutate, error } = useTeacherRegister();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const onSubmit = (data: TeacherRegisterSchema) => {
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

        toast.success(`Привіт ${responseData.userDto.firstName}!`);
        router.push(ROUTES.TUTORS);
      },
      onError: () => {
        toast.error(error?.message || 'Something went wrong while registering');
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    >
      {/* Personal info */}
      <InputForm
        label="First Name"
        type="text"
        register={register('firstName')}
        error={errors.firstName}
      />

      <InputForm
        label="Last Name"
        type="text"
        register={register('lastName')}
        error={errors.lastName}
      />

      <InputForm
        label="Email"
        type="email"
        register={register('email')}
        error={errors.email}
      />

      <InputForm
        label="Password"
        type="password"
        register={register('password')}
        error={errors.password}
      />

      {/* Numeric fields */}
      <InputForm
        label="Years of Experience"
        type="number"
        register={register('yearsOfExperience', { valueAsNumber: true })}
        error={errors.yearsOfExperience}
      />

      <InputForm
        label="Hourly Rate"
        type="number"
        register={register('hourlyRate', { valueAsNumber: true })}
        error={errors.hourlyRate}
      />

      {/* Full-width fields */}
      <div className="md:col-span-2">
        <InputForm
          label="Location"
          type="text"
          register={register('location')}
          error={errors.location}
        />
      </div>

      <div className="md:col-span-2">
        <TextAreaForm
          label="Bio"
          register={register('bio')}
          error={errors.bio}
        />
      </div>

      <div className="md:col-span-2">
        <ChooseSubjectsInput
          label="Subjects"
          name="subjects"
          control={control}
          register={register}
          errors={errors}
        />
      </div>

      {/* Submit button */}
      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Registering...' : 'Register as Teacher'}
        </button>
      </div>
    </form>
  );
};

export default TeacherRegisterForm;
