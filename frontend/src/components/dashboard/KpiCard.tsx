import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeType?: 'success' | 'warning' | 'info';
  icon: LucideIcon;
}

const badgeStyles: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
};

export function KpiCard({ title, value, subtitle, badgeText, badgeType = 'info', icon: Icon }: KpiCardProps) {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
          <p className="mt-1 font-display text-3xl font-bold text-slate-900 tabular-nums">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
          {badgeText && (
            <span
              className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                badgeStyles[badgeType]
              }`}
            >
              {badgeText}
            </span>
          )}
        </div>
        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}