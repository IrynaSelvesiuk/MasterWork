import { ProfileSection } from '@/features/teacher/public-profile/ui/profile-section';
import { FaStar } from 'react-icons/fa';
import { ReviewCard } from '@/features/teacher/public-profile/ui/review-card';
import { Review } from '@/entities/teacher/model/teacher-entity';

interface Props {
  reviews: Review[];
}

export const TeacherReviews = ({ reviews }: Props) => {
  return (
    <ProfileSection title="Відгуки студентів" icon={FaStar}>
      {reviews.length > 0 ? (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p>Цей вчитель ще не має відгуків.</p>
      )}
    </ProfileSection>
  );
};
