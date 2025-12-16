import { useState, useMemo } from 'react';
import { View } from 'react-big-calendar';
import { useGetMyBookings } from '@/entities/teacher/hooks/useGetMyBookings';

export interface BookingResource {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  meetingLink: string | null;
  student: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  note?: string;
}

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
  const [selectedEvent, setSelectedEvent] = useState<LessonEvent | null>(null);

  const events: LessonEvent[] = useMemo(() => {
    if (!Array.isArray(bookings)) return [];

    return bookings.map((b) => ({
      id: b.id,
      title: `${b.student.user.firstName} ${b.student.user.lastName}`,
      start: new Date(b.startTime), // use startTime from backend
      end: new Date(b.endTime), // use endTime from backend
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
    setSelectedEvent(event);
  };

  return {
    events,
    isLoading,
    view,
    setView,
    eventPropGetter,
    handleSelectEvent,
    selectedEvent,
    setSelectedEvent,
  };
}
