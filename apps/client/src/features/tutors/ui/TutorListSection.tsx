import { TutorCard } from './TutorCard'; // Assuming TutorCard is a sibling component
import { DUMMY_TUTORS } from '@/shared/data/dummyTutots';

export const TutorListSection = () => {
  return (
    <section className="flex-grow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Англійська: знайдено <span className="text-green-600">37 631</span>
        репетитора/-ку
      </h2>
      <div className="space-y-6">
        {DUMMY_TUTORS.map((tutor, index) => (
          <TutorCard key={index} {...tutor} />
        ))}
      </div>
    </section>
  );
};
