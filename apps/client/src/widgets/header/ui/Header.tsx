'use client';

import Link from 'next/link';
import { GiOpenBook } from 'react-icons/gi';
import { GuestActions } from './GuestActions';
import { UserActions } from './UserActions';

interface HeaderProps {
  isAuthenticated?: boolean;
}

const Header = ({ isAuthenticated = false }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center p-6 md:px-16 bg-white shadow-sm sticky top-0 z-10">
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

      {/* Conditional Navigation */}
      {isAuthenticated ? <UserActions /> : <GuestActions />}
    </header>
  );
};

export default Header;
