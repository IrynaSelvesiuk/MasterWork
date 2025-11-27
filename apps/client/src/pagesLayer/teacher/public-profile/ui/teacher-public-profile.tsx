import React from 'react';
import { notFound } from 'next/navigation';
import {
  FaStar,
  FaCheckCircle,
  FaLanguage,
  FaMapMarkedAlt,
  FaBriefcase,
  FaGraduationCap,
  FaBookOpen,
  FaChalkboardTeacher,
} from 'react-icons/fa';

import { ProfileSection } from '@/features/teacher/public-profile/ui/profile-section';
import { ReviewCard } from '@/features/teacher/public-profile/ui/review-card';
import { TeacherProfile } from '@/entities/teacher/model/teacher-entity';
import Image from 'next/image';
import { ReviewSection } from '@/features/review-section/ui/review-section';
import { BookingButton } from '../_components/booking-button';

async function getTeacherProfile(id: string): Promise<TeacherProfile> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const res = await fetch(`${API_URL}/teachers/profile/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Не вдалося завантажити профіль');
  }
  return res.json();
}

interface Props {
  params: { id: string };
}

export async function TeacherPublicProfilePage({ params }: Props) {
  const rawTeacher = await getTeacherProfile(params.id);

  const teacher = {
    ...rawTeacher,

    name: `${rawTeacher.user.firstName} ${rawTeacher.user.lastName}`,

    rating: rawTeacher.rating || 0,
    reviewsCount: rawTeacher.reviews?.length || 0,
    reviews: rawTeacher.reviews || [],
    speaks: rawTeacher.speaks || [],

    hourlyRate: Number(rawTeacher.hourlyRate) || 0,
  };
  console.log(teacher);
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Картка з ціною та бронюванням */}
              <div className="rounded-xl border bg-white p-6 shadow-lg">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    {Math.round(teacher.hourlyRate)} ₴
                  </span>
                  <span className="text-gray-500">/ година</span>
                </div>
                <BookingButton teacherUserId={teacher.user.id} />
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-lg">
                <h3 className="flex items-center text-lg font-semibold">
                  <FaLanguage className="mr-2 h-5 w-5 text-gray-500" />
                  Мови
                </h3>
                {teacher.speaks.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {teacher.speaks.map((lang) => (
                      <li
                        key={lang}
                        className="flex items-center text-gray-700"
                      >
                        <FaCheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        {lang}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-gray-500">Мови не вказані.</p>
                )}

                {/* Секція Розташування */}
                <h3 className="mt-5 flex items-center text-lg font-semibold">
                  <FaMapMarkedAlt className="mr-2 h-5 w-5 text-gray-500" />
                  Розташування
                </h3>
                <p className="mt-2 text-gray-700">{teacher.location}</p>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-2">
            <div className="rounded-xl border bg-white p-8 shadow-lg">
              {/* Заголовок профілю */}
              <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {teacher.name}
                  </h1>
                  <p className="mt-3 max-w-2xl text-lg text-gray-600">
                    {teacher.headline}
                  </p>
                </div>
                <Image
                  src={teacher.avatarUrl || '/default-avatar.png'}
                  alt={teacher.name}
                  height={96}
                  width={96}
                  className="mb-4 rounded-full border-4 border-white shadow-md sm:mb-0"
                />
              </div>
              {/* Рейтинг */}
              <div className="mt-5 border-t pt-5">
                {/* Rating summary */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="h-6 w-6 text-yellow-400" />
                    <span className="text-xl font-bold text-gray-800">
                      {teacher?.rating ? teacher.rating.toFixed(1) : '—'}
                    </span>
                  </div>
                  <span className="text-lg text-gray-600">
                    ({teacher?.reviewsCount ?? 0} відгуків)
                  </span>
                </div>

                <ReviewSection teacherId={teacher.id} />
              </div>
              {/* Секція "Про мене" */}
              {teacher.bio && (
                <ProfileSection title="Про мене" icon={FaChalkboardTeacher}>
                  <p className="whitespace-pre-line text-base leading-relaxed">
                    {teacher.bio}
                  </p>
                </ProfileSection>
              )}
              {/* Секція "Предмети" */}
              <ProfileSection title="Предмети" icon={FaBookOpen}>
                {teacher.subjects.length > 0 ? (
                  <ul className="space-y-4">
                    {teacher.subjects.map((subject) => (
                      <li
                        key={subject.id}
                        className="rounded-lg border border-gray-100 bg-gray-50 p-4"
                      >
                        <h4 className="font-semibold text-green-700">
                          {subject.category}
                        </h4>
                        <h3 className="text-lg font-medium text-gray-900">
                          {subject.name}
                        </h3>
                        {subject.description && (
                          <p className="mt-1 text-gray-600">
                            {subject.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Предмети ще не додані.</p>
                )}
              </ProfileSection>
              {/* Секція "Освіта" */}
              <ProfileSection title="Освіта" icon={FaGraduationCap}>
                {teacher.education.length > 0 ? (
                  <ul className="space-y-5">
                    {teacher.education.map((edu) => (
                      <li key={edu.id}>
                        <p className="font-semibold text-gray-900">
                          {edu.degree}
                        </p>
                        <p className="text-gray-600">{edu.university}</p>
                        <p className="text-sm text-gray-500">{edu.years}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Дані про освіту ще не додані.</p>
                )}
              </ProfileSection>
              {/* Секція "Досвід роботи" */}
              <ProfileSection title="Досвід роботи" icon={FaBriefcase}>
                {teacher.experience.length > 0 ? (
                  <ul className="space-y-5">
                    {teacher.experience.map((exp) => (
                      <li key={exp.id}>
                        <p className="font-semibold text-gray-900">
                          {exp.role}
                        </p>
                        <p className="text-gray-600">{exp.location}</p>
                        <p className="text-sm text-gray-500">{exp.years}</p>
                        {exp.description && (
                          <p className="mt-1 text-gray-700">
                            {exp.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Дані про досвід роботи ще не додані.</p>
                )}
              </ProfileSection>

              <ProfileSection title="Відгуки студентів" icon={FaStar}>
                {teacher.reviews.length > 0 ? (
                  <ul className="space-y-6">
                    {teacher.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </ul>
                ) : (
                  <p>Цей вчитель ще не має відгуків.</p>
                )}
              </ProfileSection>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
