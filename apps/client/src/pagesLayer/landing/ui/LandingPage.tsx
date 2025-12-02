import { SearchSection } from '@/features/search-section';
import { whyUsCards } from '@/shared/data/whyUs';
import { WhyUsCard } from '@/widgets/why-us-card';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen font-sans">
      {/* Background */}
      <div
        style={{
          backgroundImage: `url('bg.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: 'blur(5px)',
        }}
        className="absolute inset-0 z-0"
      ></div>

      {/* Main content */}
      <main className="relative z-10">
        <SearchSection />

        <section className="mt-24 px-6 md:px-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-10">
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
    </div>
  );
};

export default LandingPage;
