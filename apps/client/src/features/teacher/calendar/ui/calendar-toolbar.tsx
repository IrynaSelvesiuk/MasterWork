import { ToolbarProps } from 'react-big-calendar';

export interface LessonEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export const CalendarToolbar = ({
  label,
  onNavigate,
  onView,
}: ToolbarProps<LessonEvent, object>) => {
  const btnClass =
    'px-3 py-1 border rounded hover:bg-gray-100 transition-colors';

  return (
    <div className="flex items-center justify-between mb-4 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex gap-2">
        <button className={btnClass} onClick={() => onNavigate('PREV')}>
          Попередній
        </button>
        <button className={btnClass} onClick={() => onNavigate('TODAY')}>
          Сьогодні
        </button>
        <button className={btnClass} onClick={() => onNavigate('NEXT')}>
          Наступний
        </button>
      </div>

      <span className="font-bold text-lg text-gray-800 capitalize">
        {label}
      </span>

      <div className="flex gap-2">
        <button className={btnClass} onClick={() => onView('month')}>
          Місяць
        </button>
        <button className={btnClass} onClick={() => onView('week')}>
          Тиждень
        </button>
        <button className={btnClass} onClick={() => onView('day')}>
          День
        </button>
      </div>
    </div>
  );
};
