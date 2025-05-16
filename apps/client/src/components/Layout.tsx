import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <main className="flex-grow container mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
