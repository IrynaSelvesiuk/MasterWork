'use client';

import { ReviewForm } from '@/widgets/review-form';
import { useState } from 'react';

export function ReviewSection({
  teacherId,
  isSelf,
}: {
  teacherId: string;
  isSelf: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <button
        disabled={isSelf}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`px-4 py-2 rounded-lg text-white font-semibold transition 
    ${isSelf ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isOpen ? '❌ Сховати форму' : '✍️ Залишити відгук'}
      </button>

      {isOpen && (
        <div className="mt-4">
          <ReviewForm teacherId={teacherId} />
        </div>
      )}
    </div>
  );
}
