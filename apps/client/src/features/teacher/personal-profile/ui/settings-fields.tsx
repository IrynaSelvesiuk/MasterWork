'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TeacherProfileFormSchema } from '@/entities/teacher';

interface Props {
  register: UseFormRegister<TeacherProfileFormSchema>;
  errors: FieldErrors<TeacherProfileFormSchema>;
}

export const SettingsFields = ({ register, errors }: Props) => {
  return (
    <>
      <div>
        <label htmlFor="hourlyRate" className="block mb-2 font-medium">
          Погодинна ставка ($)
        </label>
        <input
          id="hourlyRate"
          type="number"
          {...register('hourlyRate', { valueAsNumber: true })}
          className="w-full rounded border p-2"
        />
        {errors.hourlyRate && (
          <p className="text-sm text-red-500 mt-1">
            {errors.hourlyRate.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="location" className="block mb-2 font-medium">
          Місцезнаходження
        </label>
        <input
          id="location"
          {...register('location')}
          className="w-full rounded border p-2"
          placeholder="Напр. Львів, Україна (викладаю онлайн)"
        />
        {errors.location && (
          <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="videoUrl" className="block mb-2 font-medium">
          URL на промо-відео (YouTube тощо)
        </label>
        <input
          id="videoUrl"
          {...register('videoUrl')}
          className="w-full rounded border p-2"
          placeholder="https://..."
        />
        {errors.videoUrl && (
          <p className="text-sm text-red-500 mt-1">{errors.videoUrl.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="speaks" className="block mb-2 font-medium">
          Мови (через кому)
        </label>
        <input
          id="speaks"
          {...register('speaks', {
            setValueAs: (v) =>
              typeof v === 'string'
                ? v.split(',').map((s: string) => s.trim())
                : [],
          })}
          className="w-full rounded border p-2"
          placeholder="Українська, Англійська..."
        />
        {errors.speaks && (
          <p className="text-sm text-red-500 mt-1">{errors.speaks.message}</p>
        )}
      </div>
    </>
  );
};
