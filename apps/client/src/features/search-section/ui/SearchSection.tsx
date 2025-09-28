import { CategoriesSlider } from '@/widgets/categories-slider';
import { SearchBox } from '@/widgets/search-box';

const categories = [
  { id: 'en', label: 'Англійська мова', icon: 'EN' },
  { id: 'math', label: 'Математика', icon: '√x' },
  { id: 'de', label: 'Німецька мова', icon: 'DE' },
  { id: 'ua', label: 'Українська мова', icon: '⚑' },
  { id: 'fr', label: 'Французька мова', icon: 'FR' },
  { id: 'guitar2', label: 'Гітара', icon: '🎸' },
  { id: 'guitar3', label: 'Гітара', icon: '🎸' },
  { id: 'guitar4', label: 'Гітара', icon: '🎸' },
  { id: 'guitar5', label: 'Гітара', icon: '🎸' },
];

const SearchSection = () => {
  return (
    <div className="flex flex-col items-center pt-8 pb-12 w-full max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-superprofText mt-12 mb-6 text-center">
        Знайдіть ідеального вчителя
      </h1>

      <SearchBox placeholder="Оберіть свій напрямок" />

      <CategoriesSlider categories={categories} />
    </div>
  );
};

export default SearchSection;
