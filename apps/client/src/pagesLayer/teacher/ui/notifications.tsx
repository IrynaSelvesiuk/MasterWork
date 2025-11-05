'use client';

import React, { useState } from 'react';
import { FaBell, FaCheckCircle } from 'react-icons/fa';

type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: 'booking' | 'payment' | 'system';
  read: boolean;
};

export default function TeacherNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Нове бронювання 🎉',
      message: 'Студент Іван Петренко забронював урок на 5 листопада о 15:00.',
      date: '2025-11-01T12:00:00Z',
      type: 'booking',
      read: false,
    },
    {
      id: 2,
      title: 'Оплата отримана 💰',
      message: 'Ви отримали оплату за урок з Анною Коваль.',
      date: '2025-10-31T09:30:00Z',
      type: 'payment',
      read: true,
    },
    {
      id: 3,
      title: 'Системне повідомлення ⚙️',
      message: 'Ваш профіль успішно перевірено адміністрацією.',
      date: '2025-10-30T10:00:00Z',
      type: 'system',
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaBell className="text-green-600" /> Сповіщення
      </h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">Немає нових сповіщень 📭</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 border rounded-xl shadow-sm transition-all ${
                n.read ? 'bg-gray-50' : 'bg-green-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {n.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{n.message}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(n.date).toLocaleString('uk-UA', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>

                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="ml-4 text-green-600 hover:text-green-800"
                    title="Позначити як прочитане"
                  >
                    <FaCheckCircle size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
