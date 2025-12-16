'use client';

import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/shared/router/routes';
import {
  FaUsers,
  FaCalendarAlt,
  FaDollarSign,
  FaBookOpen,
  FaArrowRight,
  FaEdit,
} from 'react-icons/fa';
import { StatCard } from './stat-card';
import { useGetTeacherDashboard } from '@/entities/teacher/hooks/useGetTeacherDashboard';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { Badge } from '@/widgets/teacher/badge';

export function DashboardPage() {
  const { data, isLoading } = useGetTeacherDashboard();
  console.log(data);
  if (isLoading) return <LoadingSpinner />;
  if (!data) return <p>No dashboard data available.</p>;

  const { teacher, stats, recentBookings } = data;
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Вітаємо, {teacher?.name ?? 'Вчителю'}!
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Всього студентів"
          value={stats?.totalBookings}
          icon={FaUsers}
        />
        <StatCard
          title="Найближчі уроки"
          value={stats?.upcomingLessons}
          icon={FaCalendarAlt}
        />
        <StatCard
          title="Підтверджені уроки"
          value={stats?.confirmed}
          icon={FaBookOpen}
        />
        <StatCard
          title="Минулі уроки"
          value={stats?.pastLessons}
          icon={FaDollarSign}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Upcoming Lessons / Recent Bookings */}
        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Найближчі уроки
          </h2>
          <div className="mt-4 flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {recentBookings?.map((lesson) => (
                <li key={lesson.id} className="flex py-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {lesson.student.name}
                    </p>
                    <Badge status={lesson.status} />
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(lesson.startTime).toLocaleString('uk-UA')}
                    </p>
                    <a
                      href="#"
                      className="mt-1 text-sm font-semibold text-green-600 hover:text-green-700"
                    >
                      Доєднатись <FaArrowRight className="inline-block ml-1" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions and Activity (you can add real activity later) */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">Швидкі дії</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href={ROUTES.PROFILE}
                  className="flex w-full items-center justify-between rounded-lg bg-green-600 px-4 py-3 text-white transition hover:bg-green-700"
                >
                  <span className="font-medium">Редагувати профіль</span>
                  <FaEdit className="h-5 w-5" />
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.TEACHER.CALENDAR}
                  className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-gray-800 transition hover:bg-gray-200"
                >
                  <span className="font-medium">Налаштувати розклад</span>
                  <FaCalendarAlt className="h-5 w-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
