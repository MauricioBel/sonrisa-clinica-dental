import { Link } from 'react-router-dom';

interface LogoProps {
  footer?: boolean;
}

export function Logo({ footer = false }: LogoProps) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2"
      aria-label="Sonrisa Clínica Dental - Inicio"
    >
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill={footer ? '#eef7fc' : '#0f3d5e'} />
        <path
          d="M20 22c2-4 6-6 10-5 4 0 8 2 10 5 1 4-1 9-4 11-2 2-3 4-4 8h-4c-1-3-2-5-3-8-4-2-5-7-5-11z"
          fill="none"
          stroke={footer ? '#0f3d5e' : '#7fd0f0'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="18" r="2" fill={footer ? '#0f3d5e' : '#7fd0f0'} />
      </svg>
      <span className="leading-tight">
        <span
          className={`block font-display text-lg font-bold ${
            footer ? 'text-white' : 'text-brand-950'
          }`}
        >
          Sonrisa
        </span>
        <span
          className={`block text-xs font-medium tracking-wide ${
            footer ? 'text-brand-200' : 'text-brand-600'
          }`}
        >
          Clínica Dental
        </span>
      </span>
    </Link>
  );
}