import { createContext } from 'react';
import { IVacancyRepository } from '../../features/vacancies/services/IVacancyRepository';
import { ICompanyRepository } from '../../features/companies/services/ICompanyRepository';
import { IApplicationRepository } from '../../features/applications/services/IApplicationRepository';

export interface ServicesContextType {
  vacancyRepository: IVacancyRepository;
  companyRepository: ICompanyRepository;
  applicationRepository: IApplicationRepository;
}

export const ServicesContext = createContext<ServicesContextType | null>(null);
