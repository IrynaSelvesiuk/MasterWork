import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface NavItemProps {
  icon: IconType;
  label: string;
  href?: string;
  isButton?: boolean;
  onClick?: () => void;
}

export const NavItem = ({
  icon: Icon,
  label,
  href = '#',
  isButton = false,
  onClick,
}: NavItemProps) => {
  const commonClasses =
    'flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition';

  if (isButton) {
    return (
      <button
        className={`${commonClasses} w-full text-left text-red-600`}
        onClick={onClick || (() => console.log(`Action for: ${label}`))}
      >
        <span className="flex items-center">
          <Icon className="mr-3 w-5 h-5" /> {label}
        </span>
      </button>
    );
  }

  return (
    <Link href={href} className={commonClasses}>
      <span className="flex items-center text-gray-700">
        <Icon className="mr-3 w-5 h-5 text-green-600" /> {label}
      </span>
      <FaChevronRight className="w-4 h-4 text-gray-400" />
    </Link>
  );
};
