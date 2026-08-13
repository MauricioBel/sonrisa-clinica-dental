import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, Clock, Stethoscope } from 'lucide-react';
import { Seo } from '../components/Seo.tsx';
import { useTreatment } from '../hooks/useTreatments.ts';
import { BenefitList } from '../components/TreatmentCard.tsx';
import { Button } from '../components/ui/Button.tsx';
import { ErrorMessage, Skeleton } from '../components/ui/Feedback.tsx';
import { Card } from '../components/ui/Card.tsx';
import { formatCLP } from '../lib/format.ts';
import { WHATSAPP_LINK } from '../lib/constants.ts';

export function TreatmentDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data: treatment, loading, error } = useTreatment(slug);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-40" />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !treatment) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorMessage message={error ?? 'Tratamiento no encontrado.'} />
        <Button to="/tratamientos" variant="outline" className="mt-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a tratamientos
        </Button>
      </section>
    );
  }

  const bookPath = `/agendar-hora?tratamiento=${treatment.slug}`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Tratamientos',
        item: `${import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'}/tratamientos`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: treatment.name,
        item: `${import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'}${bookPath.replace(/[?].*$/, '')}`,
      },
    ],
  };

  return (
    <>
      <Seo
        title={treatment.name}
        description={treatment.shortDescription}
        path={`/tratamientos/${treatment.slug}`}
        type="article"
        image={treatment.imageUrl}
        jsonLd={breadcrumbJsonLd}
      />

      <section className="bg-brand-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/tratamientos"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a tratamientos
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <img
              src={treatment.imageUrl}
              alt={`Ilustración del tratamiento ${treatment.name}`}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm ring-1 ring-slate-200"
            />
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">
              {treatment.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {treatment.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <span className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm text-brand-900">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {treatment.durationMinutes} minutos por sesión
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm text-brand-900">
                <Stethoscope className="h-4 w-4" aria-hidden="true" />
                Precio referencial
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-brand-50 px-5 py-4">
              <p className="text-sm text-slate-500">Desde</p>
              <p className="font-display text-3xl font-bold text-brand-800">
                {formatCLP(treatment.price)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Valor referencial por sesión. La evaluación inicial está incluida.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={bookPath} size="lg">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar este tratamiento
              </Button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#167D3F] px-6 py-3 text-base font-semibold text-white hover:bg-[#137638]"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="font-display text-xl font-bold text-brand-950">
              Beneficios del tratamiento
            </h2>
            <div className="mt-4">
              <BenefitList benefits={treatment.benefits} />
            </div>
          </Card>

          <Card className="bg-brand-900 p-6 text-white">
            <h2 className="font-display text-xl font-bold">¿Cómo agendar?</h2>
            <ol className="mt-4 space-y-3 text-sm text-brand-100">
              <li>1. Elige una fecha y horario disponible.</li>
              <li>2. Completa tus datos de contacto.</li>
              <li>3. Recibirás la confirmación al instante.</li>
              <li>4. ¿Tienes dudas? Escríbenos por WhatsApp.</li>
            </ol>
            <Button to={bookPath} variant="secondary" className="mt-6 w-full">
              Agendar ahora
            </Button>
          </Card>
        </div>
      </section>
    </>
  );
}