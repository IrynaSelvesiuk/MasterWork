'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user/model/store';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { Role } from '@/shared/enums/role.enum';
import { ROUTES } from '@/shared/router/routes';
import { ProfilePage } from '@/pagesLayer/profile';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthLoading } = useAuthStore((state) => ({
    user: state.user,
    isAuthLoading: state.isLoading,
  }));

  const isTeacher =
    user?.role?.includes(Role.Student) && user?.role?.length == 1;

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user || !isTeacher) {
      router.replace(ROUTES.LOGIN);
    }
  }, [user, isTeacher, isAuthLoading, router]);

  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  if (isTeacher && user) {
    return (
      <div className="flex h-screen bg-white">
        <ProfilePage />

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    );
  }

  return <LoadingSpinner />;
}
