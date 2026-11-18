import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building2, Calendar, MapPin, DollarSign, Trash2, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useServices } from '../../../core/services/useServices';
import { Application } from '../types/application.types';

export const MisPostulacionesView: React.FC = () => {
  const { applicationRepository } = useServices();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = () => {
    setLoading(true);
    applicationRepository.getAll()
      .then(setApplications)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, [applicationRepository]);

  const handleWithdraw = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de que deseas retirar tu postulación a "${title}"?`)) {
      applicationRepository.withdraw(id).then(() => {
        fetchApplications();
      });
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'Aceptada':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aceptada
          </span>
        );
      case 'Entrevista':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Calendar className="w-3.5 h-3.5" /> Entrevista técnica
          </span>
        );
      case 'En Revisión':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5" /> En revisión
          </span>
        );
      case 'Pendiente':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pendiente
          </span>
        );
      case 'Rechazada':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" /> No seleccionada
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mis Postulaciones</h1>
          <p className="text-slate-500 mt-1">
            Realiza el seguimiento del estado de tus candidaturas a prácticas profesionales.
          </p>
        </div>
        <Link
          to="/practicas"
          className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all inline-flex items-center gap-2 self-start md:self-auto"
        >
          Explorar más prácticas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">Cargando tus postulaciones...</div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto">
          <div className="bg-primary-50 text-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No tienes postulaciones activas</h3>
          <p className="text-slate-500 text-sm">
            Explora nuestro catálogo de vacantes y postúlate a las prácticas que mejor se adapten a tu perfil.
          </p>
          <Link
            to="/practicas"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow transition-all"
          >
            Ver catálogo de prácticas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    {getStatusBadge(app.status)}
                    <span className="text-xs text-slate-400">Postulado {app.appliedAt}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">{app.vacancyTitle}</h3>
                  <p className="text-primary-600 font-semibold text-sm flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> {app.companyName}
                  </p>
                </div>

                <button
                  onClick={() => handleWithdraw(app.id, app.vacancyTitle)}
                  className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl text-sm font-semibold transition-colors self-start sm:self-auto border border-transparent hover:border-rose-100"
                  title="Retirar postulación"
                >
                  <Trash2 className="w-4 h-4" /> Retirar postulación
                </button>
              </div>

              {/* Vacancy extra info if available */}
              {app.vacancy && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 font-medium block">Ubicación</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-primary-600" /> {app.vacancy.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Modalidad</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-primary-600" /> {app.vacancy.modality}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Duración</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-primary-600" /> {app.vacancy.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Estipendio</span>
                    <span className="font-semibold text-secondary-600 flex items-center gap-1 mt-0.5">
                      <DollarSign className="w-3.5 h-3.5 text-secondary-600" /> {app.vacancy.stipend}
                    </span>
                  </div>
                </div>
              )}

              {/* Footer actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span>Candidato: <strong className="text-slate-700">{app.applicantName}</strong> ({app.applicantEmail})</span>
                {app.vacancy?.slug && (
                  <Link
                    to={`/practicas/${app.vacancy.slug}`}
                    className="font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                  >
                    Ver detalles de vacante <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
