'use client';

import { useState } from 'react';

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const SearchBox = ({ placeholder = '', onSearch }: SearchBoxProps) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    if (!value.trim()) return;

    onSearch?.(value);
  };

  return (
    <div className="flex w-full max-w-3xl h-16 rounded-full shadow-1xl hover:shadow-2xl overflow-hidden mt-8 transition">
      <div className="flex-grow flex items-center bg-white pl-6">
        <span className="text-2xl text-gray-400 mr-3">&#x1F4DC;</span>
        <input
          type="text"
          placeholder={placeholder}
          className="flex-grow h-full text-lg placeholder-gray-500 focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        className="w-32 bg-red-200 text-red text-lg font-semibold hover:bg-red-300 active:bg-red-400 transition duration-300 cursor-pointer ripple"
        onClick={handleSearch}
      >
        Пошук
      </button>
    </div>
  );
};

export default SearchBox;
