'use client';

import { useAuthStore } from '@/entities/user/model/store';

export function BookingButton({ teacherUserId }: { teacherUserId: string }) {
  const { user } = useAuthStore();
  const isSelf = teacherUserId === user?.id;

  return (
    <button
      disabled={isSelf}
      className={
        isSelf
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed py-3 px-4 rounded-xl'
          : 'bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600'
      }
    >
      Забронювати пробний урок
    </button>
  );
}
