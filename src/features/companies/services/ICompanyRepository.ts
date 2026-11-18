import { Company } from '../types/company.types';

export interface ICompanyRepository {
  getAll(): Promise<Company[]>;
  getBySlug(slug: string): Promise<Company | null>;
}
