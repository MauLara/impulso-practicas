import { Vacancy } from '../types/vacancy.types';

export interface IVacancyRepository {
  getAll(): Promise<Vacancy[]>;
  getBySlug(slug: string): Promise<Vacancy | null>;
  search(query: string, category?: string, modality?: string): Promise<Vacancy[]>;
  createVacancy(vacancy: Omit<Vacancy, 'id' | 'slug' | 'postedDate'>): Promise<Vacancy>;
}
