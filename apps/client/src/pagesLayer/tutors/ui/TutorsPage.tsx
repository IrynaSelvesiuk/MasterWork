'use client';

import { TutorQueryParams } from '@/entities/teacher/types/tutor-query-params';
import { TutorSearchBar, TutorListSection } from '@/features/tutors';
import { useState } from 'react';

export const TutorsPage = () => {
  const [filters, setFilters] = useState<TutorQueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'DESC',
    subject: undefined,
    location: '',
    search: undefined,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <TutorSearchBar
        onFilterChange={(newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
        }
      />

      <div className="flex">
        <TutorListSection
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          filters={filters}
        />
      </div>
    </main>
  );
};
