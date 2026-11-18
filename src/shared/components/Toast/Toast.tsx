import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { tx } from '@twind/core';
import { ToastMessage } from '../../../context/ToastContext';

interface ToastItemProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  return (
    <div
      className={tx(
        'pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-xl border text-sm font-medium transition-all transform translate-y-0 opacity-100',
        toast.type === 'success' && 'bg-emerald-50 border-emerald-200 text-emerald-900',
        toast.type === 'info' && 'bg-primary-50 border-primary-200 text-primary-900',
        toast.type === 'warning' && 'bg-amber-50 border-amber-200 text-amber-900'
      )}
    >
      <div className="flex items-center gap-3">
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-primary-600 shrink-0" />}
        {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />}
        <span>{toast.message}</span>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="p-1 rounded-lg hover:bg-black/5 text-slate-500 hover:text-slate-800 transition-colors shrink-0"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
