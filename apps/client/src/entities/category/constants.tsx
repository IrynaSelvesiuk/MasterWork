import { JSX } from 'react';
import {
  FaCalculator,
  FaFlask,
  FaBookOpen,
  FaLanguage,
  FaLaptopCode,
  FaPalette,
} from 'react-icons/fa';

export const CATEGORY_ICONS: Record<string, JSX.Element> = {
  'Математичні науки': <FaCalculator className="text-blue-500" />,
  'Природничі науки': <FaFlask className="text-green-500" />,
  'Гуманітарні науки': <FaBookOpen className="text-yellow-500" />,
  Мови: <FaLanguage className="text-purple-500" />,
  Технології: <FaLaptopCode className="text-cyan-500" />,
  Мистецтво: <FaPalette className="text-pink-500" />,
};
