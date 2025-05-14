import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 flex-grow">
        <div className="">
          <p>Info about site</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
