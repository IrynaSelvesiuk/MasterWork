'use client';

import { TutorQueryParams } from '@/entities/teacher/types/tutor-query-params';
import React, { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

type SortBy = TutorQueryParams['sortBy'];
type Order = TutorQueryParams['order'];

interface FilterDropdownProps<T extends string> {
  label: string;
  options: T[];
  selected: T;
  onChange: (value: T) => void;
}

const FilterDropdown = <T extends string>({
  label,
  options,
  selected,
  onChange,
}: FilterDropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex justify-between items-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span>
          {label}: <span className="font-semibold">{selected}</span>
        </span>
        <FaChevronDown className="ml-2 h-4 w-4" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option as T); // cast ensures type safety
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                selected === option ? 'font-semibold text-green-600' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const TutorSearchBar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: TutorQueryParams) => void;
}) => {
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');
  const [order, setOrder] = useState<Order>('DESC');
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [subjectId, setSubjectId] = useState<string | undefined>(undefined);

  const handleSearch = () => {
    onFilterChange({
      search,
      sortBy,
      order,
      location,
      subjectId,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Знайдіть найкращого онлайн-репетитора 🚀
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Я хочу вивчати..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <FilterDropdown<SortBy>
          label="Сортувати"
          options={['createdAt', 'hourlyRate', 'experience', 'rating']}
          selected={sortBy}
          onChange={(value) => {
            setSortBy(value);
            handleSearch();
          }}
        />

        <FilterDropdown<Order>
          label="Порядок"
          options={['ASC', 'DESC']}
          selected={order}
          onChange={(value) => {
            setOrder(value);
            handleSearch();
          }}
        />

        <div>
          <input
            type="text"
            placeholder="Країна або місто"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
    </div>
  );
};
