import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Calendar, DollarSign, CheckCircle2, Send, Building2 } from 'lucide-react';
import { useServices } from '../../../../core/services/useServices';
import { Vacancy } from '../../types/vacancy.types';

export const VacancyDetailView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { vacancyRepository, applicationRepository } = useServices();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      vacancyRepository.getBySlug(slug)
        .then(setVacancy)
        .finally(() => setLoading(false));
    }
  }, [slug, vacancyRepository]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacancy || !applicantName || !applicantEmail) return;

    applicationRepository.create({
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      companyName: vacancy.companyName,
      applicantName,
      applicantEmail,
      vacancy: {
        id: vacancy.id,
        slug: vacancy.slug,
        title: vacancy.title,
        companyName: vacancy.companyName,
        location: vacancy.location,
        modality: vacancy.modality,
        stipend: vacancy.stipend,
        duration: vacancy.duration,
        category: vacancy.category,
      },
    }).then(() => {
      setApplied(true);
    });
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">Cargando detalles de la vacante...</div>;
  }

  if (!vacancy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Vacante no encontrada</h2>
        <p className="text-slate-500">La práctica que buscas no existe o ha sido dada de baja.</p>
        <button
          onClick={() => navigate('/practicas')}
          className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm"
        >
          Volver al explorador
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link to="/practicas" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700">
        <ArrowLeft className="w-4 h-4" /> Volver al explorador de vacantes
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                {vacancy.category}
              </span>
              <span className="text-xs text-slate-400">{vacancy.postedDate}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{vacancy.title}</h1>
            <p className="text-lg font-semibold text-primary-600 flex items-center gap-2">
              <Building2 className="w-5 h-5" /> {vacancy.companyName}
            </p>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Ubicación</span>
            <p className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-1"><MapPin className="w-4 h-4 text-primary-600" /> {vacancy.location}</p>
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Modalidad</span>
            <p className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-1"><Briefcase className="w-4 h-4 text-primary-600" /> {vacancy.modality}</p>
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Duración</span>
            <p className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-1"><Calendar className="w-4 h-4 text-primary-600" /> {vacancy.duration}</p>
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Beca / Estipendio</span>
            <p className="text-sm font-bold text-secondary-600 flex items-center gap-1 mt-1"><DollarSign className="w-4 h-4 text-secondary-600" /> {vacancy.stipend}</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Acerca de la práctica</h3>
          <p className="text-slate-600 leading-relaxed">{vacancy.description}</p>
        </div>

        {/* Responsibilities */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Responsabilidades principales</h3>
          <ul className="space-y-2">
            {vacancy.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Requisitos</h3>
          <ul className="space-y-2">
            {vacancy.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Section */}
        <div className="border-t border-slate-200 pt-8 mt-8">
          {applied ? (
            <div className="bg-secondary-50 border border-secondary-200 p-6 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-secondary-600 mx-auto" />
              <h4 className="text-lg font-bold text-secondary-900">¡Postulación enviada con éxito!</h4>
              <p className="text-sm text-secondary-700">La empresa revisará tu perfil y se pondrá en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Inscríbete a esta práctica</h3>
                <p className="text-sm text-slate-500">Completa tus datos para enviar tu candidatura directamente al reclutador.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Nombre completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ana García"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Correo electrónico académico</label>
                  <input
                    type="email"
                    required
                    placeholder="Ej. ana.garcia@student.edu"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 bg-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Enviar Candidatura
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
