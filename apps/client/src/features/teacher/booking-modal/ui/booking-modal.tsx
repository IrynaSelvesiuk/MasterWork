'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useEffect } from 'react';
import { teacherService } from '@/entities/teacher/services/teacher-service';

interface BookingModalProps {
  booking: any;
  open: boolean;
  onClose: () => void;
}

export function BookingModal({ booking, open, onClose }: BookingModalProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: 'confirmed' | 'rejected';
    }) => teacherService.updateBooking(id, status),
    onSuccess: () => {
      toast.success('Статус оновлено');
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
      onClose();
    },
    onError: () => toast.error('Не вдалося оновити статус'),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open || !booking) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Підтвердження бронювання
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Студент:</span>{' '}
            {booking.student.firstName} {booking.student.lastName}
          </p>
          <p>
            <span className="font-semibold">Дата:</span>{' '}
            {format(new Date(booking.date), 'd MMMM yyyy, HH:mm', {
              locale: uk,
            })}
          </p>
          <p>
            <span className="font-semibold">Цілі:</span>{' '}
            {booking.student.learningGoals || '—'}
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
            disabled={isPending}
            onClick={() => mutate({ id: booking.id, status: 'rejected' })}
          >
            Відхилити
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
            disabled={isPending}
            onClick={() => mutate({ id: booking.id, status: 'confirmed' })}
          >
            Підтвердити
          </button>
        </div>

        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
