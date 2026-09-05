import {
  Award,
  CalendarCheck,
  Clock,
  HeartPulse,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import { Hero } from '../components/Hero.tsx';
import { SectionTitle } from '../components/ui/SectionTitle.tsx';
import { TreatmentList } from '../components/TreatmentCard.tsx';
import { useTreatments } from '../hooks/useTreatments.ts';
import { useDentists } from '../hooks/useDentists.ts';
import { Seo } from '../components/Seo.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { WHATSAPP_LINK } from '../lib/constants.ts';

const BENEFITS = [
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
    title: 'Bioprotección total',
    description:
      'Protocolos de esterilización certificados y materiales de primer nivel en cada atención.',
  },
  {
    icon: <Sparkles className="h-6 w-6" aria-hidden="true" />,
    title: 'Tecnología avanzada',
    description:
      'Diagnóstico digital, radiografía de baja radiación y planificación 3D de tratamientos.',
  },
  {
    icon: <Clock className="h-6 w-6" aria-hidden="true" />,
    title: 'Horarios flexibles',
    description:
      'Atención de lunes a sábado con horario extendido. Agenda online en menos de un minuto.',
  },
  {
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
    title: 'Equipo especializado',
    description:
      'Especialistas en ortodoncia, implantes, estética dental y odontopediatría.',
  },
  {
    icon: <HeartPulse className="h-6 w-6" aria-hidden="true" />,
    title: 'Atención cercana',
    description:
      'Tratamientos sin dolor, con presupuesto claro y seguimiento personalizado.',
  },
  {
    icon: <Award className="h-6 w-6" aria-hidden="true" />,
    title: 'Garantía de calidad',
    description:
      'Todos nuestros tratamientos incluyen controles de seguimiento incluidos.',
  },
];

const TESTIMONIALS = [
  {
    name: 'María José Contreras',
    treatment: 'Blanqueamiento dental',
    quote:
      'Excelente atención. Me explicaron todo el proceso antes de empezar y el resultado fue mucho mejor de lo que esperaba.',
  },
  {
    name: 'Felipe Aravena',
    treatment: 'Implante dental',
    quote:
      'Muy profesionales y cero dolor. La planificación digital me dio total confianza antes de la cirugía.',
  },
  {
    name: 'Catalina Núñez',
    treatment: 'Ortodoncia con alineadores',
    quote:
      'Después de 18 meses de tratamiento, mi sonrisa cambió por completo. El equipo siempre estuvo disponible para consultas.',
  },
];

export function HomePage() {
  const treatments = useTreatments();
  const dentists = useDentists();

  const featuredTreatments = (treatments.data ?? [])
    .filter((t) => t.isFeatured)
    .slice(0, 3);

  const featuredDentists = (dentists.data ?? []).slice(0, 3);

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness'],
    name: 'Sonrisa Clínica Dental',
    image: `${import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'}/og-image.png`,
    url: `${import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'}/`,
    telephone: '+56987654321',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Providencia 1234, of. 502',
      addressLocality: 'Providencia',
      addressRegion: 'Santiago',
      addressCountry: 'CL',
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-19:00, Sa 09:00-14:00',
    sameAs: [WHATSAPP_LINK],
  };

  return (
    <>
      <Seo
        title="Dentistas en Santiago de Chile"
        description="Sonrisa Clínica Dental: ortodoncia, implantes, blanqueamiento y diseño de sonrisa en Providencia, Santiago. Agenda tu hora online."
        path="/"
        jsonLd={localBusinessJsonLd}
      />

      <Hero
        eyebrow="Clínica dental en Providencia, Santiago"
        title={
          <>
            Una sonrisa saludable{' '}
            <span className="text-brand-600">empieza aquí</span>
          </>
        }
        description="En Sonrisa Clínica Dental combinamos tecnología de vanguardia con un equipo de especialistas para darte la mejor atención. Agenda tu primera consulta hoy."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-14">
        <SectionTitle
          eyebrow="Beneficios"
          title="Cuidamos cada detalle de tu sonrisa"
          description="Estos son los motivos por los que más de 5.000 pacientes confían en nosotros cada año."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <Card key={benefit.title} className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                {benefit.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-brand-950">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Tratamientos"
            title="Tratamientos destacados"
            description="Conoce algunos de los tratamientos más solicitados por nuestros pacientes."
          />
          <div className="mt-10">
            <TreatmentList
              treatments={featuredTreatments}
              loading={treatments.loading}
              error={treatments.error}
            />
          </div>
          <div className="mt-10 text-center">
            <Button to="/tratamientos" variant="outline" size="lg">
              Ver todos los tratamientos
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              align="left"
              eyebrow="¿Por qué elegirnos?"
              title="Tecnología y calidez en cada consulta"
            />
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Desde 2009 acompañamos a familias de Santiago con una odontología
              preventiva y estética de excelencia. Nuestro compromiso es que
              cada visita sea una experiencia tranquila y transparente.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Presupuestos claros antes de iniciar cualquier tratamiento',
                'Pagos en cuotas y convenios con las principales clínicas',
                'Certificación de bioseguridad vigente',
                'Atención para pacientes adultos y niños',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/nosotros" size="lg">
                Conócenos
              </Button>
              <Button to="/contacto" variant="outline" size="lg">
                Contáctanos
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredDentists.map((dentist) => (
              <Card key={dentist.id} className="overflow-hidden">
                <img
                  src={dentist.imageUrl}
                  alt={`${dentist.name}, ${dentist.role}`}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold text-brand-950">
                    {dentist.name}
                  </h3>
                  <p className="text-xs text-slate-500">{dentist.specialty}</p>
                </div>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center bg-brand-900 p-6 text-center">
              <Smile className="h-10 w-10 text-brand-300" aria-hidden="true" />
              <p className="mt-3 font-display text-sm font-semibold text-white">
                Conoce a todo nuestro equipo
              </p>
              <Button to="/equipo" variant="secondary" className="mt-4">
                Ver equipo
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Testimonios"
            title="Lo que dicen nuestros pacientes"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <div className="mb-4 flex text-amber-400" role="img" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Smile key={i} className="h-4 w-4" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-sm italic leading-relaxed text-slate-700">
                  “{testimonial.quote}”
                </blockquote>
                <footer className="mt-4 border-t border-slate-100 pt-4">
                  <p className="font-display text-sm font-bold text-brand-950">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">{testimonial.treatment}</p>
                </footer>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-14">
        <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-center text-white shadow-lg sm:p-10">
          <CalendarCheck className="mx-auto h-12 w-12 text-brand-200" aria-hidden="true" />
          <h2 className="mt-4 font-display text-3xl font-bold">¿Listo para tu consulta?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Agenda tu hora online en menos de un minuto o escríbenos por WhatsApp
            y te responderemos a la brevedad.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/agendar-hora" variant="secondary" size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Agendar hora online
            </Button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#167D3F] px-6 py-3 text-base font-semibold text-white hover:bg-[#137638] min-h-[48px]"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}