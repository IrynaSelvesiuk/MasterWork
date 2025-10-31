'use client';

import { useGetMyProfile } from '@/entities/teacher';
import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function TeacherSidebar() {
  const pathname = usePathname();
  const { data: teacher, isLoading } = useGetMyProfile();
  console.log(teacher);
  const links = useMemo(() => {
    const teacherId = teacher?.id;

    return [
      { href: ROUTES.TEACHER.DASHBOARD, label: 'Головна (Dashboard)' },
      {
        href: `${ROUTES.TEACHER.PROFILE}/${teacherId}`,
        label: 'Мій публічний профіль',
      },
      { href: ROUTES.TEACHER.CALENDAR, label: 'Розклад та Календар' },
      { href: ROUTES.TEACHER.ME, label: 'Мій особистий профіль' },
      { href: ROUTES.TEACHER.MY_STUDENTS, label: 'Мої студенти' },
    ];
  }, [teacher]);

  return (
    <nav className="w-64 h-screen sticky top-24 bg-gray-50 border-r p-6 flex flex-col">
      <h2 className="text-xl font-bold text-green-700 mb-8">Кабінет Вчителя</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`
                block px-4 py-2 rounded-lg transition-colors
                ${
                  pathname === link.href
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
