'use client';

import { axiosClient } from '@/shared/config/axios-config';
import { API_URL } from '@/shared/constants/api-url';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // <-- імпорт

interface ReviewFormProps {
  teacherId: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ teacherId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!rating || !text.trim()) return;

    setIsSubmitting(true);
    try {
      await axiosClient.post(API_URL.REVIEWS.BASE, {
        teacherId,
        rating,
        comment: text,
      });

      toast.success('Відгук успішно додано!');

      setText('');
      setRating(0);

      router.refresh();
    } catch (err) {
      console.error('❌ Failed to send review:', err);
      toast.error('Не вдалося надіслати відгук');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Залишити відгук</h2>

      {/* Stars */}
      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-2xl transition ${
              (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>

      {/* Textarea */}
      <textarea
        className="w-full border rounded-lg p-2 mb-3 resize-none focus:ring focus:ring-blue-200"
        rows={4}
        placeholder="Напишіть ваш відгук..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        disabled={!rating || !text.trim() || isSubmitting}
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Надсилаємо...' : 'Надіслати'}
      </button>
    </div>
  );
};
