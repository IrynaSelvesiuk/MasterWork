/* eslint-disable */
import { Education } from 'src/teacher/entities/education.entity';
import { Experience } from 'src/teacher/entities/experience.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { TeacherStatus } from 'src/teacher/types/teacher-status';
import { Role } from 'src/enums/roles.enum';
import { Subject } from 'src/subject/subject.entity';
import { Booking } from 'src/bookings/booking.entity';
import { Availability } from 'src/teacher/entities/availability.enitity';
import { Student } from 'src/student/student.entity';
import { Review } from 'src/teacher/entities/review.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Teacher,
    Subject,
    Education,
    Experience,
    Booking,
    Availability,
    Student,
    Review,
  ],
});

async function seed() {
  await AppDataSource.initialize();
  console.log('✅ Database connected');

  const userRepo = AppDataSource.getRepository(User);
  const teacherRepo = AppDataSource.getRepository(Teacher);
  const subjectRepo = AppDataSource.getRepository(Subject);
  const educationRepo = AppDataSource.getRepository(Education);
  const experienceRepo = AppDataSource.getRepository(Experience);

  const subjectNames = [
    'Математика',
    'Англійська мова',
    'Українська мова',
    'Фізика',
    'Хімія',
    'Біологія',
    'Історія',
    'Географія',
    'Інформатика',
    'Економіка',
  ];

  const subjects: Subject[] = [];
  for (const name of subjectNames) {
    let subject = await subjectRepo.findOne({ where: { name } });
    if (!subject) {
      subject = subjectRepo.create({ name });
      await subjectRepo.save(subject);
    }
    subjects.push(subject);
  }
  console.log(`📚 Created ${subjects.length} subjects`);

  // --- Step 2: Create teachers + user accounts
  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();

    // 👤 User
    const user = userRepo.create({
      firstName,
      lastName,
      email,
      password: 'password123',
      role: Role.Teacher,
      verifiedTutor: faker.datatype.boolean(),
    });
    await userRepo.save(user);

    // 👨‍🏫 Teacher
    const teacher = teacherRepo.create({
      user,
      bio: faker.lorem.sentences(2),
      headline: faker.person.jobTitle(),
      avatarUrl: faker.image.avatar(),
      yearsOfExperience: faker.number.int({ min: 1, max: 20 }),
      hourlyRate: faker.number.float({ min: 10, max: 100 }),
      location: faker.location.city(),
      status: faker.helpers.arrayElement(Object.values(TeacherStatus)),
      subjects: faker.helpers.arrayElements(
        subjects,
        faker.number.int({ min: 1, max: 3 }),
      ),
    });
    await teacherRepo.save(teacher);

    // 🎓 Education
    const educationCount = faker.number.int({ min: 1, max: 2 });
    for (let j = 0; j < educationCount; j++) {
      const education = educationRepo.create({
        teacher,
        degree: faker.person.jobArea(),
        university: faker.company.name() + ' Університет',
        years: `${faker.number.int({ min: 2010, max: 2016 })}-${faker.number.int({ min: 2017, max: 2024 })}`,
      });
      await educationRepo.save(education);
    }

    // 💼 Experience
    const experienceCount = faker.number.int({ min: 1, max: 3 });
    for (let k = 0; k < experienceCount; k++) {
      const experience = experienceRepo.create({
        teacher,
        role: faker.person.jobTitle(),
        location: faker.location.city(),
        years: `${faker.number.int({ min: 2015, max: 2022 })}-${faker.number.int({ min: 2023, max: 2025 })}`,
        description: faker.lorem.sentences(2),
      });
      await experienceRepo.save(experience);
    }

    console.log(
      `👩‍🏫 Created teacher ${i + 1}: ${user.firstName} ${user.lastName}`,
    );
  }

  console.log('🎉 All teachers seeded successfully!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  AppDataSource.destroy();
});
