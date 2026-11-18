import React, { useEffect, useState } from 'react';
import { MapPin, Globe, CheckCircle2, Briefcase, Plus, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useServices } from '../../../../core/services/useServices';
import { useToast } from '../../../../context/ToastContext';
import { Company } from '../../types/company.types';
import { Vacancy } from '../../../vacancies/types/vacancy.types';

export const CompaniesDirectoryView: React.FC = () => {
  const { companyRepository, vacancyRepository } = useServices();
  const { success } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('Desarrollo Software');
  const [modality, setModality] = useState<'Remoto' | 'Híbrido' | 'Presencial'>('Remoto');
  const [stipend, setStipend] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('6 meses');
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [urgent, setUrgent] = useState(false);

  const [createdVacancy, setCreatedVacancy] = useState<Vacancy | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    companyRepository.getAll()
      .then((data) => {
        setCompanies(data);
        if (data.length > 0) {
          setCompanyName(data[0].name);
        }
      })
      .finally(() => setLoading(false));
  }, [companyRepository]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !companyName || !description) return;

    setSubmitting(true);
    const requirements = requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    const responsibilities = responsibilitiesText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    vacancyRepository
      .createVacancy({
        title,
        companyName,
        category,
        modality,
        stipend: stipend || 'A convenir',
        location: location || 'España',
        duration,
        description,
        requirements: requirements.length > 0 ? requirements : ['Estudiante universitario o afín.', 'Ganas de aprender y aportar.'],
        responsibilities: responsibilities.length > 0 ? responsibilities : ['Apoyo en proyectos del área.', 'Colaboración en equipo.'],
        urgent,
      })
      .then((newVacancy) => {
        setCreatedVacancy(newVacancy);
        success('¡Práctica profesional publicada con éxito!');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setStipend('');
    setLocation('');
    setRequirementsText('');
    setResponsibilitiesText('');
    setCreatedVacancy(null);
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-3">
          <span className="bg-primary-800 text-primary-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Portal B2B Empresas
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Directorio de Empresas y Publicación de Prácticas</h1>
          <p className="text-primary-100 max-w-2xl text-sm sm:text-base">
            Organizaciones líderes que confían en ImpulsoPrácticas. Publica nuevas vacantes y atrae al mejor talento joven.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white hover:bg-primary-50 text-primary-900 font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 text-sm"
        >
          <Plus className="w-5 h-5 text-primary-600" /> Publicar Práctica Profesional
        </button>
      </div>

      {/* Companies Grid */}
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

      {/* Publish Vacancy Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 my-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleResetForm}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {createdVacancy ? (
              <div className="text-center space-y-6 py-6">
                <div className="bg-emerald-50 text-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">¡Práctica publicada con éxito!</h3>
                  <p className="text-sm text-slate-500">
                    Tu vacante ya se encuentra visible en el explorador principal y en los destacados de la plataforma.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-1">
                  <span className="text-xs font-bold text-primary-600 uppercase">{createdVacancy.category}</span>
                  <h4 className="font-bold text-slate-900">{createdVacancy.title}</h4>
                  <p className="text-xs text-slate-500">{createdVacancy.companyName} • {createdVacancy.location} ({createdVacancy.modality})</p>
                </div>
                <div className="flex gap-4 pt-4">
                  <Link
                    to={`/practicas/${createdVacancy.slug}`}
                    onClick={handleResetForm}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl text-center text-sm shadow transition-all flex items-center justify-center gap-2"
                  >
                    Ver vacante publicada <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Portal B2B</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Publicar Nueva Práctica Profesional</h3>
                  <p className="text-sm text-slate-500">Completa los datos de la vacante para recibir candidaturas de estudiantes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Título de la práctica *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Frontend Developer Intern (React)"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Empresa aliada *</label>
                    <select
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    >
                      {companies.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                      <option value="Otra Empresa Aliada">Otra Empresa Aliada</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Área / Carrera</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    >
                      <option value="Desarrollo Software">Desarrollo Software</option>
                      <option value="Diseño UX/UI">Diseño UX/UI</option>
                      <option value="Datos e IA">Datos e IA</option>
                      <option value="Marketing y Ventas">Marketing y Ventas</option>
                      <option value="Finanzas y Administración">Finanzas y Administración</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Modalidad</label>
                    <select
                      value={modality}
                      onChange={(e) => setModality(e.target.value as 'Remoto' | 'Híbrido' | 'Presencial')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    >
                      <option value="Remoto">Remoto</option>
                      <option value="Híbrido">Híbrido</option>
                      <option value="Presencial">Presencial</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Ubicación</label>
                    <input
                      type="text"
                      placeholder="Ej. Madrid, España"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Apoyo económico (Beca)</label>
                    <input
                      type="text"
                      placeholder="Ej. 900€ - 1.200€ / mes"
                      value={stipend}
                      onChange={(e) => setStipend(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Duración</label>
                    <input
                      type="text"
                      placeholder="Ej. 6 meses"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Descripción de la práctica *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Detalla los objetivos, tecnologías y proyecto en el que participará el estudiante..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Requisitos (un requisito por línea)</label>
                    <textarea
                      rows={2}
                      placeholder="Estudiante de Ingeniería Informática&#10;Conocimientos en React y TypeScript"
                      value={requirementsText}
                      onChange={(e) => setRequirementsText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Responsabilidades (una por línea)</label>
                    <textarea
                      rows={2}
                      placeholder="Desarrollar componentes frontend&#10;Participar en reuniones ágiles"
                      value={responsibilitiesText}
                      onChange={(e) => setResponsibilitiesText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 sm:col-span-2 pt-2">
                    <input
                      type="checkbox"
                      id="urgent"
                      checked={urgent}
                      onChange={(e) => setUrgent(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                    />
                    <label htmlFor="urgent" className="text-sm font-semibold text-slate-700">
                      Marcar como vacante urgente / destacada
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl text-sm shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? 'Publicando...' : 'Publicar Práctica'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
