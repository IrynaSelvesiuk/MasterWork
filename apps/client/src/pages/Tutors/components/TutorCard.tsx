import { FaStar, FaCheckCircle } from 'react-icons/fa';

const TutorCard = () => {
  return (
    <div className="w-4/5 rounded-lg shadow-md flex overflow-hidden bg-white mt-4">
      {/* Left Section */}
      <div className="w-1/3 p-4 flex flex-col items-center justify-center border-r">
        <div className="relative rounded-full overflow-hidden w-24 h-24 mb-2">
          <img
            src="https://via.placeholder.com/100"
            alt="Tutor Profile"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 bg-green-500 text-white text-xs rounded-full px-1 py-0.5">
            <FaCheckCircle className="inline-block mr-0.5" /> Перевірений
          </div>
        </div>
        <h3 className="text-lg font-semibold text-center">Остап С.</h3>
        <div className="flex items-center text-sm text-gray-600">
          <FaStar className="text-yellow-500 mr-1" />
          5.0 (відгуків: 805)
        </div>
      </div>

      {/* Middle Section */}
      <div className="w-2/3 p-4">
        <div className="mb-2">
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
            Математика
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
            Вища математика
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
            Математичний аналіз
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
            Диференціальні рівняння
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
            Лінійна алгебра
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">Освіта:</span> Львівський національний
          університет імені Івана Франка, механіко-математичний факультет
        </p>
        <p className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">Досвід:</span> Більше 20 років
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Можливі заняття онлайн</span>
        </p>
        <p className="text-sm text-gray-800">
          <span className="font-semibold text-red-500">УВАГА.</span> Ціна
          вказана в анкеті найнижча, нижче описані всі ціни за послуги
          Професійний репетитор ДПА, ЗНО (9-11кл) Працюю з моїми асистентами
          Готую студентів з вищої математики, диффрівнянь, мат. ан. Раніше мав
          свій репетиторський центр. Займаюся репетиторською діяльністю 20
          років. Також маю асистентів, які працюють по моїй методиці. Якісно и
          результативно підготую до ДПА и ЗНО учнів 7-11 клас з математики.
          Підготую студентів 1-2 курсів по предметах вища математика,
          диференційний, математичний а...
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/4 p-4 flex flex-col items-center justify-between border-l">
        <div className="text-center">
          <p className="text-xl font-semibold text-green-600">Львів</p>
          <p className="text-2xl font-bold text-gray-800">300 грн/год</p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
          Зв'язатись з репетитором
        </button>
        <p className="text-sm text-gray-600 mt-1">це безкоштовно</p>
        <button className="text-sm text-blue-500 hover:underline mt-4">
          Детальніше
        </button>
      </div>
    </div>
  );
};

export default TutorCard;
