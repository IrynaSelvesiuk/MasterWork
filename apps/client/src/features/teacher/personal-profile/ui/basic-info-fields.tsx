'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TeacherProfileFormSchema } from '@/entities/teacher';

interface Props {
  register: UseFormRegister<TeacherProfileFormSchema>;
  errors: FieldErrors<TeacherProfileFormSchema>;
}

export const BasicInfoFields = ({ register, errors }: Props) => {
  return (
    <>
      <div>
        <label htmlFor="headline" className="block mb-2 font-medium">
          Заголовок (Headline)
        </label>
        <input
          id="headline"
          {...register('headline')}
          className="w-full rounded border p-2"
          placeholder="Напр. Сертифікований репетитор з математики..."
        />
        {errors.headline && (
          <p className="text-sm text-red-500 mt-1">{errors.headline.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="bio" className="block mb-2 font-medium">
          Біографія (Про себе)
        </label>
        <textarea
          id="bio"
          {...register('bio')}
          className="w-full rounded border p-2"
          rows={6}
          placeholder="Розкажіть студентам про свій підхід, досвід та чому ви любите викладати..."
        />
        {errors.bio && (
          <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
        )}
      </div>
    </>
  );
};
