import { Clock } from 'lucide-react';

export interface BusinessHoursEntry {
  days: string;
  hours: string;
}

export function BusinessHours({ hours }: { hours: BusinessHoursEntry[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm">
      {hours.map((entry) => (
        <li key={entry.days} className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span>
            <span className="block font-medium text-slate-800">{entry.days}</span>
            <span className="text-slate-500">{entry.hours}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}