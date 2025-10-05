import { FaFilter } from 'react-icons/fa';

export const TutorSidebarFilters = () => {
  return (
    <aside className="w-64 mr-8 p-6 bg-white rounded-xl shadow-lg h-fit sticky top-24 hidden lg:block">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaFilter className="mr-2 text-green-500" /> Додаткові фільтри
      </h2>
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-700">Рейтинг ⭐</h3>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          {/* Dummy slider implementation */}
        </div>

        <h3 className="text-md font-medium text-gray-700 pt-4 border-t border-gray-100">
          Час доби 🕒
        </h3>
        <div className="space-y-2">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              className="form-checkbox text-green-500 rounded focus:ring-green-500"
            />
            <span className="ml-2">Ранок (9:00 - 12:00)</span>
          </label>
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              className="form-checkbox text-green-500 rounded focus:ring-green-500"
            />
            <span className="ml-2">Вечір (18:00 - 21:00)</span>
          </label>
        </div>
      </div>
    </aside>
  );
};
