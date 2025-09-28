import { CategoryTile } from '@/entities/category';

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

      {/* Search Box */}
      <div className="flex w-full max-w-3xl h-16 rounded-full shadow-2xl overflow-hidden mt-8">
        <div className="flex-grow flex items-center bg-white pl-6">
          <span className="text-2xl text-gray-400 mr-3">
            &#x1F4DC; {/* Document emoji to represent the icon */}
          </span>
          <input
            type="text"
            placeholder='Спробувати: "Німецька"'
            className="flex-grow h-full text-lg placeholder-gray-500 focus:outline-none"
          />
        </div>
        <button className="w-32 bg-superprofRed text-white text-lg font-semibold hover:bg-opacity-90 transition duration-300">
          Пошук
        </button>
      </div>

      {/* Categories Slider */}
      <div className="relative w-full max-w-4xl mx-auto mt-16 p-4">
        <div className="flex overflow-x-scroll space-x-4 pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <CategoryTile key={cat.id} label={cat.label} icon={cat.icon} />
          ))}
        </div>
        {/* Scroll button on the right */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-xl text-superprofText border border-gray-100 hover:shadow-2xl">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
