'use client';

import { TutorQueryParams } from '@/entities/teacher/types/tutor-query-params';
import { TutorSearchBar, TutorListSection } from '@/features/tutors';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const TutorsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<TutorQueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'DESC',
    subject: searchParams?.get('subject') || undefined,
    location: searchParams?.get('location') || '',
    search: searchParams?.get('search') || undefined,
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.subject) params.set('subject', filters.subject);
    if (filters.location) params.set('location', filters.location);
    if (filters.search) params.set('search', filters.search);
    params.set('page', filters.page.toString());
    params.set('limit', filters.limit.toString());
    params.set('sortBy', filters.sortBy);
    params.set('order', filters.order);

    router.replace(`/tutors?${params.toString()}`);
  }, [filters, router]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <TutorSearchBar
        onFilterChange={(newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
        }
        initialFilters={filters}
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
