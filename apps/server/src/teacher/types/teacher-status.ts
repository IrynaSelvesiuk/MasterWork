export enum TeacherStatus {
  PENDING = 'PENDING', // Тільки зареєструвався, профіль не заповнений
  IN_REVIEW = 'IN_REVIEW', // Натиснув "Відправити на верифікацію" (опціонально)
  ACTIVE = 'ACTIVE', // Верифікований і видимий для студентів
  REJECTED = 'REJECTED', // Верифікація не пройдена
}
