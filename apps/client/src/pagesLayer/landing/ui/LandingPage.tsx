import { SearchSection } from '@/features/search-section';
import { Header } from '@/widgets/header';

const LandingPage = () => {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          'linear-gradient(180deg, rgba(255, 240, 240, 1) 0%, rgba(255, 230, 230, 0.5) 50%, rgba(255, 255, 255, 1) 100%)',
      }}
    >
      <Header />
      <main className="main-content">
        <SearchSection />
      </main>
    </div>
  );
};

export default LandingPage;
