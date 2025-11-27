'use client';

import { BookingModal } from '@/features/booking-modal/ui/booking-modal';
import { useState } from 'react';

interface TutorActionsProps {
  pricePer60Min: number;
  teacherId: string;
  isSelf: boolean;
}

export const TutorActions = ({
  pricePer60Min,
  teacherId,
  isSelf,
}: TutorActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100 relative">
      <div className="text-right mr-6">
        <div className="text-sm text-gray-500">1 год/заняття</div>
        <div className="text-3xl font-extrabold text-green-600">
          {pricePer60Min.toLocaleString('uk-UA', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}{' '}
          ₴
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isSelf}
        className={`
    font-semibold py-3 px-6 rounded-xl transition shadow-md 
    ${
      isSelf
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
    }
  `}
      >
        Забронювати пробний урок
      </button>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teacherId={teacherId}
      />
    </div>
  );
};
