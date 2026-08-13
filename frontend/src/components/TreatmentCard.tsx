import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { Card } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Skeleton, ErrorMessage } from './ui/Feedback.tsx';
import { formatCLP } from '../lib/format.ts';
import type { Treatment } from '../types/index.ts';

interface TreatmentCardProps {
  treatment: Treatment;
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-brand-50">
        <img
          src={treatment.imageUrl}
          alt={`Ilustración del tratamiento ${treatment.name}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {treatment.isFeatured && (
          <Badge variant="accent" className="absolute left-3 top-3">
            Destacado
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-brand-950">
          {treatment.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {treatment.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {treatment.durationMinutes} min
          </span>
          <span className="font-display text-sm font-bold text-brand-800">
            {formatCLP(treatment.price)}
          </span>
        </div>
        <Link
          to={`/tratamientos/${treatment.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
        >
          Ver detalles
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

export function TreatmentCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-9 w-full" />
      </div>
    </Card>
  );
}

export function TreatmentList({
  treatments,
  loading,
  error,
}: {
  treatments: Treatment[] | null;
  loading: boolean;
  error: string | null;
}) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <TreatmentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!treatments || treatments.length === 0) {
    return (
      <p className="py-8 text-center text-slate-500">
        Aún no hay tratamientos publicados.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {treatments.map((treatment) => (
        <TreatmentCard key={treatment.id} treatment={treatment} />
      ))}
    </div>
  );
}

export function BenefitList({ benefits }: { benefits: string[] }) {
  return (
    <ul className="space-y-2">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex items-start gap-2 text-sm text-slate-600">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100">
            <Check className="h-3.5 w-3.5 text-brand-700" aria-hidden="true" />
          </span>
          {benefit}
        </li>
      ))}
    </ul>
  );
}