'use client';

import { useState } from 'react';

export const ImagePicker = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');

    const data = await res.json();
    setUploading(false);

    if (data.url) {
      onUpload(data.url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 rounded-full object-cover border-2 border-green-500"
        />
      )}

      <label className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        {uploading ? 'Завантаження...' : 'Вибрати фото'}
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
};
