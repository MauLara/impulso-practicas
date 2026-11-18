import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useServices } from '../../../../core/services/useServices';
import { Vacancy } from '../../types/vacancy.types';

export const VacanciesExplorationView: React.FC = () => {
  const { vacancyRepository } = useServices();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [modality, setModality] = useState('Todas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    vacancyRepository
      .search(query, category, modality)
      .then(setVacancies)
      .finally(() => setLoading(false));
  }, [vacancyRepository, query, category, modality]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explorador de Vacantes</h1>
          <p className="text-slate-600 mt-2">
            Encuentra prácticas profesionales adaptadas a tus habilidades, intereses y modalidad preferida.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título, empresa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            >
              <option value="Todas">Todas las categorías</option>
              <option value="Desarrollo Software">Desarrollo Software</option>
              <option value="Diseño UX/UI">Diseño UX/UI</option>
              <option value="Datos e IA">Datos e IA</option>
            </select>
          </div>

          <div>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            >
              <option value="Todas">Todas las modalidades</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Presencial">Presencial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse h-32"></div>
          ))}
        </div>
      ) : vacancies.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="bg-primary-50 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No se encontraron vacantes</h3>
          <p className="text-slate-600 max-w-md mx-auto text-sm">
            Prueba ajustando los filtros de búsqueda o términos clave para encontrar más oportunidades.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {vacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {vacancy.category}
                  </span>
                  <span className="text-xs text-slate-500">{vacancy.postedDate}</span>
                  {vacancy.urgent && (
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Urgente
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{vacancy.title}</h2>
                  <p className="text-sm font-medium text-slate-600">{vacancy.companyName}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" /> {vacancy.location} ({vacancy.modality})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-slate-400" /> {vacancy.duration}
                  </span>
                  <span className="flex items-center gap-1 text-secondary-600 font-semibold">
                    <DollarSign className="w-4 h-4" /> {vacancy.stipend}
                  </span>
                </div>
              </div>

              <div>
                <Link
                  to={`/practicas/${vacancy.slug}`}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  Ver detalles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
