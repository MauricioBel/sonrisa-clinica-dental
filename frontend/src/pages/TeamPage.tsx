import { Clock } from 'lucide-react';
import { Seo } from '../components/Seo.tsx';
import { SectionTitle } from '../components/ui/SectionTitle.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Skeleton, ErrorMessage } from '../components/ui/Feedback.tsx';
import { useDentists } from '../hooks/useDentists.ts';
import { dayName, dayNameShort } from '../lib/format.ts';
import type { Dentist } from '../types/index.ts';

function DentistSchedule({ dentist }: { dentist: Dentist }) {
  if (dentist.businessHours.length === 0) {
    return <p className="text-sm text-slate-500">Horarios por confirmar.</p>;
  }

  return (
    <dl className="space-y-1.5">
      {dentist.businessHours.map((hour) => (
        <div key={hour.id} className="flex items-center justify-between gap-3 text-sm">
          <dt className="flex items-center gap-2 text-slate-600">
            <Clock className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            <span>
              {hour.dayOfWeek === 0
                ? 'Domingo'
                : `${dayName(hour.dayOfWeek)}${hour.dayOfWeek === 6 ? ' (sábado)' : ''}`}
            </span>
          </dt>
          <dd className="font-medium text-slate-800">
            {hour.openTime} – {hour.closeTime}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TeamPage() {
  const { data: dentists, loading, error } = useDentists();

  return (
    <>
      <Seo
        title="Equipo profesional"
        description="Conoce a nuestros odontólogos especialistas: implantes, ortodoncia, estética dental y odontopediatría en Providencia, Santiago."
        path="/equipo"
      />

      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            level="h1"
            eyebrow="Equipo profesional"
            title="Especialistas que cuidan tu sonrisa"
            description="Cada profesional de nuestro equipo está certificado y en formación continua para entregarte la mejor atención."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {dentists && !error && (
          <div className="grid gap-6 md:grid-cols-2">
            {dentists.map((dentist) => (
              <Card key={dentist.id} className="flex flex-col overflow-hidden sm:flex-row">
                <div className="sm:w-52 sm:shrink-0">
                  <img
                    src={dentist.imageUrl}
                    alt={`Retrato de ${dentist.name}, ${dentist.role}`}
                    loading="lazy"
                    className="h-full min-h-40 w-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h2 className="font-display text-xl font-bold text-brand-950">{dentist.name}</h2>
                  <p className="text-sm font-semibold text-brand-700">{dentist.role}</p>
                  <p className="mt-1 text-sm text-slate-500">{dentist.specialty}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{dentist.description}</p>
                  <p className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                    {dentist.experienceYears} años de experiencia
                  </p>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Horarios de atención
                      </p>
                      <span className="text-xs text-slate-500">
                        {dentist.businessHours.map((h) => dayNameShort(h.dayOfWeek)).filter(Boolean).slice(0, 3).join(' · ')}
                      </span>
                    </div>
                    <DentistSchedule dentist={dentist} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-950">
            ¿Quieres que te atienda un especialista?
          </h2>
          <Button to="/agendar-hora" size="lg" className="mt-6">
            Agendar con un especialista
          </Button>
        </div>
      </section>
    </>
  );
}