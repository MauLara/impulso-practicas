import React from 'react';
import { ServicesProvider } from './core/services/ServicesProvider';
import { AppRouter } from './core/router/AppRouter';

export const App: React.FC = () => {
  return (
    <ServicesProvider>
      <AppRouter />
    </ServicesProvider>
  );
};

export default App;
