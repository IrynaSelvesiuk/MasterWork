import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import { GiOpenBook } from 'react-icons/gi';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 mx-16">
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer group p-1 rounded
               border-b-2 border-transparent hover:border-black
               text-black transition-colors"
      >
        <GiOpenBook size={32} />
        <span className="text-5xl font-bold mb-1">Tutors</span>
      </Link>

      <nav className="flex items-center space-x-6">
        <Link
          href={ROUTES.HELP}
          className="text-xl hover:opacity-75"
          title="Help"
        >
          <span role="img" aria-label="question mark">
            &#x2753;
          </span>
        </Link>
        <Link
          href={ROUTES.LOGIN}
          className="text-base font-medium hover:underline"
        >
          Стати репетитором
        </Link>
        <Link
          href={ROUTES.LOGIN}
          className="text-base font-medium hover:underline"
        >
          Вхід
        </Link>
      </nav>
    </header>
  );
};

export default Header;
