export default function ContactsPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Контакти</h1>

      <p className="text-gray-700 mb-4">
        Якщо у вас є запитання, пропозиції або відгуки — ми будемо раді їх
        почути. Зв’яжіться з нами будь-яким зручним для вас способом.
      </p>

      <div className="space-y-3">
        <p>
          <span className="font-semibold">Email:</span>{' '}
          <a
            href="mailto:support@tutors-app.com"
            className="text-green-600 hover:underline"
          >
            support@tutors-app.com
          </a>
        </p>

        <p>
          <span className="font-semibold">Телефон:</span>{' '}
          <a
            href="tel:+380991234567"
            className="text-green-600 hover:underline"
          >
            +38 (099) 123 45 67
          </a>
        </p>

        <p>
          <span className="font-semibold">Адреса:</span> вул. Освіти, 12, Київ,
          Україна
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Зворотній зв’язок</h2>
        <form className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Ваше ім’я"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
          />
          <input
            type="email"
            placeholder="Ваш Email"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
          />
          <textarea
            placeholder="Ваше повідомлення"
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            Надіслати
          </button>
        </form>
      </section>
    </main>
  );
}
