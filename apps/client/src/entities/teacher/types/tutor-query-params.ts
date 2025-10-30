export interface TutorQueryParams {
  page?: number;
  limit?: number;
  sortBy: 'createdAt' | 'hourlyRate' | 'experience' | 'rating';
  order: 'ASC' | 'DESC';
  subjectId?: string;
  location?: string;
  search?: string;
}
