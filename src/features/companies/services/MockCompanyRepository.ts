import { ICompanyRepository } from './ICompanyRepository';
import { Company } from '../types/company.types';

const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'TechNova Solutions',
    slug: 'technova-solutions',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    industry: 'Desarrollo de Software & Cloud',
    location: 'Madrid, España',
    description: 'Empresa líder en transformación digital y desarrollo de software avanzado para corporaciones globales.',
    activeVacanciesCount: 3,
    website: 'https://technova.example.com',
    verified: true,
  },
  {
    id: 'c2',
    name: 'Creativa Digital Studio',
    slug: 'creativa-digital-studio',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150&auto=format&fit=crop&q=80',
    industry: 'Diseño UX/UI & Branding',
    location: 'Barcelona, España',
    description: 'Estudio de diseño enfocado en crear productos digitales memorables y experiencias de usuario excepcionales.',
    activeVacanciesCount: 2,
    website: 'https://creativa.example.com',
    verified: true,
  },
  {
    id: 'c3',
    name: 'Finova Global',
    slug: 'finova-global',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80',
    industry: 'Tecnología Financiera / Fintech',
    location: 'Valencia, España',
    description: 'Plataforma fintech disruptiva que reinventa los servicios de pagos y análisis de datos financieros.',
    activeVacanciesCount: 1,
    website: 'https://finova.example.com',
    verified: true,
  },
  {
    id: 'c4',
    name: 'Cloudware Systems',
    slug: 'cloudware-systems',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    industry: 'Infraestructura Cloud & DevOps',
    location: 'Bilbao, España',
    description: 'Especialistas en arquitecturas cloud escalables, alta disponibilidad y automatización de procesos.',
    activeVacanciesCount: 2,
    website: 'https://cloudware.example.com',
    verified: true,
  },
];

export class MockCompanyRepository implements ICompanyRepository {
  async getAll(): Promise<Company[]> {
    return MOCK_COMPANIES;
  }

  async getBySlug(slug: string): Promise<Company | null> {
    return MOCK_COMPANIES.find((c) => c.slug === slug) || null;
  }
}
