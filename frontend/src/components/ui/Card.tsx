import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className = '', interactive = false, ...props }: CardProps) {
  const base = 'rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70';
  const interactiveClasses = interactive
    ? 'transition hover:shadow-md hover:-translate-y-0.5'
    : '';
  return (
    <div className={`${base} ${interactiveClasses} ${className}`} {...props} />
  );
}