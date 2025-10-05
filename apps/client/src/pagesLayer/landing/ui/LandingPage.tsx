import { SearchSection } from '@/features/search-section';
import { whyUsCards } from '@/shared/data/whyUs';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { WhyUsCard } from '@/widgets/why-us-card';

const LandingPage = () => {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          'linear-gradient(180deg, rgba(232, 255, 232, 1) 0%, rgba(210, 245, 210, 0.6) 50%, rgba(255, 255, 255, 1) 100%)',
      }}
    >
      <Header />
      <main className="main-content">
        <SearchSection />

        <section className="mt-24 px-6 md:px-16 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-10">
            Чому обрати саме нас?
          </h2>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {whyUsCards.map((item, index) => (
              <WhyUsCard
                key={index}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
