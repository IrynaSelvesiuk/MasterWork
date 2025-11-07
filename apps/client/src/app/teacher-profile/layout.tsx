'use client';

import React from 'react';
import { useAuthStore } from '@/entities/user/model/store';
import { Role } from '@/shared/enums/role.enum';
import { TeacherSidebar } from '@/pagesLayer/teacher';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const isTeacher =
    Array.isArray(user?.role) && user.role.includes(Role.Teacher);

  if (isTeacher) {
    return (
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    );
  }

  // Non-teacher or not logged in → just show the page content normally
  return <main className="flex-1 p-8">{children}</main>;
}
