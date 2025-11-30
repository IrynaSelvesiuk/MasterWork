import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import { FaUsers, FaCalendarAlt, FaUserCircle, FaEdit } from 'react-icons/fa';
import LogoutButton from './logout-button';

const TeacherProfileIcon = () => (
  <Link
    href={ROUTES.TEACHER.DASHBOARD}
    className="text-gray-600 hover:text-green-700 transition-colors p-2"
    title="Мій профіль"
  >
    <FaUserCircle size={28} />
  </Link>
);

export const TeacherActions = () => {
  return (
    <nav className="flex items-center space-x-4">
      <TeacherProfileIcon />

      {/* Calendar */}
      <Link
        href={ROUTES.TEACHER.CALENDAR || '#'}
        className="text-gray-600 hover:text-green-700 transition-colors p-2"
        title="Розклад та Календар"
      >
        <FaCalendarAlt size={20} />
      </Link>

      {/* Edit Profile */}
      <Link
        href={ROUTES.TEACHER.ME || '#'}
        className="text-gray-600 hover:text-green-700 transition-colors p-2"
        title="Редагувати профіль"
      >
        <FaEdit size={20} />
      </Link>

      {/* Students */}
      <Link
        href={ROUTES.TEACHER.MY_STUDENTS || '#'}
        className="text-gray-600 hover:text-green-700 transition-colors p-2"
        title="Мої студенти"
      >
        <FaUsers size={20} />
      </Link>

      <Link
        href={ROUTES.HELP}
        className="text-xl text-green-700 hover:text-green-900 transition-colors"
        title="Help"
      >
        <span role="img" aria-label="question mark">
          &#x2753;
        </span>
      </Link>

      <LogoutButton />
    </nav>
  );
};
