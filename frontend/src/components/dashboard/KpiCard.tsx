import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeType?: 'success' | 'warning' | 'info';
  icon: LucideIcon;
}

export function KpiCard({ title, value, subtitle, badgeText, badgeType = 'info', icon: Icon }: KpiCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-muted truncate">{title}</p>
          <p className="mt-1 font-display text-3xl font-bold text-primary tabular-nums">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-secondary">{subtitle}</p>
          )}
          {badgeText && (
            <span className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border badge-${badgeType}`}>
              {badgeText}
            </span>
          )}
        </div>
        <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-secondary shrink-0">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}