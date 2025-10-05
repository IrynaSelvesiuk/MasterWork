export const Footer = () => {
  return (
    <footer className="mt-24 bg-green-700 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold">MyApp</h3>
          <p className="text-sm text-green-100 mt-1">
            Розумні рішення для вашого комфорту 🌱
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">
          <a href="#" className="hover:text-green-200 transition">
            Про нас
          </a>
          <a href="#" className="hover:text-green-200 transition">
            Контакти
          </a>
          <a href="#" className="hover:text-green-200 transition">
            Політика конфіденційності
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-green-100 text-center md:text-right">
          © {new Date().getFullYear()} MyApp. Всі права захищені.
        </div>
      </div>
    </footer>
  );
};
