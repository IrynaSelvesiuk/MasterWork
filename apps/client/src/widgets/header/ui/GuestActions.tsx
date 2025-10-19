import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';

export const GuestActions = () => (
  <nav className="flex items-center space-x-6">
    {/* 1. Help Link (Kept) */}
    <Link
      href={ROUTES.HELP}
      className="text-xl text-green-700 hover:text-green-900 transition-colors"
      title="Help"
    >
      <span role="img" aria-label="question mark">
        &#x2753;
      </span>
    </Link>

    {/* 2. Become a Tutor Link (Kept) */}
    <Link
      href={ROUTES.REGISTER_TEACHER}
      className="text-base font-medium text-green-800 hover:text-green-900 hover:underline transition-colors"
    >
      Стати репетитором
    </Link>

    {/* 3. Login Button (Kept) */}
    <Link
      href={ROUTES.LOGIN}
      className="text-base font-medium bg-green-600 text-white px-5 py-2 rounded-xl shadow-sm hover:bg-green-700 transition"
    >
      Вхід
    </Link>
  </nav>
);
