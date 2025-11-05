import React, { useState } from 'react';

interface SettingItemProps {
  label: string;
  description: string;
  hasToggle?: boolean;
}

export const SettingItem = ({
  label,
  description,
  hasToggle,
}: SettingItemProps) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div>
        <h3 className="text-gray-800 font-medium">{label}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      {hasToggle && (
        <button
          onClick={() => setEnabled(!enabled)}
          className={`cursor-pointer w-12 h-6 rounded-full transition-colors duration-200 ${
            enabled ? 'bg-green-500' : 'bg-gray-300'
          } relative`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
              enabled ? 'translate-x-6' : ''
            }`}
          ></span>
        </button>
      )}
    </div>
  );
};
