import React from 'react';
import { ServicesProvider } from './core/services/ServicesProvider';
import { ToastProvider } from './context/ToastContext';
import { AppRouter } from './core/router/AppRouter';

export const App: React.FC = () => {
  return (
    <ServicesProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </ServicesProvider>
  );
};

export default App;
