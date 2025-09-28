'use client';

import { Category, CategoryTile } from '@/entities/category';
import { useRef } from 'react';
import SliderButton from './SliderButton';

interface Props {
  categories: Category[];
}

const CategoriesSlider = ({ categories }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16 p-4">
      <div
        ref={sliderRef}
        className="flex overflow-x-hidden space-x-4 pb-4 scrollbar-hide scroll-smooth"
      >
        {categories.map((cat) => (
          <CategoryTile key={cat.id} label={cat.label} icon={cat.icon} />
        ))}
      </div>

      {/* Scroll buttons */}
      <SliderButton direction="left" onClick={scrollLeft} />
      <SliderButton direction="right" onClick={scrollRight} />
    </div>
  );
};

export default CategoriesSlider;
