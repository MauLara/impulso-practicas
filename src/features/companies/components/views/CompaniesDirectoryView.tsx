import React, { useEffect, useState } from 'react';
import { MapPin, Globe, CheckCircle2, Briefcase } from 'lucide-react';
import { useServices } from '../../../../core/services/useServices';
import { Company } from '../../types/company.types';

export const CompaniesDirectoryView: React.FC = () => {
  const { companyRepository } = useServices();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    companyRepository.getAll()
      .then(setCompanies)
      .finally(() => setLoading(false));
  }, [companyRepository]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-3xl p-8 text-white space-y-4 shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Directorio de Empresas Asociadas</h1>
        <p className="text-primary-100 max-w-2xl text-sm sm:text-base">
          Conoce a las organizaciones líderes que confían en ImpulsoPrácticas para incorporar talento joven en sus equipos de trabajo.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 4].map((n) => (
            <div key={n} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-pulse h-48"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-100" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
                        {company.verified && <CheckCircle2 className="w-4 h-4 text-primary-600 fill-primary-50" />}
                      </div>
                      <p className="text-xs text-primary-600 font-semibold">{company.industry}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{company.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {company.location}</span>
                  <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary-600 hover:underline"><Globe className="w-3.5 h-3.5" /> Sitio web</a>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> {company.activeVacanciesCount} vacantes activas
                </span>
                <span className="text-xs font-semibold text-primary-600 hover:text-primary-700 cursor-pointer">
                  Ver perfil corporativo &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
