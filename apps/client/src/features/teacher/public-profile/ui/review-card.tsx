import { FaQuoteLeft, FaStar } from 'react-icons/fa';

type ReviewProps = {
  id: string | number;
  studentName: string;
  rating: number;
  comment: string;
};

export const ReviewCard = ({ review }: { review: ReviewProps }) => (
  <li className="flex flex-col gap-3 rounded-lg border bg-gray-50 p-6">
    <div className="flex items-center justify-between">
      <span className="font-semibold text-gray-900">
        {review.student.user.firstName} {review.student.user.lastName}
      </span>
      <div className="flex items-center gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} className="h-5 w-5 text-yellow-400" />
        ))}
      </div>
    </div>
    <p className="text-gray-700">
      <FaQuoteLeft className="inline h-4 w-4 text-gray-300 mr-2" />
      {review.comment}
    </p>
  </li>
);
