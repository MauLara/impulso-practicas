import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building2, ArrowRight, Star, Sparkles } from 'lucide-react';
import { useServices } from '../../../core/services/useServices';
import { Vacancy } from '../../vacancies/types/vacancy.types';
import { Company } from '../../companies/types/company.types';

export const DashboardView: React.FC = () => {
  const { vacancyRepository, companyRepository } = useServices();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([vacancyRepository.getAll(), companyRepository.getAll()])
      .then(([vData, cData]) => {
        setVacancies(vData.slice(0, 3));
        setCompanies(cData.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [vacancyRepository, companyRepository]);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium text-primary-100 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            La plataforma líder de vinculación profesional y prácticas
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto">
            Impulsa tu carrera profesional con las mejores <span className="text-amber-300">prácticas formativas</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto font-light">
            Conectamos estudiantes talentosos con empresas innovadoras. Encuentra tu próxima gran oportunidad de aprendizaje y crecimiento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/practicas"
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              Explorar Vacantes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/empresas"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              Ver Empresas
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="bg-primary-50 text-primary-600 p-4 rounded-xl">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">+150 Vacantes</p>
              <p className="text-sm text-slate-500">Actualizadas semanalmente</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="bg-secondary-50 text-secondary-600 p-4 rounded-xl">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">+50 Empresas</p>
              <p className="text-sm text-slate-500">Líderes en tecnología y servicios</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="bg-amber-50 text-amber-600 p-4 rounded-xl">
              <Star className="w-8 h-8" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">94% Éxito</p>
              <p className="text-sm text-slate-500">Estudiantes contratados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vacancies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Oportunidades Destacadas</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Prácticas profesionales recientes</h2>
          </div>
          <Link
            to="/practicas"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Ver todas las vacantes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-pulse h-64"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {vacancy.category}
                    </span>
                    <span className="text-xs text-slate-500">{vacancy.postedDate}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{vacancy.title}</h3>
                    <p className="text-sm text-slate-600 font-medium">{vacancy.companyName}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg">{vacancy.location}</span>
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg">{vacancy.modality}</span>
                  </div>
                  <p className="text-xs font-semibold text-secondary-600">{vacancy.stipend}</p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{vacancy.duration}</span>
                  <Link
                    to={`/practicas/${vacancy.slug}`}
                    className="bg-primary-50 hover:bg-primary-600 hover:text-white text-primary-700 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Alianzas Estratégicas</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Empresas que confían en nosotros</h2>
          </div>
          <Link
            to="/empresas"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Ver directorio completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-100"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{company.name}</h3>
                    <p className="text-xs text-slate-500">{company.industry}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{company.description}</p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {company.activeVacanciesCount} vacantes activas
                </span>
                <Link
                  to="/empresas"
                  className="text-xs font-semibold text-slate-700 hover:text-primary-600 transition-colors"
                >
                  Saber más &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
