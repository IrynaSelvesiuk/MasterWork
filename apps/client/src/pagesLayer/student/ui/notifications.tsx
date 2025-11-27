'use client';

import { FaBell, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useGetStudentBookings } from '@/entities/student/hooks/queries/useGetStudentBookings';

const getNotificationConfig = (
  status: string,
  teacherName: string,
  date: Date
) => {
  const formattedDate = format(new Date(date), 'd MMMM, HH:mm', { locale: uk });

  switch (status) {
    case 'confirmed':
      return {
        type: 'success',
        icon: <FaCheckCircle className="text-green-500" />,
        title: 'Урок підтверджено ✅',
        message: `Викладач ${teacherName} підтвердив ваше заняття на ${formattedDate}. Для детальної інформації перевірте лист на пошті.`,
      };
    case 'rejected':
      return {
        type: 'error',
        icon: <FaTimesCircle className="text-red-500" />,
        title: 'Урок скасовано/відхилено ❌',
        message: `На жаль, заняття з ${teacherName} на ${formattedDate} було скасовано. Для детальної інформації перевірте лист на пошті.`,
      };
    case 'pending':
    default:
      return {
        type: 'info',
        icon: <FaClock className="text-yellow-500" />,
        title: 'Очікує підтвердження ⏳',
        message: `Ваш запит на урок з ${teacherName} (${formattedDate}) надіслано.`,
      };
  }
};

export const StudentNotificationsPage = () => {
  const { data: bookings = [], isLoading } = useGetStudentBookings();

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaBell className="text-green-600" /> Сповіщення
      </h2>

      {bookings.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {bookings.map((booking) => {
            const config = getNotificationConfig(
              booking.status,
              `${booking.teacher.user.firstName} ${booking.teacher.user.lastName}`,
              booking.date
            );

            return (
              <li
                key={booking.id}
                className="py-4 flex items-start gap-4 hover:bg-gray-50 transition rounded-lg px-2"
              >
                <div className="text-xl mt-1">{config.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {config.title}
                  </h3>
                  <p className="text-sm text-gray-600">{config.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Створено:{' '}
                    {format(new Date(booking.createdAt), 'd MMM yyyy, HH:mm', {
                      locale: uk,
                    })}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <FaBell className="text-4xl text-gray-300 mb-3" />
          <p className="text-lg">Немає нових сповіщень</p>
          <p className="text-sm">Тут з'являться новини про ваші бронювання</p>
        </div>
      )}
    </div>
  );
};
