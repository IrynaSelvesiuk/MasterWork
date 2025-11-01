import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import {
  FaBell,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaUserCircle,
} from 'react-icons/fa';
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

export const TeacherActions = () => (
  <nav className="flex items-center space-x-6">
    <Link
      href={ROUTES.NOTIFICATIONS || '#'}
      className="text-gray-600 hover:text-green-700 transition-colors p-2 relative"
      title="Сповіщення"
    >
      <FaBell size={20} />
      <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
    </Link>

    <TeacherProfileIcon />

    <Link
      href={ROUTES.TEACHER.CALENDAR || '#'}
      className="text-gray-600 hover:text-green-700 transition-colors p-2"
      title="Мій розклад"
    >
      <FaCalendarAlt size={20} />
    </Link>

    <Link
      href={ROUTES.TEACHER.MY_STUDENTS || '#'}
      className="text-gray-600 hover:text-green-700 transition-colors p-2"
      title="Мої студенти"
    >
      <FaUsers size={20} />
    </Link>

    <Link
      href={ROUTES.TEACHER_CLASSES || '#'}
      className="text-gray-600 hover:text-green-700 transition-colors p-2"
      title="Мої уроки"
    >
      <FaChalkboardTeacher size={20} />
    </Link>

    <LogoutButton />
  </nav>
);
