import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import { GiOpenBook } from 'react-icons/gi';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 md:px-16 bg-transparent">
      {/* Logo / Brand */}
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer group p-1 rounded
               border-b-2 border-transparent hover:border-green-600
               text-green-800 transition-all"
      >
        <GiOpenBook size={32} />
        <span className="text-4xl md:text-5xl font-bold mb-1 group-hover:text-green-800">
          Tutors
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <Link
          href={ROUTES.HELP}
          className="text-xl text-green-700 hover:text-green-900 transition-colors"
          title="Help"
        >
          <span role="img" aria-label="question mark">
            &#x2753;
          </span>
        </Link>

        <Link
          href={ROUTES.LOGIN}
          className="text-base font-medium text-green-800 hover:text-green-900 hover:underline transition-colors"
        >
          Стати репетитором
        </Link>

        <Link
          href={ROUTES.LOGIN}
          className="text-base font-medium bg-green-600 text-white px-5 py-2 rounded-xl shadow-sm hover:bg-green-700 transition"
        >
          Вхід
        </Link>
      </nav>
    </header>
  );
};

export default Header;
