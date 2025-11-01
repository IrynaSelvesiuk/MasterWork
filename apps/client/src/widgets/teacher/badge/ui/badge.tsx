interface Props {
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
}

export const Badge = ({ status }: Props) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold
      ${
        status === 'pending'
          ? 'bg-yellow-100 text-yellow-700'
          : status === 'confirmed'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
      }`}
    >
      {status === 'pending'
        ? 'Очікує підтвердження'
        : status === 'confirmed'
          ? 'Підтверджено'
          : 'Скасовано'}
    </span>
  );
};
