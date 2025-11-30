import React from 'react';
import { notFound } from 'next/navigation';

import { TeacherProfile } from '@/entities/teacher/model/teacher-entity';
import {
  TeacherAbout,
  TeacherEducation,
  TeacherExperience,
  TeacherHeader,
  TeacherRating,
  TeacherReviews,
  TeacherSidebar,
} from '@/features/teacher/public-profile';

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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Main content first */}
          <main className="lg:col-span-3 space-y-10">
            <TeacherHeader teacher={teacher} />
            <TeacherAbout teacher={teacher} />
            <TeacherEducation education={teacher.education} />
            <TeacherExperience experience={teacher.experience} />
            <TeacherRating teacher={teacher} />
            <TeacherReviews reviews={teacher.reviews} />
          </main>

          {/* Sidebar on the right */}
          <aside className="lg:col-span-1">
            <TeacherSidebar teacher={teacher} />
          </aside>
        </div>
      </div>
    </div>
  );
}
