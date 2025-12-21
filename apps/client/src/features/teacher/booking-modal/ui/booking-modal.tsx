'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useEffect } from 'react';
import { teacherService } from '@/entities/teacher/services/teacher-service';
import { Booking } from '@/entities/booking';
import { FaCalendarAlt, FaClock, FaUser, FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

interface BookingModalProps {
  booking: Booking;
  open: boolean;
  onClose: () => void;
}

export function BookingModal({ booking, open, onClose }: BookingModalProps) {
  const queryClient = useQueryClient();

  // 1. Mutation Logic
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
    onError: (error) => {
      console.log(error);
      toast.error('Не вдалося оновити статус');
    },
  });

  // 2. Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open || !booking) return null;

  const isPastBooking = new Date(booking.endTime) < new Date();
  const isBookingPending = booking.status === 'pending' && !isPastBooking;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* --- Header --- */}
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Деталі бронювання</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* --- Body --- */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Student Info */}
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              {booking.student.avatarUrl ? (
                <Image
                  src={'/default-avatar.png'}
                  alt="Avatar"
                  fill
                  className="rounded-full object-cover shadow-sm border border-gray-100"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold shadow-inner">
                  {booking.student.user.firstName[0]}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {booking.student.user.firstName} {booking.student.user.lastName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaUser className="text-gray-400" />
                <span>Студент</span>
              </div>
            </div>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <FaCalendarAlt />
                <span className="font-semibold text-sm">Дата</span>
              </div>
              <p className="text-gray-800 font-medium capitalize">
                {format(new Date(booking.startTime), 'd MMMM yyyy', {
                  locale: uk,
                })}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <FaClock />
                <span className="font-semibold text-sm">Час</span>
              </div>
              <p className="text-gray-800 font-medium">
                {format(new Date(booking.endTime), 'HH:mm', { locale: uk })}
              </p>
            </div>
          </div>

          {/* Note / Goals */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative mt-2">
            <FaQuoteLeft className="absolute top-3 left-3 text-gray-200 text-2xl -z-0" />
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 relative z-10 pl-6">
              Ціль / Коментар
            </p>
            <p className="text-gray-700 italic relative z-10 leading-relaxed pl-1">
              {booking.note ||
                booking.student.learningGoals ||
                'Коментарів немає'}
            </p>
          </div>
        </div>

        {/* --- Footer --- */}
        <div className="p-6 border-t bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Закрити
          </button>

          {isBookingPending ? (
            <>
              <button
                className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                disabled={isPending}
                onClick={() => mutate({ id: booking.id, status: 'rejected' })}
              >
                Відхилити
              </button>
              <button
                className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                disabled={isPending}
                onClick={() => mutate({ id: booking.id, status: 'confirmed' })}
              >
                {isPending ? 'Обробка...' : 'Підтвердити'}
              </button>
            </>
          ) : isPastBooking ? (
            <span className="px-4 py-2 rounded-lg font-bold border bg-gray-100 text-gray-500">
              Бронювання вже минуло
            </span>
          ) : (
            <div
              className={`px-4 py-2 rounded-lg font-bold border flex items-center gap-2
      ${
        booking.status === 'confirmed'
          ? 'bg-green-100 text-green-800 border-green-200'
          : 'bg-red-100 text-red-800 border-red-200'
      }
    `}
            >
              <span>
                {booking.status === 'confirmed'
                  ? '✅ Підтверджено'
                  : '❌ Відхилено'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
