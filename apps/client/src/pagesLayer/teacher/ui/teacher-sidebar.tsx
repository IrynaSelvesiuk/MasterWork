'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Головна (Dashboard)' },
  { href: '/profile', label: 'Мій публічний профіль' },
  { href: '/calendar', label: 'Розклад та Календар' },
  { href: '/students', label: 'Мої студенти' },
  { href: '/settings', label: 'Налаштування' },
];

export function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 h-full bg-gray-50 border-r p-6 flex flex-col">
      <h2 className="text-xl font-bold text-green-700 mb-8">Кабінет Вчителя</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`
                block px-4 py-2 rounded-lg transition-colors
                ${
                  pathname === link.href
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
