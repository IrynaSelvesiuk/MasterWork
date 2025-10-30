'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';

import {
  teacherProfileFormSchema,
  TeacherProfileFormSchema,
  useGetMyProfile,
  useUpdateMyProfile,
} from '@/entities/teacher';

import { BasicInfoFields } from '@/features/teacher/personal-profile/ui/basic-info-fields';
import { EducationFields } from '@/features/teacher/personal-profile/ui/education-fields';
import { ExperienceFields } from '@/features/teacher/personal-profile/ui/experience-fields';
import { SettingsFields } from '@/features/teacher/personal-profile/ui/settings-fields';
import { ChooseSubjectsInput } from '@/features/select-subjects';
import { LoadingSpinner } from '@/shared/ui/spinner';

export function TeacherProfilePage() {
  const queryClient = useQueryClient();

  const { data: currentProfile, isLoading: isLoadingProfile } =
    useGetMyProfile();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TeacherProfileFormSchema>({
    resolver: zodResolver(teacherProfileFormSchema),
  });

  useEffect(() => {
    if (currentProfile) {
      reset(currentProfile);
    }
  }, [currentProfile, reset]);

  const { mutate: updateProfile, isPending: isSaving } = useUpdateMyProfile();

  const onSubmit: SubmitHandler<TeacherProfileFormSchema> = (data) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success('Профіль успішно оновлено!');
        queryClient.invalidateQueries({ queryKey: ['my-teacher-profile'] });
      },
      onError: (err) => {
        toast.error('Помилка при збереженні: ' + err.message);
      },
    });
  };

  if (isLoadingProfile) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Редагувати профіль</h1>
        <button type="submit" disabled={isSaving}>
          <FaSave />
          {isSaving ? 'Збереження...' : 'Зберегти зміни'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            Основна інформація
          </h2>
          <BasicInfoFields register={register} errors={errors} />

          <EducationFields
            control={control}
            register={register}
            errors={errors}
          />

          <ExperienceFields
            control={control}
            register={register}
            errors={errors}
          />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Налаштування
            </h2>
            <SettingsFields register={register} errors={errors} />
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <ChooseSubjectsInput
              label="subjects"
              control={control}
              name="subjectIds"
              errors={errors.subjectIds}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
