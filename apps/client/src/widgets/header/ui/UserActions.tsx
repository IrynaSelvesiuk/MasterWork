import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import { FaBell, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const UserProfileIcon = () => (
  <Link
    href={ROUTES.PROFILE || '#'}
    className="text-gray-600 hover:text-green-700 transition-colors p-2"
    title="Мій профіль"
  >
    <FaUserCircle size={28} />
  </Link>
);

export const UserActions = () => (
  <nav className="flex items-center space-x-6">
    {/* 1. Notifications Icon (New Action) */}
    <Link
      href={ROUTES.NOTIFICATIONS || '#'}
      className="text-gray-600 hover:text-green-700 transition-colors p-2 relative"
      title="Сповіщення"
    >
      <FaBell size={20} />
      {/* Optional: Simple Notification Badge */}
      <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
    </Link>

    {/* 2. User Profile/Avatar (New Action) */}
    <UserProfileIcon />

    {/* 3. Help Link (Kept) */}
    <Link
      href={ROUTES.HELP}
      className="text-xl text-green-700 hover:text-green-900 transition-colors"
      title="Help"
    >
      <span role="img" aria-label="question mark">
        &#x2753;
      </span>
    </Link>

    {/* 4. Logout Button (New Action) */}
    <button
      onClick={() => console.log('Handle Logout')}
      className="text-base font-medium bg-gray-200 text-green-800 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-300 transition flex items-center gap-1"
    >
      <FaSignOutAlt className="w-4 h-4" />
      Вийти
    </button>
  </nav>
);
