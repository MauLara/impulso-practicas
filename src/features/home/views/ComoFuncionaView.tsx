import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown, ChevronUp, FileText, Users, Briefcase, Award, ArrowRight, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Tiene algún costo para los estudiantes?',
    answer: 'No, ImpulsoPrácticas es 100% gratuito para estudiantes y recién graduados. Nuestro modelo se financia a través de las empresas aliadas que buscan talento joven cualificado.',
  },
  {
    question: '¿Cuánto tiempo toma conseguir una práctica?',
    answer: 'En promedio, los estudiantes que completan nuestro proceso de optimización y mentoría reciben sus primeras entrevistas con empresas aliadas en menos de 14 días.',
  },
  {
    question: '¿Se requiere convenio de prácticas con la universidad?',
    answer: 'Sí, para las prácticas curriculares gestionamos y firmamos los convenios de cooperación educativa directamente con tu universidad o centro de formación profesional.',
  },
  {
    question: '¿Hay vacantes en modalidad remota, híbrida o presencial?',
    answer: '¡Sí! Contamos con una amplia variedad de vacantes adaptadas a tus necesidades geográficas y académicas: remoto nacional e internacional, formato híbrido y presencial.',
  },
];

export const ComoFuncionaView: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-primary-600" /> Metodología de Acompañamiento
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Cómo transformamos tu talento en tu <span className="text-primary-600">primera gran oportunidad</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Un programa integral diseñado por expertos de la industria para impulsarte desde la universidad hasta tu contratación en empresas líderes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/practicas"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            Explorar Prácticas <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/empresas"
            className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-3.5 rounded-2xl border border-slate-200 shadow-sm transition-all"
          >
            Soy Empresa
          </Link>
        </div>
      </div>

      {/* 4-Step Timeline */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">El Camino al Éxito en 4 Pasos</h2>
          <p className="text-slate-500">Un proceso estructurado para garantizar que destaques en cada etapa del proceso de selección.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 relative group">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center font-extrabold text-lg">
              01
            </div>
            <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Optimización de CV & LinkedIn</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Adaptamos tu currículum con palabras clave ATS y potenciamos tu perfil profesional en LinkedIn para atraer reclutadores top.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 relative group">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center font-extrabold text-lg">
              02
            </div>
            <div className="w-10 h-10 bg-secondary-50 text-secondary-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Simulación de Entrevistas</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Practica con entrevistas técnicas y de recursos humanos guiadas por mentores expertos, recibiendo feedback real y constructivo.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 relative group">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center font-extrabold text-lg">
              03
            </div>
            <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Postulación Prioritaria</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Conecta directamente con vacantes exclusivas en empresas aliadas sin pasar por filtros automatizados masivos.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 relative group">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center font-extrabold text-lg">
              04
            </div>
            <div className="w-10 h-10 bg-secondary-50 text-secondary-600 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Acompañamiento en Onboarding</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Te apoyamos durante tus primeros meses de práctica para asegurar una transición exitosa hacia tu contratación indefinida.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Section */}
      <div className="max-w-4xl mx-auto space-y-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Preguntas Frecuentes (FAQ)</h2>
          <p className="text-slate-500">Todo lo que necesitas saber sobre nuestro programa de vinculación profesional.</p>
        </div>

        <div className="space-y-4 pt-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 focus:outline-none"
                >
                  <span className="flex items-center gap-3 text-base sm:text-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />
                    {item.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-3xl p-10 sm:p-14 text-center text-white space-y-6 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">¿Listo para dar el siguiente gran paso?</h2>
        <p className="text-primary-100 max-w-xl mx-auto text-sm sm:text-base">
          Únete hoy a miles de estudiantes que ya están acelerando su carrera profesional con ImpulsoPrácticas.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/practicas"
            className="bg-white hover:bg-primary-50 text-primary-900 font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all"
          >
            Explorar Prácticas Abiertas
          </Link>
          <Link
            to="/empresas"
            className="bg-primary-800 hover:bg-primary-900 text-white font-semibold px-8 py-3.5 rounded-2xl border border-primary-600 transition-all"
          >
            Publicar Vacante (Empresas)
          </Link>
        </div>
      </div>
    </div>
  );
};
