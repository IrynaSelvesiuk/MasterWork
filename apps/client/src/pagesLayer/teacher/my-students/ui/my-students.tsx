'use client';

import { useGetMyBookings } from '@/entities/teacher/hooks/useGetMyBookings';
import { LoadingSpinner } from '@/shared/ui/spinner';
import Image from 'next/image';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { BookingModal } from '@/features/teacher/booking-modal';
import { useState } from 'react';

export function MyStudentsPage() {
  const { data: bookings, isLoading } = useGetMyBookings();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  if (isLoading) return <LoadingSpinner />;
  if (!bookings?.length) return <p>No bookings yet.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          onClick={() => setSelectedBooking(booking)}
          className="border rounded-xl p-4 flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-4">
            <Image
              src={booking.student.avatarUrl || '/default-avatar.png'}
              alt="Student avatar"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Student ID: {booking.student.id}</p>
              <p className="text-sm text-gray-500">
                Goals: {booking.student.learningGoals}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-medium">
              {format(new Date(booking.date), 'd MMMM yyyy, HH:mm', {
                locale: uk,
              })}
            </p>
            <div className="flex items-center justify-end">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
      ${
        booking.status === 'pending'
          ? 'bg-yellow-100 text-yellow-700'
          : booking.status === 'confirmed'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
      }`}
              >
                {booking.status === 'pending'
                  ? 'Очікує підтвердження'
                  : booking.status === 'confirmed'
                    ? 'Підтверджено'
                    : 'Скасовано'}
              </span>
            </div>
          </div>
        </div>
      ))}

      <BookingModal
        booking={selectedBooking}
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}
