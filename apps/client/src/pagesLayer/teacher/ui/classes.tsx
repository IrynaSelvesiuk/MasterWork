'use client';

import { FaChalkboardTeacher, FaClock, FaCalendarAlt } from 'react-icons/fa';

export function TeacherClassesPage() {
  const placeholderClasses = [
    {
      id: 1,
      subject: 'Математика',
      student: 'Іван Петренко',
      time: 'Понеділок, 10:00 — 11:00',
    },
    {
      id: 2,
      subject: 'Англійська мова',
      student: 'Оксана Коваль',
      time: 'Середа, 14:00 — 15:00',
    },
    {
      id: 3,
      subject: 'Історія',
      student: 'Марія Шевченко',
      time: 'Пʼятниця, 9:00 — 10:00',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <FaChalkboardTeacher className="text-green-600" />
        Мої заняття
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {placeholderClasses.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {lesson.subject}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              👩‍🎓 Учень: <span className="font-medium">{lesson.student}</span>
            </p>
            <p className="flex items-center text-sm text-gray-500">
              <FaClock className="mr-2 text-green-500" /> {lesson.time}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center text-gray-500 text-sm">
        <FaCalendarAlt className="mr-2" />
        Дані зʼявляться тут, коли ви отримаєте свої перші заняття 🕒
      </div>
    </div>
  );
}
