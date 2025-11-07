import { JSX } from 'react';

interface Props {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

const CategoryTile = ({ icon, label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 min-w-[120px] h-32 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer"
    >
      <div className="text-2xl font-bold text-superprofText mb-2">{icon}</div>
      <div className="text-sm text-superprofText text-center leading-tight h-8 flex items-center justify-center">
        {label}
      </div>
    </button>
  );
};

export default CategoryTile;
