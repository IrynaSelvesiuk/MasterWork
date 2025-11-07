export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Політика конфіденційності</h1>

      <p className="text-gray-700 mb-4">
        Ми поважаємо вашу конфіденційність і прагнемо захищати ваші особисті
        дані. Ця Політика конфіденційності пояснює, які дані ми збираємо, як їх
        використовуємо та зберігаємо.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Збір інформації</h2>
      <p className="text-gray-700">
        Ми можемо збирати особисті дані, такі як ім’я, електронну адресу, номер
        телефону або іншу інформацію, яку ви добровільно надаєте при реєстрації
        чи заповненні форм на сайті.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Використання інформації
      </h2>
      <p className="text-gray-700">
        Зібрані дані використовуються для надання освітніх послуг, покращення
        якості сервісу, зв’язку з користувачами та персоналізації досвіду
        використання застосунку.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Захист даних</h2>
      <p className="text-gray-700">
        Ми застосовуємо сучасні заходи безпеки для захисту вашої інформації від
        несанкціонованого доступу, зміни або знищення.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Ваші права</h2>
      <p className="text-gray-700">
        Ви маєте право переглядати, змінювати або видаляти свої особисті дані.
        Для цього зв’яжіться з нами за адресою:{' '}
        <a
          href="mailto:support@tutors-app.com"
          className="text-green-600 hover:underline"
        >
          support@tutors-app.com
        </a>
        .
      </p>

      <p className="text-gray-500 text-sm mt-8">
        Останнє оновлення: {new Date().toLocaleDateString('uk-UA')}
      </p>
    </main>
  );
}
