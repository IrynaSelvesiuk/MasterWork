export const getAverageRating = (reviews: { rating: number }[]) => {
  if (!reviews.length) return null;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};
