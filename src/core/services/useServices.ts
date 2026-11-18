import { useContext } from 'react';
import { ServicesContext, ServicesContextType } from './ServicesContext';

export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices debe ser usado dentro de un ServicesProvider');
  }
  return context;
};
