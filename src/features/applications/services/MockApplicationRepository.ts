import { IApplicationRepository } from './IApplicationRepository';
import { Application } from '../types/application.types';

const STORAGE_KEY = 'impulsopracticas_applications';

const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    vacancyId: '1',
    vacancyTitle: 'Frontend Developer Intern (React & TypeScript)',
    companyName: 'TechNova Solutions',
    applicantName: 'Ana García',
    applicantEmail: 'ana.garcia@student.edu',
    status: 'En Revisión',
    appliedAt: 'Hace 1 día',
    vacancy: {
      id: '1',
      slug: 'frontend-developer-intern-technova',
      title: 'Frontend Developer Intern (React & TypeScript)',
      companyName: 'TechNova Solutions',
      location: 'Madrid, España',
      modality: 'Híbrido',
      stipend: '900€ - 1.200€ / mes',
      duration: '6 meses',
      category: 'Desarrollo Software',
    }
  },
];

export class MockApplicationRepository implements IApplicationRepository {
  private getStorage(): Application[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_APPLICATIONS));
        return DEFAULT_APPLICATIONS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_APPLICATIONS;
    }
  }

  private saveStorage(apps: Application[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    } catch {
      // ignore
    }
  }

  async getAll(): Promise<Application[]> {
    return this.getStorage();
  }

  async create(data: Omit<Application, 'id' | 'appliedAt' | 'status'> & { vacancy?: Application['vacancy'] }): Promise<Application> {
    const apps = this.getStorage();
    const newApp: Application = {
      ...data,
      id: `app-${Date.now()}`,
      status: 'En Revisión',
      appliedAt: 'Justo ahora',
    };
    apps.unshift(newApp);
    this.saveStorage(apps);
    return newApp;
  }

  async withdraw(id: string): Promise<void> {
    let apps = this.getStorage();
    apps = apps.filter((app) => app.id !== id);
    this.saveStorage(apps);
  }
}
