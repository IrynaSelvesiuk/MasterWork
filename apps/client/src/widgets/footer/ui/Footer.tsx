import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className=" bg-green-700 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold">MTutorsApp</h3>
          <p className="text-sm text-green-100 mt-1">
            Знайдіть свого ідеального викладача 🌱
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">
          <Link href="/about" className="hover:text-green-200 transition">
            Про нас
          </Link>
          <Link href="/contacts" className="hover:text-green-200 transition">
            Контакти
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-green-200 transition"
          >
            Політика конфіденційності
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-green-100 text-center md:text-right">
          © {new Date().getFullYear()} TutorsApp. Автор: Сельвесюк І.І.
        </div>
      </div>
    </footer>
  );
};
