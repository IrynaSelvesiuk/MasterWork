'use client';

import { useState } from 'react';
import { FaBell, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const StudentNotificationsPage = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Оплата успішна 💳',
      message: 'Ваше замовлення на урок з математиком підтверджено.',
      date: '1 листопада 2025, 14:20',
    },
    {
      id: 2,
      type: 'info',
      title: 'Новий урок заплановано 🗓️',
      message: 'Репетитор Ірина погодила урок на понеділок о 10:00.',
      date: '31 жовтня 2025, 19:10',
    },
    {
      id: 3,
      type: 'error',
      title: 'Помилка оплати ❌',
      message: 'Транзакція не вдалася. Спробуйте ще раз пізніше.',
      date: '30 жовтня 2025, 09:45',
    },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaBell className="text-green-600" /> Повідомлення
      </h2>

      {notifications.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="py-4 flex items-start gap-4 hover:bg-gray-50 transition rounded-lg px-2"
            >
              <div className="text-xl">
                {n.type === 'success' && (
                  <FaCheckCircle className="text-green-500" />
                )}
                {n.type === 'error' && (
                  <FaTimesCircle className="text-red-500" />
                )}
                {n.type === 'info' && <FaBell className="text-blue-500" />}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{n.title}</h3>
                <p className="text-sm text-gray-600">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{n.date}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">
          Немає нових сповіщень 💤
        </p>
      )}
    </div>
  );
};
