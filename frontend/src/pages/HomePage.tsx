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
import { useWhatsApp, useClinicaInfo } from '../hooks/useConfig.ts';

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

function getDentistAvatar(name: string): string {
  const femaleNames = ['valentina', 'camila', 'maría', 'paula', 'sofía', 'isabela', 'martina', 'lucia', 'antonia', 'emilia'];
  const lowerName = name.toLowerCase();
  const isFemale = femaleNames.some(fn => lowerName.includes(fn));

  const femaleAvatars = ['avatar-female1.webp', 'avatar-female2.webp', 'avatar-female3.webp', 'avatar-female4.webp'];
  const maleAvatars = ['avatar-male1.webp', 'avatar-male2.webp', 'avatar-male3.webp', 'avatar-male4.webp'];

  const avatars = isFemale ? femaleAvatars : maleAvatars;
  const index = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % avatars.length;
  return `/${avatars[index]}`;
}

export function HomePage() {
  const treatments = useTreatments();
  const dentists = useDentists();
  const { link: whatsappLink } = useWhatsApp();
  const { nombre, telefono, horario } = useClinicaInfo();

  const featuredTreatments = (treatments.data ?? [])
    .filter((t) => t.isFeatured)
    .slice(0, 3);

  const featuredDentists = (dentists.data ?? []);

  const dentistsWithAvatars = featuredDentists.map(dentist => ({
    ...dentist,
    imageUrl: getDentistAvatar(dentist.name),
  }));

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness'],
    name: nombre || 'Sonrisa Clínica Dental',
    image: `${import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'}/og-image.png`,
    url: `${import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'}/`,
    telephone: telefono?.replace(/\s/g, '') || '+56987654321',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Providencia 1234, of. 502',
      addressLocality: 'Providencia',
      addressRegion: 'Santiago',
      addressCountry: 'CL',
    },
    priceRange: '$$',
    openingHours: horario?.map((h: { dias: string; horas: string }) => `${h.dias} ${h.horas}`).join(', ') || 'Mo-Fr 09:00-19:00, Sa 09:00-14:00',
    sameAs: [whatsappLink],
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
            <span className="text-blue-600">empieza aquí</span>
          </>
        }
        description="En Sonrisa Clínica Dental combinamos tecnología de vanguardia con un equipo de especialistas para darte la mejor atención. Agenda tu primera consulta hoy."
      />

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Beneficios"
            title="Cuidamos cada detalle de tu sonrisa"
            description="Estos son los motivos por los que más de 5.000 pacientes confían en nosotros cada año."
          />
          <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:snap-none md:overflow-visible md:pb-0">
            {BENEFITS.map((benefit) => (
              <Card
                key={benefit.title}
                className="flex-shrink-0 w-[calc(100%-1rem)] md:w-full p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 rounded-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Tratamientos"
            title="Tratamientos destacados"
            description="Conoce algunos de los tratamientos más solicitados por nuestros pacientes."
          />
          <TreatmentList
              treatments={featuredTreatments}
              loading={treatments.loading}
              error={treatments.error}
            />
          <div className="mt-10 text-center">
            <Button
              to="/tratamientos"
              variant="outline"
              size="lg"
              className="min-h-[48px] border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
            >
              Ver todos los tratamientos
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              to="/nosotros"
              size="lg"
              className="min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
            >
              Conócenos
            </Button>
            <Button
              to="/contacto"
              size="lg"
              className="min-h-[48px] border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Nuestro Equipo"
            title="Especialistas a tu Servicio"
            description="Conoce a los profesionales que cuidan tu sonrisa con dedicación y experiencia."
          />
          <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {dentistsWithAvatars.map((dentist) => (
              <Card key={dentist.id} className="overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 rounded-xl bg-white">
                <div className="relative aspect-square bg-slate-100">
                  <img
                    src={dentist.imageUrl}
                    alt={`${dentist.name}, ${dentist.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-center rounded-2xl"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {dentist.name}
                  </h3>
                  <p className="mt-1 text-sm text-blue-600 font-medium">{dentist.specialty}</p>
                  <p className="mt-1 text-sm text-slate-500">{dentist.experienceYears} años de experiencia</p>
                  <a
                    key={dentist.id}
                    href={`${whatsappLink}&text=Hola, quisiera agendar una cita con ${encodeURIComponent(dentist.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors min-h-[44px]"
                  >
                    Agendar cita
                  </a>
                </div>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center bg-blue-50 p-6 text-center border border-blue-100 rounded-xl lg:col-span-3 md:col-span-2">
              <Smile className="h-10 w-10 text-blue-600" aria-hidden="true" />
              <p className="mt-3 font-display text-sm font-semibold text-slate-900">
                Conoce a todo nuestro equipo
              </p>
              <Button
                to="/equipo"
                size="lg"
                className="mt-4 min-h-[48px] border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
              >
                Ver equipo
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Testimonios"
            title="Lo que dicen nuestros pacientes"
          />
          <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:snap-none md:overflow-visible md:pb-0">
            {TESTIMONIALS.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="flex-shrink-0 w-[calc(100%-1rem)] md:w-full p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 rounded-xl"
              >
                <div className="mb-4 flex text-amber-400" role="img" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Smile key={i} className="h-4 w-4" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-sm italic leading-relaxed text-slate-700">
                  "{testimonial.quote}"
                </blockquote>
                <footer className="mt-4 border-t border-slate-100 pt-4">
                  <p className="font-display text-sm font-bold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">{testimonial.treatment}</p>
                </footer>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-center text-white shadow-lg sm:p-10">
            <CalendarCheck className="mx-auto h-12 w-12 text-blue-200" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-bold">¿Listo para tu consulta?</h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Agenda tu hora online en menos de un minuto o escríbenos por WhatsApp
              y te responderemos a la brevedad.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                to="/agendar-hora"
                size="lg"
                className="w-full sm:w-auto min-h-[52px] bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar hora online
              </Button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#167D3F] px-6 py-3 text-base font-semibold text-white hover:bg-[#137638] min-h-[52px]"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}