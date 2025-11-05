import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';
import { FaRegCreditCard } from 'react-icons/fa';

interface WalletSummaryProps {
  walletBalance: number;
}

export const WalletSummary = ({ walletBalance }: WalletSummaryProps) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <FaRegCreditCard className="mr-2 text-green-600" /> Баланс гаманця
    </h2>

    <div className="text-4xl font-extrabold text-green-700">
      {walletBalance.toLocaleString('uk-UA')} ₴
    </div>
    <p className="text-sm text-gray-500 mt-1">Доступно для оплати уроків</p>

    <div className="flex gap-3 mt-2">
      <Link
        href={ROUTES.STUDENT.ADD_MONEY}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition text-sm text-center"
      >
        Поповнити
      </Link>

      <Link
        href={ROUTES.STUDENT.PAYMENTS_HISTORY}
        className="border border-green-500 text-green-700 py-2 px-4 rounded-lg hover:bg-green-50 transition text-sm text-center"
      >
        Історія платежів
      </Link>
    </div>
  </div>
);
