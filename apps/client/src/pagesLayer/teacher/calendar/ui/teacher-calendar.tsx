'use client';

import { useTeacherCalendar } from '@/entities/teacher/hooks/useTeacherCalendar';
import { CalendarToolbar } from '@/features/teacher/calendar/ui/calendar-toolbar';
import { calendarMessages, localizer } from '@/shared/config/calendar.config';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export function TeacherCalendarPage() {
  const {
    events,
    isLoading,
    view,
    setView,
    eventPropGetter,
    handleSelectEvent,
    handleSelectSlot,
  } = useTeacherCalendar();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📅 Мій календар</h1>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 650 }}
          view={view}
          onView={setView}
          components={{ toolbar: CalendarToolbar }}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventPropGetter}
          messages={calendarMessages}
          culture="uk"
        />
      </div>
    </div>
  );
}
