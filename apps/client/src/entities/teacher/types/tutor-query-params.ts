export interface TutorQueryParams {
  page: number;
  limit: number;
  sortBy: 'createdAt' | 'hourlyRate' | 'experience' | 'rating';
  order: 'ASC' | 'DESC';
  subject?: string;
  location?: string;
  search?: string;
}
