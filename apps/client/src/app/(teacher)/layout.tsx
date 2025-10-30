'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user/model/store';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { Role } from '@/shared/enums/role.enum';
import { ROUTES } from '@/shared/router/routes';
import { TeacherSidebar } from '@/pagesLayer/teacher';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  const isTeacher =
    Array.isArray(user?.role) && user.role.includes(Role.Teacher);
  useEffect(() => {
    if (!isAuthLoading && (!user || !isTeacher)) {
      router.replace(ROUTES.LOGIN);
    }
  }, [user, isTeacher, isAuthLoading, router]);

  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  if (isTeacher && user) {
    return (
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    );
  }

  return <LoadingSpinner />;
}
