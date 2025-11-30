'use client';

import React, { useEffect } from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { FaSave } from 'react-icons/fa';

import {
  teacherProfileFormSchema,
  TeacherProfileFormSchema,
  useGetMyProfile,
  useUpdateMyProfile,
} from '@/entities/teacher';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { useGetSubjects } from '@/entities/subject/hooks/useGetSubjects';

export function TeacherProfilePage() {
  const queryClient = useQueryClient();
  const { data: currentProfile, isLoading: isLoadingProfile } =
    useGetMyProfile();
  const { data: subjects = [] } = useGetSubjects();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TeacherProfileFormSchema>({
    resolver: zodResolver(teacherProfileFormSchema),
    defaultValues: {
      headline: '',
      firstName: '',
      lastName: '',
      bio: '',
      hourlyRate: 0,
      location: '',

      speaks: [],
      subjectIds: [],
      education: [],
      experience: [],
    },
  });

  useEffect(() => {
    if (currentProfile) reset(currentProfile);
  }, [currentProfile, reset]);

  const { mutate: updateProfile, isPending: isSaving } = useUpdateMyProfile();

  const onSubmit: SubmitHandler<TeacherProfileFormSchema> = (data) => {
    console.log('Submitting:', data);
    updateProfile(data, {
      onSuccess: () => {
        toast.success('Профіль успішно оновлено!');
        queryClient.invalidateQueries({ queryKey: ['my-teacher-profile'] });
      },
      onError: (err: any) => {
        toast.error('Помилка при збереженні: ' + err.message);
      },
    });
  };

  // Field arrays for education and experience
  const educationFields = useFieldArray({ control, name: 'education' });
  const experienceFields = useFieldArray({ control, name: 'experience' });

  if (isLoadingProfile) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Редагувати профіль</h1>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          <FaSave />
          {isSaving ? 'Збереження...' : 'Зберегти зміни'}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* First Name */}
        <div>
          <label className="font-semibold mb-1 block">Ім'я</label>
          <input
            {...register('firstName')}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="font-semibold mb-1 block">Прізвище</label>
          <input
            {...register('lastName')}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        {/* Headline */}
        <div>
          <label className="font-semibold mb-1 block">Заголовок</label>
          <input
            {...register('headline')}
            placeholder="Наприклад: Вчитель математики"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.headline && (
            <p className="text-red-500 text-sm">{errors.headline.message}</p>
          )}
        </div>

        {/* Hourly Rate */}
        <div>
          <label className="font-semibold mb-1 block">Ставка за годину</label>
          <input
            type="number"
            {...register('hourlyRate', { valueAsNumber: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.hourlyRate && (
            <p className="text-red-500 text-sm">{errors.hourlyRate.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold mb-1 block">Місцезнаходження</label>
          <input
            {...register('location')}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="font-semibold mb-1 block">Про себе</label>
          <textarea
            {...register('bio')}
            rows={4}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>

        {/* Subjects */}
        <div>
          <label className="font-semibold mb-1 block">Предмети</label>
          <Controller
            name="subjectIds"
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={
                  subjects?.map((s) => ({ value: s.id, label: s.name })) || []
                }
                value={
                  subjects
                    ?.filter((s) => field.value?.includes(s.id))
                    .map((s) => ({ value: s.id, label: s.name })) || []
                }
                onChange={(vals) => field.onChange(vals.map((v) => v.value))}
              />
            )}
          />
          {errors.subjectIds && (
            <p className="text-red-500 text-sm">{errors.subjectIds.message}</p>
          )}
        </div>

        {/* Education */}
        <div className="md:col-span-2">
          <label className="font-semibold mb-1 block">Освіта</label>
          {educationFields.fields.map((item, index) => (
            <div key={item.id} className="mb-2 border p-2 rounded">
              <input
                {...register(`education.${index}.degree` as const)}
                placeholder="Ступінь"
                className="w-full border px-2 py-1 rounded mb-1"
              />
              <input
                {...register(`education.${index}.university` as const)}
                placeholder="Університет"
                className="w-full border px-2 py-1 rounded mb-1"
              />
              <input
                {...register(`education.${index}.years` as const)}
                placeholder="Роки навчання"
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              educationFields.append({ degree: '', university: '', years: '' })
            }
            className="mt-2 px-2 py-1 bg-gray-200 rounded"
          >
            Додати освіту
          </button>
        </div>

        {/* Experience */}
        <div className="md:col-span-2">
          <label className="font-semibold mb-1 block">Досвід</label>
          {experienceFields.fields.map((item, index) => (
            <div key={item.id} className="mb-2 border p-2 rounded">
              <input
                {...register(`experience.${index}.position` as const)}
                placeholder="Посада"
                className="w-full border px-2 py-1 rounded mb-1"
              />
              <input
                {...register(`experience.${index}.company` as const)}
                placeholder="Компанія"
                className="w-full border px-2 py-1 rounded mb-1"
              />
              <input
                {...register(`experience.${index}.years` as const)}
                placeholder="Роки роботи"
                className="w-full border px-2 py-1 rounded mb-1"
              />
              <textarea
                {...register(`experience.${index}.description` as const)}
                placeholder="Опис"
                className="w-full border px-2 py-1 rounded"
                rows={2}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              experienceFields.append({
                position: '',
                company: '',
                years: '',
                description: '',
              })
            }
            className="mt-2 px-2 py-1 bg-gray-200 rounded"
          >
            Додати досвід
          </button>
        </div>
      </div>
    </form>
  );
}
