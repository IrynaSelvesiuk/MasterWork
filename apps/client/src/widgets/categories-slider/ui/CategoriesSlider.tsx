'use client';

import { CATEGORY_ICONS } from '@/entities/category';
import { useRef } from 'react';
import SliderButton from './SliderButton';
import { useGetSubjects } from '@/entities/subject/hooks/useGetSubjects';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { FaBookOpen } from 'react-icons/fa';
import CategoryTile from './category-tile';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/router/routes';

const CategoriesSlider = () => {
  const { data: subjects, isLoading } = useGetSubjects();
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (name: string) => {
    router.push(`${ROUTES.TUTORS}?subject=${encodeURIComponent(name)}`);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16 p-4">
      <div
        ref={sliderRef}
        className="flex overflow-x-hidden space-x-4 pb-4 scrollbar-hide scroll-smooth"
      >
        {subjects?.map((cat) => (
          <CategoryTile
            key={cat.id}
            label={cat.name}
            icon={CATEGORY_ICONS[cat.category] || <FaBookOpen />}
            onClick={() => handleSelectCategory(cat.name)}
          />
        ))}
      </div>

      {/* Scroll buttons */}
      <SliderButton direction="left" onClick={scrollLeft} />
      <SliderButton direction="right" onClick={scrollRight} />
    </div>
  );
};

export default CategoriesSlider;
