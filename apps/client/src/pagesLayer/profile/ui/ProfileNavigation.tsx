import {
  FaRegCreditCard,
  FaEnvelope,
  FaSignOutAlt,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { ROUTES } from '@/shared/router/routes';
import { NavItem } from './NavItem'; // Import the isolated NavItem

const handleLogout = () => {
  console.log('User logged out!');
};

export const ProfileNavigation = () => (
  <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
    <NavItem
      icon={FaChalkboardTeacher}
      label="Мої уроки"
      href={ROUTES.LESSONS || '#'}
    />
    <NavItem
      icon={FaRegCreditCard}
      label="Гаманець / Оплата"
      href={ROUTES.WALLET || '#'}
    />
    <NavItem
      icon={FaEnvelope}
      label="Повідомлення"
      href={ROUTES.MESSAGES || '#'}
    />
    <NavItem
      icon={FaSignOutAlt}
      label="Вийти"
      isButton={true}
      onClick={handleLogout}
    />
  </div>
);
