import { Application } from '../types/application.types';

export interface IApplicationRepository {
  getAll(): Promise<Application[]>;
  create(application: Omit<Application, 'id' | 'appliedAt' | 'status'> & { vacancy?: Application['vacancy'] }): Promise<Application>;
  withdraw(id: string): Promise<void>;
}
