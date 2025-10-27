'use client';

import React from 'react';
import { useAuthStore } from '@/entities/user/model/store';
import Link from 'next/link';
import { ROUTES } from '@/shared/router/routes';
import {
  FaUsers,
  FaCalendarAlt,
  FaDollarSign,
  FaBookOpen,
  FaArrowRight,
  FaBell,
  FaEdit,
} from 'react-icons/fa';

const mockStats = {
  totalStudents: 14,
  upcomingLessons: 3,
  monthlyEarnings: 1250,
  subjectsTaught: 5,
};

const mockLessons = [
  {
    id: 1,
    studentName: 'Олена Петренко',
    subject: 'Математика',
    time: 'Сьогодні, 14:00',
  },
  {
    id: 2,
    studentName: 'Андрій Василенко',
    subject: 'Фізика',
    time: 'Завтра, 10:30',
  },
  {
    id: 3,
    studentName: 'Ірина Ковальчук',
    subject: 'Англійська мова',
    time: '29 жовтня, 18:00',
  },
];

const mockActivity = [
  { id: 1, text: 'Новий запит на урок від "Максим Л."' },
  { id: 2, text: 'Ви отримали новий відгук' },
  { id: 3, text: 'Студент "Олена П." скасувала урок' },
];

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) => (
  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <Icon className="h-6 w-6 text-green-600" />{' '}
    </div>
    <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Вітаємо, {user?.firstName ?? 'Вчителю'}!
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Всього студентів"
          value={mockStats.totalStudents}
          icon={FaUsers}
        />
        <StatCard
          title="Найближчі уроки"
          value={mockStats.upcomingLessons}
          icon={FaCalendarAlt}
        />
        <StatCard
          title="Дохід (жовтень)"
          value={`$${mockStats.monthlyEarnings}`}
          icon={FaDollarSign}
        />
        <StatCard
          title="Предметів"
          value={mockStats.subjectsTaught}
          icon={FaBookOpen}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Найближчі уроки
          </h2>
          <div className="mt-4 flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {mockLessons.map((lesson) => (
                <li key={lesson.id} className="flex py-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {lesson.subject}
                    </p>
                    <p className="text-sm text-gray-600">
                      {lesson.studentName}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-700">
                      {lesson.time}
                    </p>
                    <a
                      href="#" // TODO: Додайте реальний маршрут, наприклад, до сторінки уроку
                      className="mt-1 text-sm font-semibold text-green-600 hover:text-green-700"
                    >
                      Доєднатись <FaArrowRight className="inline-block ml-1" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button className="mt-4 w-full rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            Переглянути весь розклад
          </button>
        </div>

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

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Остання активність
            </h2>
            <ul className="mt-4 space-y-4">
              {mockActivity.map((activity) => (
                <li key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaBell className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">{activity.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
