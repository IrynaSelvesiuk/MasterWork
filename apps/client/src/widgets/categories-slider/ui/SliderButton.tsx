interface SliderButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const SliderButton = ({ direction, onClick }: SliderButtonProps) => {
  const icon = direction === 'left' ? '<' : '>';
  const positionClass = direction === 'left' ? 'left-0' : 'right-0';

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 ${positionClass} transform -translate-y-1/2
                 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center
                 text-xl text-superprofText border border-gray-100 hover:shadow-2xl cursor-pointer
                 transition`}
    >
      {icon}
    </button>
  );
};

export default SliderButton;
