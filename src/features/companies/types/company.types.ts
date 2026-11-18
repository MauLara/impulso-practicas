export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  location: string;
  description: string;
  activeVacanciesCount: number;
  website: string;
  verified: boolean;
}
