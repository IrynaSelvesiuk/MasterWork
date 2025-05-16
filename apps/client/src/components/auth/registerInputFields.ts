export const registerInputFields = [
  {
    name: 'name',
    label: "Ім'я",

    validation: {
      required: "Ім'я обов'язкове",
      minLength: { value: 2, message: 'Мінімум 2 символи' },
    },
  },
  {
    name: 'surname',
    label: 'Прізвище',

    validation: {
      required: 'Прізвище обов’язкове',
    },
  },
  {
    name: 'email',
    label: 'Адреса електронної пошти',

    validation: {
      required: "Email обов'язковий",
      pattern: {
        value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: 'Невірний формат email',
      },
    },
  },
  {
    name: 'phone',
    label: 'Телефон',

    validation: {
      pattern: {
        value: /^\+?[0-9\s-]{7,15}$/,
        message: 'Невірний номер телефону',
      },
    },
  },
  { name: 'subject', label: 'Предмет', required: false },
];
