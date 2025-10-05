interface TutorActionsProps {
  pricePer60Min: number;
}

export const TutorActions = ({ pricePer60Min }: TutorActionsProps) => {
  return (
    <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100">
      <div className="text-right mr-6">
        <div className="text-sm text-gray-500">1 год/заняття</div>
        <div className="text-3xl font-extrabold text-green-600">
          {pricePer60Min.toLocaleString('uk-UA')} ₴
        </div>
      </div>

      <button className="bg-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-600 transition shadow-md">
        Забронювати пробний урок
      </button>
    </div>
  );
};
