import { FC, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import CustomLink from '../UI/CustomLink';
import { Links } from '../../enum/Links';

interface AuthButtonProps {
  isLogged: boolean;
}

const AuthButton: FC<AuthButtonProps> = ({ isLogged }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="px-6 py-2 border  rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 flex items-center gap-2 transition duration-300"
      >
        {isLogged ? 'Вийти' : 'Вхід'}
        {showDropdown ? (
          <IoMdClose className="w-4 h-4 transition duration-300" />
        ) : (
          <IoIosArrowDown className="w-4 h-4 transition duration-300" />
        )}
      </button>
      {!isLogged && showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="py-1 flex flex-col">
            <CustomLink
              to={Links.LOGIN_STUDENT}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Увійти як учень
            </CustomLink>
            <CustomLink
              to={Links.LOGIN_TEACHER}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Увійти як викладач
            </CustomLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
