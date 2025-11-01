'use client';

import { TutorQueryParams } from '@/entities/teacher/types/tutor-query-params';
import { TutorCard } from './TutorCard';
import { useGetTeachers } from '@/entities/teacher/hooks/useGetTeachers';

interface Props {
  filters: TutorQueryParams;
  onPageChange: (page: number) => void;
}

export const TutorListSection = ({ filters, onPageChange }: Props) => {
  const { data, isLoading, isError } = useGetTeachers(filters);

  if (isLoading) return <p>Завантаження репетиторів...</p>;
  if (isError) return <p>Помилка при завантаженні.</p>;
  console.log(data);
  const tutors = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <section className="flex-grow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Англійська: знайдено{' '}
        <span className="text-green-600">{total ?? 0}</span> репетитора/-ку
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

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => onPageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Попередня
          </button>

          <span className="px-2 font-medium">
            Сторінка {filters.page} з {totalPages}
          </span>

          <button
            onClick={() => onPageChange(filters.page + 1)}
            disabled={filters.page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Наступна
          </button>
        </div>
      )}
    </section>
  );
};
