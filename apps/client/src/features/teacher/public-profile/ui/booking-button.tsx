'use client';

import { BookingModal } from '@/features/booking-modal/ui/booking-modal';
import { useState } from 'react';

interface BookingButtonProps {
  teacherUserId: string;
}

export const BookingButton = ({ teacherUserId }: BookingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="w-full mt-4 flex justify-center rounded-xl bg-green-500 py-3 font-bold text-white transition hover:bg-green-600 shadow-sm active:scale-95"
      >
        Забронювати урок
      </button>

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        teacherId={teacherUserId}
      />
    </>
  );
};
