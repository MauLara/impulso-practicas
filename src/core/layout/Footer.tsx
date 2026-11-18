import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 text-white p-2 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-white text-lg font-bold">ImpulsoPrácticas</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Conectamos el talento universitario y de formación profesional con las empresas más innovadoras del mercado a través de experiencias de prácticas formativas de alto impacto.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/practicas" className="hover:text-white transition-colors">Explorar Vacantes</a></li>
              <li><a href="/empresas" className="hover:text-white transition-colors">Directorio de Empresas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">Política de Privacidad</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Términos y Condiciones</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Soporte Académico</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p>&copy; {new Date().getFullYear()} ImpulsoPrácticas. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 mt-4 sm:mt-0 text-slate-500">
            Hecho con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para el futuro profesional.
          </p>
        </div>
      </div>
    </footer>
  );
};
