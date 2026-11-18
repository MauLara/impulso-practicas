import { IVacancyRepository } from './IVacancyRepository';
import { Vacancy } from '../types/vacancy.types';

const MOCK_VACANCIES: Vacancy[] = [
  {
    id: '1',
    slug: 'frontend-developer-intern-technova',
    title: 'Frontend Developer Intern (React & TypeScript)',
    companyName: 'TechNova Solutions',
    location: 'Madrid, España',
    modality: 'Híbrido',
    stipend: '900€ - 1.200€ / mes',
    duration: '6 meses',
    category: 'Desarrollo Software',
    description: 'Buscamos un estudiante apasionado por el desarrollo frontend para unirse a nuestro equipo de producto. Trabajarás con React 18, TypeScript y diseño moderno creando experiencias web excepcionales.',
    requirements: [
      'Estudiante de Ingeniería Informática, Grado Superior o afines.',
      'Conocimientos sólidos en JavaScript/TypeScript y React.',
      'Familiaridad con control de versiones (Git).',
      'Pasión por aprender y trabajo en equipo.'
    ],
    responsibilities: [
      'Desarrollar componentes reutilizables en React.',
      'Colaborar en la optimización y rendimiento de aplicaciones web.',
      'Participar en revisiones de código y reuniones de planificación ágil.'
    ],
    postedDate: 'Hace 2 días',
    urgent: true,
  },
  {
    id: '2',
    slug: 'ux-ui-designer-practicas-creativa',
    title: 'UX/UI Product Design Intern',
    companyName: 'Creativa Digital Studio',
    location: 'Barcelona, España',
    modality: 'Remoto',
    stipend: '800€ - 1.000€ / mes',
    duration: '6 meses',
    category: 'Diseño UX/UI',
    description: 'Únete a nuestro estudio creativo para diseñar interfaces de usuario intuitivas y experiencias memorables para clientes internacionales de primer nivel.',
    requirements: [
      'Dominio de Figma y herramientas de prototipado.',
      'Portafolio que demuestre proceso de diseño centrado en el usuario.',
      'Capacidad de comunicación y empatía.'
    ],
    responsibilities: [
      'Crear wireframes, user flows y diseños de alta fidelidad.',
      'Construir y mantener sistemas de diseño en Figma.',
      'Realizar pruebas con usuarios y análisis de usabilidad.'
    ],
    postedDate: 'Hace 4 días',
  },
  {
    id: '3',
    slug: 'data-analytics-intern-fintech',
    title: 'Junior Data Analyst Intern',
    companyName: 'Finova Global',
    location: 'Valencia, España',
    modality: 'Presencial',
    stipend: '1.000€ / mes',
    duration: '5 meses',
    category: 'Datos e IA',
    description: 'Participa en la transformación digital de nuestra plataforma financiera analizando grandes volúmenes de datos y construyendo dashboards interactivos.',
    requirements: [
      'Estudios en Matemáticas, Estadística, Data Science o Ingeniería.',
      'Manejo de Python (Pandas, NumPy) y SQL.',
      'Capacidad analítica y atención al detalle.'
    ],
    responsibilities: [
      'Limpieza, procesamiento y análisis de datasets financieros.',
      'Creación de dashboards en PowerBI / Tableau.',
      'Soporte en modelos predictivos básicos.'
    ],
    postedDate: 'Hace 1 semana',
  },
  {
    id: '4',
    slug: 'backend-engineer-intern-cloudware',
    title: 'Backend Engineer Intern (Node.js & Go)',
    companyName: 'Cloudware Systems',
    location: 'Bilbao, España',
    modality: 'Remoto',
    stipend: '950€ / mes',
    duration: '6 meses',
    category: 'Desarrollo Software',
    description: 'Desarrolla APIs escalables y microservicios robustos utilizando tecnologías cloud-native y arquitectura orientada a servicios.',
    requirements: [
      'Conocimientos en Node.js, Express o Go.',
      'Bases de datos relacionales (PostgreSQL) y NoSQL (MongoDB).',
      'Conceptos básicos de Docker y arquitecturas Cloud.'
    ],
    responsibilities: [
      'Implementación de endpoints RESTful y GraphQL.',
      'Optimización de consultas a base de datos.',
      'Escribir tests unitarios y de integración.'
    ],
    postedDate: 'Hace 3 días',
  },
];

export class MockVacancyRepository implements IVacancyRepository {
  async getAll(): Promise<Vacancy[]> {
    return MOCK_VACANCIES;
  }

  async getBySlug(slug: string): Promise<Vacancy | null> {
    const vacancy = MOCK_VACANCIES.find((v) => v.slug === slug);
    return vacancy || null;
  }

  async search(query: string, category?: string, modality?: string): Promise<Vacancy[]> {
    let results = MOCK_VACANCIES;
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.companyName.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }
    if (category && category !== 'Todas') {
      results = results.filter((v) => v.category === category);
    }
    if (modality && modality !== 'Todas') {
      results = results.filter((v) => v.modality === modality);
    }
    return results;
  }
}
