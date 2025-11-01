'use client';

import { useGetMyBookings } from '@/entities/teacher/hooks/useGetMyBookings';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { uk } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { uk };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export function TeacherCalendarPage() {
  const { data: bookings = [], isLoading } = useGetMyBookings();

  const events = bookings.map((b) => ({
    title: `${b.student.user.firstName} ${b.student.user.lastName}`,
    start: new Date(b.date),
    end: new Date(new Date(b.date).getTime() + 60 * 60 * 1000),
    status: b.status,
  }));

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">📅 My Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={(event) => ({
          className:
            event.status === 'confirmed'
              ? 'bg-green-200 text-green-800'
              : event.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800',
        })}
      />
    </div>
  );
}
