'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user/model/store';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { Role } from '@/shared/enums/role.enum';
import { ROUTES } from '@/shared/router/routes';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  const isStudent =
    user?.role?.includes(Role.Student) && user?.role?.length == 1;

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user || !isStudent) {
      router.replace(ROUTES.LOGIN);
    }
  }, [user, isStudent, isAuthLoading, router]);

  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  if (isStudent && user) {
    return (
      <div className="flex bg-white">
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    );
  }

  return <LoadingSpinner />;
}
