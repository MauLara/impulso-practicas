import React, { useMemo } from 'react';
import { ServicesContext, ServicesContextType } from './ServicesContext';
import { MockVacancyRepository } from '../../features/vacancies/services/MockVacancyRepository';
import { MockCompanyRepository } from '../../features/companies/services/MockCompanyRepository';
import { MockApplicationRepository } from '../../features/applications/services/MockApplicationRepository';

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const services: ServicesContextType = useMemo(
    () => ({
      vacancyRepository: new MockVacancyRepository(),
      companyRepository: new MockCompanyRepository(),
      applicationRepository: new MockApplicationRepository(),
    }),
    []
  );

  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
};
