'use client';

import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface FilterDropdownProps<T extends string> {
  label: string;
  options: T[];
  selected: T | undefined;
  placeholder: string;
  onChange: (value: T) => void;
}

export const FilterDropdown = <T extends string>({
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
        <FaChevronRight className="ml-2 h-4 w-4" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option as T);
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
