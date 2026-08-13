import type { HTMLAttributes } from 'react';

type Variant = 'default' | 'accent' | 'neutral';

const variants: Record<Variant, string> = {
  default: 'bg-brand-100 text-brand-900',
  accent: 'bg-[#e0f2e9] text-[#1f7a5c]',
  neutral: 'bg-slate-100 text-slate-700',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    />
  );
}