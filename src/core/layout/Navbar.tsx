import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Briefcase, Building2, Home, GraduationCap, ClipboardList, HelpCircle } from 'lucide-react';
import { useServices } from '../../core/services/useServices';

export const Navbar: React.FC = () => {
  const { applicationRepository } = useServices();
  const [activeCount, setActiveCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    applicationRepository.getAll().then((apps) => {
      setActiveCount(apps.length);
    });
  }, [applicationRepository, location.pathname]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-50 text-primary-700 font-semibold'
        : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
    }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-600 text-white p-2 rounded-xl flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Impulso</span>
            <span className="text-lg font-bold text-primary-600 tracking-tight">Prácticas</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={getLinkClass} end>
            <Home className="w-4 h-4" />
            Inicio
          </NavLink>
          <NavLink to="/practicas" className={getLinkClass}>
            <Briefcase className="w-4 h-4" />
            Vacantes
          </NavLink>
          <NavLink to="/empresas" className={getLinkClass}>
            <Building2 className="w-4 h-4" />
            Empresas
          </NavLink>
          <NavLink to="/como-funciona" className={getLinkClass}>
            <HelpCircle className="w-4 h-4" />
            Cómo funciona
          </NavLink>
          <NavLink to="/mis-postulaciones" className={getLinkClass}>
            <ClipboardList className="w-4 h-4" />
            Mis Postulaciones
            {activeCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-primary-600 text-white">
                {activeCount}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/practicas"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-all hover:shadow"
          >
            Explorar Prácticas
          </Link>
        </div>
      </div>
    </header>
  );
};
