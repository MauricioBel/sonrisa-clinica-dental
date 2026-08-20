import type { ReactNode } from 'react';

export const inputStyles =
  'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200';

interface FormFieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string | undefined;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/** Campo de formulario reutilizable: etiqueta, contenido y mensaje de error. */
export function FormField({
  id,
  label,
  optional = false,
  error,
  hint,
  className = '',
  children,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
        {optional && <span className="font-normal text-slate-500"> (opcional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}