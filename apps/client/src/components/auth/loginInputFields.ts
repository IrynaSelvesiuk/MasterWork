export const loginInputFields = [
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
];
