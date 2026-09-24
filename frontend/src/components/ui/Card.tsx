import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className = '', interactive = false, ...props }: CardProps) {
  const base = 'card';
  const interactiveClasses = interactive
    ? 'transition hover:shadow-md hover:-translate-y-0.5'
    : '';
  return (
    <div className={`${base} ${interactiveClasses} ${className}`} {...props} />
  );
}