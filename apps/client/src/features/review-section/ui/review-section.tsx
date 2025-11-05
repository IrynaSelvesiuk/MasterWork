'use client';

import { ReviewForm } from '@/widgets/review-form';
import { useState } from 'react';

export function ReviewSection({ teacherId }: { teacherId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
