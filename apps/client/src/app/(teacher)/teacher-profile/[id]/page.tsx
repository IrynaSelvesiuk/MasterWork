import { TeacherPublicProfilePage } from '@/pagesLayer/teacher';

export default function Page({ params }: { params: { id: string } }) {
  return <TeacherPublicProfilePage params={params} />;
}
