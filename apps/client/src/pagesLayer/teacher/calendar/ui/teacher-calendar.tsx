'use client';

import { useGetMyBookings } from '@/entities/teacher/hooks/useGetMyBookings';
import {
  Calendar,
  dateFnsLocalizer,
  ToolbarProps,
  View,
} from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { uk } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
export interface LessonEvent {
  title: string;
  start: Date;
  end: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Ukrainian locale config for date-fns
const locales = { uk };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CustomToolbar = ({
  label,
  onNavigate,
  onView,
}: ToolbarProps<LessonEvent, object>) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex gap-2">
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100"
        onClick={() => onNavigate('PREV')}
      >
        Попередній
      </button>
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100"
        onClick={() => onNavigate('TODAY')}
      >
        Сьогодні
      </button>
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100"
        onClick={() => onNavigate('NEXT')}
      >
        Наступний
      </button>
    </div>

    <span className="font-semibold text-gray-700">{label}</span>

    <div className="flex gap-2">
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100"
        onClick={() => onView('month')}
      >
        Місяць
      </button>
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100"
        onClick={() => onView('week')}
      >
        Тиждень
      </button>
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100"
        onClick={() => onView('day')}
      >
        День
      </button>
    </div>
  </div>
);

export function TeacherCalendarPage() {
  const { data: bookings = [], isLoading } = useGetMyBookings();
  const [selectedView, setSelectedView] = useState<View>('month');

  const events = Array.isArray(bookings)
    ? bookings.map((b) => ({
        title: `${b.student.user.firstName} ${b.student.user.lastName}`,
        start: new Date(b.date),
        end: new Date(new Date(b.date).getTime() + 60 * 60 * 1000),
        status: b.status,
      }))
    : [];

  if (isLoading) return <p>Завантаження...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">📅 Мій календар</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={selectedView}
        onView={(view) => setSelectedView(view)}
        components={{ toolbar: CustomToolbar }}
        selectable
        onSelectEvent={(event) => alert(`Подія: ${event.title}`)}
        onSelectSlot={(slotInfo) =>
          alert(
            `Обрано дату: ${format(slotInfo.start, 'd MMMM yyyy', { locale: uk })}`
          )
        }
        eventPropGetter={(event) => ({
          className:
            event.status === 'confirmed'
              ? 'bg-green-200 text-green-800'
              : event.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800',
        })}
        messages={{
          month: 'Місяць',
          week: 'Тиждень',
          day: 'День',
          today: 'Сьогодні',
          previous: 'Попередній',
          next: 'Наступний',
          showMore: (count) => `+${count} ще`,
        }}
      />
    </div>
  );
}
