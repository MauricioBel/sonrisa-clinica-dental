import type { ReactNode } from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  level?: 'h1' | 'h2';
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  level = 'h2',
}: SectionTitleProps) {
  const Heading = level;
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>
      )}
    </div>
  );
}

export interface IconFeature {
  icon: ReactNode;
  title: string;
  description: string;
}