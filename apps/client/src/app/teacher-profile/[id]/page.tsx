import { TeacherPublicProfilePage } from '@/pagesLayer/teacher/public-profile/ui/teacher-public-profile';

export default function Page({ params }: { params: { id: string } }) {
  return <TeacherPublicProfilePage params={params} />;
}
