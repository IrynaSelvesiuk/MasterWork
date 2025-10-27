import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import LogoutButton from './logout-button';

const UserProfileIcon = () => (
  <Link
    href={ROUTES.PROFILE || '#'}
    className="text-gray-600 hover:text-green-700 transition-colors p-2"
    title="Мій профіль"
  >
    <FaUserCircle size={28} />
  </Link>
);

export const UserActions = () => {
  return (
    <nav className="flex items-center space-x-6">
      <Link
        href={ROUTES.NOTIFICATIONS || '#'}
        className="text-gray-600 hover:text-green-700 transition-colors p-2 relative"
        title="Сповіщення"
      >
        <FaBell size={20} />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
      </Link>

      <UserProfileIcon />

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
