import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';

const DashboardView = lazy(() =>
  import('../../features/dashboard/views/DashboardView').then((m) => ({ default: m.DashboardView }))
);
const VacanciesExplorationView = lazy(() =>
  import('../../features/vacancies/components/views/VacanciesExplorationView').then((m) => ({
    default: m.VacanciesExplorationView,
  }))
);
const VacancyDetailView = lazy(() =>
  import('../../features/vacancies/components/views/VacancyDetailView').then((m) => ({
    default: m.VacancyDetailView,
  }))
);
const CompaniesDirectoryView = lazy(() =>
  import('../../features/companies/components/views/CompaniesDirectoryView').then((m) => ({
    default: m.CompaniesDirectoryView,
  }))
);
const ComoFuncionaView = lazy(() =>
  import('../../features/home/views/ComoFuncionaView').then((m) => ({
    default: m.ComoFuncionaView,
  }))
);
const MisPostulacionesView = lazy(() =>
  import('../../features/applications/views/MisPostulacionesView').then((m) => ({
    default: m.MisPostulacionesView,
  }))
);
const NotFoundView = lazy(() =>
  import('../../features/dashboard/views/NotFoundView').then((m) => ({ default: m.NotFoundView }))
);

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardView />} />
            <Route path="/practicas" element={<VacanciesExplorationView />} />
            <Route path="/practicas/:slug" element={<VacancyDetailView />} />
            <Route path="/empresas" element={<CompaniesDirectoryView />} />
            <Route path="/como-funciona" element={<ComoFuncionaView />} />
            <Route path="/mis-postulaciones" element={<MisPostulacionesView />} />
            <Route path="*" element={<NotFoundView />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
