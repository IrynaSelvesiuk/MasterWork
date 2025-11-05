'use client';

import { useGetMyStudentProfile } from '@/entities/student/hooks/queries/useGetMyStudentProfile';
import { ProfileMainContent } from '@/pagesLayer/profile/ui/ProfileMainContent';
import { ProfileSidebar } from '@/pagesLayer/profile/ui/ProfileSidebar';
import { LoadingSpinner } from '@/shared/ui/spinner';

export function ProfilePage() {
  const { data: studentData, isLoading } = useGetMyStudentProfile();

  if (isLoading) return <LoadingSpinner />;

  if (!studentData) return <p>Ooops, no data received</p>;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Мій Кабінет</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProfileSidebar student={studentData} />

        <ProfileMainContent student={studentData} />
      </div>
    </div>
  );
}
