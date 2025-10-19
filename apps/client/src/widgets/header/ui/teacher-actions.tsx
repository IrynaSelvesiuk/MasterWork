import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import {
  FaBell,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaUserCircle,
} from 'react-icons/fa';

const TeacherProfileIcon = () => (
  <Link
    href={ROUTES.PROFILE || '#'}
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
      href={ROUTES.TEACHER_SCHEDULE || '#'}
      className="text-gray-600 hover:text-green-700 transition-colors p-2"
      title="Мій розклад"
    >
      <FaCalendarAlt size={20} />
    </Link>

    <Link
      href={ROUTES.TEACHER_STUDENTS || '#'}
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

    <button
      onClick={() => console.log('Handle Logout')}
      className="text-base font-medium bg-gray-200 text-green-800 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-300 transition flex items-center gap-1"
    >
      <FaSignOutAlt className="w-4 h-4" />
      Вийти
    </button>
  </nav>
);
