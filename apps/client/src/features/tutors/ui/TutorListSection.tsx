'use client';

import { TutorQueryParams } from '@/entities/teacher/types/tutor-query-params';
import { TutorCard } from './TutorCard';
import { useGetTeachers } from '@/entities/teacher/hooks/useGetTeachers';

interface Props {
  filters: TutorQueryParams;
}

export const TutorListSection = ({ filters }: Props) => {
  const { data, isLoading, isError } = useGetTeachers(filters);

  if (isLoading) return <p>Завантаження репетиторів...</p>;
  if (isError) return <p>Помилка при завантаженні.</p>;

  const tutors = data ?? [];

  return (
    <section className="flex-grow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Англійська: знайдено{' '}
        <span className="text-green-600">{data?.length ?? 0}</span>{' '}
        репетитора/-ку
      </h2>
      <div className="space-y-6">
        {tutors
          .filter((tutor) => !!tutor.user)
          .map((tutor) => {
            const isNew =
              new Date(tutor.createdAt) >
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

            return <TutorCard key={tutor.id} teacher={tutor} isNew={isNew} />;
          })}
      </div>
    </section>
  );
};
