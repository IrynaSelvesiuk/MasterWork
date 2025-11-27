import { FaLanguage, FaCheckCircle, FaMapMarkedAlt } from 'react-icons/fa';

interface Props {
  speaks: string[];
  location: string;
}

export const LanguagesSection = ({ speaks, location }: Props) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-lg">
      <h3 className="flex items-center text-lg font-semibold">
        <FaLanguage className="mr-2 h-5 w-5 text-gray-500" />
        Мови
      </h3>

      {speaks?.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {speaks.map((lang) => (
            <li key={lang} className="flex items-center text-gray-700">
              <FaCheckCircle className="mr-2 h-4 w-4 text-green-500" />
              {lang}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-500">Мови не вказані.</p>
      )}

      <h3 className="mt-5 flex items-center text-lg font-semibold">
        <FaMapMarkedAlt className="mr-2 h-5 w-5 text-gray-500" />
        Розташування
      </h3>

      <p className="mt-2 text-gray-700">{location}</p>
    </div>
  );
};
