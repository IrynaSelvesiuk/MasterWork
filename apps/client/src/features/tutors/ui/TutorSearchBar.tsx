import { FaSearch, FaChevronDown } from 'react-icons/fa';

const FilterDropdown = ({
  label,
  options,
  selected,
}: {
  label: string;
  options: string[];
  selected: string;
}) => (
  <div className="relative inline-block text-left w-full">
    <div className="inline-flex justify-between items-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
      <span>
        {label}: <span className="font-semibold">{selected}</span>
      </span>
      <FaChevronDown className="-mr-1 ml-2 h-4 w-4" />
    </div>
  </div>
);

export const TutorSearchBar = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Знайдіть найкращого онлайн-репетитора англійської мови 🚀
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Я хочу вивчати: Англійська"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <FilterDropdown
          label="Ціна за урок"
          options={[]}
          selected="100-1 600+ ₴"
        />
        <FilterDropdown
          label="Країна народження"
          options={[]}
          selected="Будь-яка країна"
        />
        <FilterDropdown
          label="Сортувати"
          options={[]}
          selected="За нашими рекомендаціями"
        />
      </div>
      {/* Secondary Filter Tags */}
      <div className="flex flex-wrap gap-3 mt-4">
        <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-lime-200">
          Напрямки навчання <FaChevronDown className="inline ml-1" />
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200">
          Також володіє <FaChevronDown className="inline ml-1" />
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200">
          Носії мови
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200">
          Категорії репетиторів <FaChevronDown className="inline ml-1" />
        </span>
      </div>
    </div>
  );
};
