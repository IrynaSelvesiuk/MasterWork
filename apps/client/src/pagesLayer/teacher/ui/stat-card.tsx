import { ElementType } from 'react';

interface Props {
  title: string;
  value: string | number;
  icon: ElementType;
}

export const StatCard = ({ title, value, icon: Icon }: Props) => (
  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <Icon className="h-6 w-6 text-green-600" />{' '}
    </div>
    <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
  </div>
);
