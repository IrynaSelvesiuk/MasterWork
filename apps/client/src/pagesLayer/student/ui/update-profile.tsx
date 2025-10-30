'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';

import { LoadingSpinner } from '@/shared/ui/spinner';
import { useGetMyStudentProfile } from '@/entities/student/hooks/queries/useGetMyStudentProfile';
import { useUpdateStudentProfile } from '@/entities/student/hooks/mutations/useUpdateStudentProfile';
import {
  StudentProfileFormSchema,
  studentProfileSchema,
} from '@/entities/student/schemas/student-profile-schema';
import { BasicInfoFields } from '@/widgets/student';
import { ChooseLanguagesInput } from '@/features/select-languages';

export function StudentUpdatePage() {
  const queryClient = useQueryClient();

  const { data: currentProfile, isLoading } = useGetMyStudentProfile();
  const { mutate: updateProfile, isPending: isSaving } =
    useUpdateStudentProfile();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<StudentProfileFormSchema>({
    resolver: zodResolver(studentProfileSchema),
  });

  useEffect(() => {
    if (currentProfile) {
      reset({
        firstName: currentProfile.user?.firstName || '',
        lastName: currentProfile.user?.lastName || '',
        email: currentProfile.user?.email || '',
        learningGoals: currentProfile.learningGoals || '',
        languages: currentProfile.languages || [],
      });
    }
  }, [currentProfile, reset]);

  const onSubmit: SubmitHandler<StudentProfileFormSchema> = (data) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success('Профіль студента оновлено!');
        queryClient.invalidateQueries({ queryKey: ['my-student-profile'] });
      },
      onError: (err) => {
        toast.error('Помилка при збереженні: ' + err.message);
      },
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Редагувати профіль</h1>
        <button
          type="submit"
          disabled={isSaving}
          className="btn btn-primary flex items-center gap-2"
        >
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Цілі навчання
            </label>
            <textarea
              {...register('learningGoals')}
              rows={4}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Опишіть, які у вас цілі в навчанні..."
            />
            {errors.learningGoals && (
              <p className="text-red-500 text-sm mt-1">
                {errors.learningGoals.message}
              </p>
            )}
          </div>
        </div>

        <ChooseLanguagesInput
          label="Мови"
          name="languages"
          control={control}
          errors={errors}
        />
      </div>
    </form>
  );
}
