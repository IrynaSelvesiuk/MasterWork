import { useState, useMemo } from 'react';
import { View } from 'react-big-calendar';
import { useGetMyBookings } from '@/entities/teacher/hooks/useGetMyBookings';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export interface LessonEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  resource?: any;
}

export function useTeacherCalendar() {
  const { data: bookings = [], isLoading } = useGetMyBookings();
  const [view, setView] = useState<View>('month');

  const events: LessonEvent[] = useMemo(() => {
    if (!Array.isArray(bookings)) return [];

    return bookings.map((b) => ({
      id: b.id,
      title: `${b.student.user.firstName} ${b.student.user.lastName}`,
      start: new Date(b.date),
      // TODO: Logic for duration. Currently hardcoded to 1 hour
      end: new Date(new Date(b.date).getTime() + 60 * 60 * 1000),
      status: b.status,
      resource: b,
    }));
  }, [bookings]);

  const eventPropGetter = (event: LessonEvent) => {
    let styleClass = 'bg-gray-100 text-gray-800';

    switch (event.status) {
      case 'confirmed':
        styleClass = 'bg-green-100 text-green-700 border-l-4 border-green-500';
        break;
      case 'pending':
        styleClass =
          'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-400';
        break;
      case 'cancelled':
        styleClass =
          'bg-red-50 text-red-700 border-l-4 border-red-400 opacity-75';
        break;
    }

    return { className: styleClass };
  };

  const handleSelectEvent = (event: LessonEvent) => {
    alert(`Edit Lesson: ${event.title}`);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    const dateStr = format(slotInfo.start, 'd MMMM yyyy', { locale: uk });
    alert(`Create lesson on: ${dateStr}`);
  };

  return {
    events,
    isLoading,
    view,
    setView,
    eventPropGetter,
    handleSelectEvent,
    handleSelectSlot,
  };
}
