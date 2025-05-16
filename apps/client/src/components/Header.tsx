import { useSelector } from 'react-redux';
import { Links } from '../enum/Links';
import CustomLink from './UI/CustomLink';
import AuthButton from './auth/AuthButton';
import { RootState } from '../context/store';

const Header = () => {
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);
  console.log(isLogged);
  return (
    <header className=" bg-white">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <ul className="flex items-center space-x-6">
          <CustomLink to={Links.ROOT}>
            <img className="w-8 h-8" src="mainLogo.png" alt="mainLogo" />
          </CustomLink>
          <CustomLink to={Links.TUTORS}>Реперитори</CustomLink>
          <CustomLink to={Links.APPLICATIONS}>Заявки</CustomLink>
          <CustomLink to={Links.OTHER}>Інше</CustomLink>
        </ul>
        <ul className="flex items-center space-x-4">
          {isLogged ? (
            <>
              <CustomLink to={Links.PROFILE}>Профіль</CustomLink>
              <CustomLink to={Links.PROFILE}>
                <img
                  className="w-8 h-8 rounded-full"
                  src="person1.jpg"
                  alt="profilePicture"
                />
              </CustomLink>
            </>
          ) : (
            <AuthButton isLogged={false} />
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
