import type { HTMLAttributes } from 'react';

type Variant = 'default' | 'accent' | 'neutral' | 'success' | 'warning' | 'danger';

const variants: Record<Variant, string> = {
  default: 'bg-brand-100 text-brand-900 dark:bg-brand-800 dark:text-brand-100',
  accent: 'bg-[#e0f2e9] text-[#1f7a5c] dark:bg-[#1f7a5c]/20 dark:text-[#86efac]',
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={`badge inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    />
  );
}