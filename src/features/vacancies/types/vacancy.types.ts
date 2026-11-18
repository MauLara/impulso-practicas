export interface Vacancy {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  modality: 'Remoto' | 'Híbrido' | 'Presencial';
  stipend: string;
  duration: string;
  category: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  urgent?: boolean;
}
