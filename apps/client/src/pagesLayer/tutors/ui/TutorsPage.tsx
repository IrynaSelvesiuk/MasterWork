import {
  TutorSearchBar,
  TutorSidebarFilters,
  TutorListSection,
} from '@/features/tutors';

export const TutorsPage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <TutorSearchBar />

      <div className="flex">
        <TutorSidebarFilters />

        <TutorListSection />
      </div>
    </main>
  );
};
