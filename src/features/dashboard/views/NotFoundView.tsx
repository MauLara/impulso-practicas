import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="bg-primary-50 text-primary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404 - Página no encontrada</h1>
      <p className="text-slate-600 max-w-md mx-auto text-base">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div>
        <Link
          to="/"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md transition-all inline-block"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};
