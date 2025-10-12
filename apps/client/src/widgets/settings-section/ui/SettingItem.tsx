import { FaChevronRight } from 'react-icons/fa';

interface SettingItemProps {
  label: string;
  description: string;
}

export const SettingItem = ({ label, description }: SettingItemProps) => (
  <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition cursor-pointer">
    <div>
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <FaChevronRight className="w-4 h-4 text-gray-400" />
  </div>
);
