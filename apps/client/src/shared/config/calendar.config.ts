import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { uk } from 'date-fns/locale';

const locales = { uk };

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export const calendarMessages = {
  month: 'Місяць',
  week: 'Тиждень',
  day: 'День',
  today: 'Сьогодні',
  previous: 'Попередній',
  next: 'Наступний',
  showMore: (count: number) => `+${count} ще`,
};
