'use client';

import { useGetMyBookings } from '@/entities/teacher/hooks/useGetMyBookings';
import { LoadingSpinner } from '@/shared/ui/spinner';
import Image from 'next/image';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { BookingModal } from '@/features/teacher/booking-modal';
import { useState } from 'react';
import { Booking } from '@/entities/booking';
import {
  FaCalendarAlt,
  FaClock,
  FaUserGraduate,
  FaInbox,
} from 'react-icons/fa';

export function MyStudentsPage() {
  const { data: bookings, isLoading } = useGetMyBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!bookings?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <FaInbox className="text-4xl text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">
          Немає активних бронювань
        </h3>
        <p className="text-gray-500 max-w-sm mt-1">
          Ваш розклад наразі пустий. Щойно студенти забронюють урок, вони
          з'являться тут.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-gray-800">📌 Мої Студенти</h2>
        <span className="text-sm text-gray-500 font-medium">
          Всього записів: {bookings.length}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onClick={() => setSelectedBooking(booking)}
          />
        ))}
      </div>

      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          open={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}

// Extracted Card Component for cleanliness
const BookingCard = ({
  booking,
  onClick,
}: {
  booking: Booking;
  onClick: () => void;
}) => {
  const dateObj = new Date(booking.date);

  const statusConfig = {
    pending: {
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      label: 'Очікує підтвердження',
    },
    confirmed: {
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      label: 'Підтверджено',
    },
    cancelled: {
      color: 'bg-rose-100 text-rose-700 border-rose-200',
      label: 'Скасовано',
    },
  };

  const status = statusConfig[booking.status] || statusConfig.pending;

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm 
                 hover:shadow-lg hover:border-green-200 hover:-translate-y-1 
                 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Decorative side accent based on status */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${status.color.replace('bg-', 'bg-opacity-50 bg-')} `}
      />

      <div className="flex items-start gap-4 pl-2">
        {/* Avatar */}
        <div className="relative shrink-0">
          <Image
            src={booking.student.avatarUrl || '/default-avatar.png'}
            alt="Student avatar"
            width={56}
            height={56}
            className="rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-800 text-lg truncate pr-2 group-hover:text-green-700 transition-colors">
              {booking.student.user.firstName} {booking.student.user.lastName}
            </h3>
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${status.color}`}
            >
              {status.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
              <FaCalendarAlt className="text-gray-400" />
              <span className="font-medium text-gray-700">
                {format(dateObj, 'd MMM yyyy', { locale: uk })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
              <FaClock className="text-gray-400" />
              <span className="font-medium text-gray-700">
                {format(dateObj, 'HH:mm', { locale: uk })}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50/50 p-2 rounded-lg">
            <FaUserGraduate className="mt-1 text-green-500 shrink-0" />
            <p className="italic line-clamp-2 leading-snug">
              {booking.student.learningGoals || 'Ціль не вказана'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
