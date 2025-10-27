import { useLogout } from '@/features/auth/hooks/useLogout';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <button
      onClick={handleLogout}
      className="text-base font-medium bg-gray-200 text-green-800 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-300 transition flex items-center gap-1"
    >
      <FaSignOutAlt className="w-4 h-4" />
      {isPending ? 'Вихід...' : 'Вийти'}
    </button>
  );
};

export default LogoutButton;
