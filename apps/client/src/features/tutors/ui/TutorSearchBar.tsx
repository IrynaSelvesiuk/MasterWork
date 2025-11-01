'use client';

import { TutorQueryParams } from '@/entities/teacher/types/tutor-query-params';
import { FilterDropdown } from '@/widgets/filter-dropdown';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

type SortBy = TutorQueryParams['sortBy'];
type Order = TutorQueryParams['order'];

export const TutorSearchBar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: Partial<TutorQueryParams>) => void;
}) => {
  const [sortBy, setSortBy] = useState<SortBy | undefined>(undefined);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [subject, setSubject] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSearch = () => {
    onFilterChange({
      subject: subject || undefined,
      sortBy,
      order,
      location: location || undefined,
    });
  };

  const isDisabled = !sortBy && !order && !subject && !location;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Знайдіть найкращого онлайн-репетитора 🚀
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Я хочу вивчати..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Sort dropdown */}
        <FilterDropdown<SortBy>
          label="Сортувати"
          options={['createdAt', 'hourlyRate', 'experience', 'rating']}
          placeholder="Виберіть поле"
          selected={sortBy}
          onChange={(value) => setSortBy(value)}
        />

        {/* Order dropdown */}
        <FilterDropdown<Order>
          label="Порядок"
          options={['ASC', 'DESC']}
          placeholder="Виберіть поле"
          selected={order}
          onChange={(value) => setOrder(value)}
        />

        {/* Location input */}
        <div>
          <input
            type="text"
            placeholder="Країна або місто"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* 🔍 Search button */}
        <div className="flex items-center justify-center">
          <button
            disabled={isDisabled}
            onClick={handleSearch}
            className={`w-full md:w-auto px-6 py-2 font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 
      ${
        isDisabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700 text-white'
      }
    `}
          >
            <FaSearch />
            Пошук
          </button>
        </div>
      </div>
    </div>
  );
};
