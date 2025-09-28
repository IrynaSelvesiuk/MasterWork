interface Props {
  icon: string;
  label: string;
}

const CategoryTile = ({ icon, label }: Props) => {
  return (
    <button className="flex flex-col items-center justify-center p-4 min-w-[120px] h-32 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
      <div className="text-2xl font-bold text-superprofText mb-2">{icon}</div>
      <div className="text-sm text-superprofText">{label}</div>
    </button>
  );
};

export default CategoryTile;
