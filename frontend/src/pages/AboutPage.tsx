import { Target, Eye, HeartHandshake } from 'lucide-react';
import { Seo } from '../components/Seo.tsx';
import { SectionTitle } from '../components/ui/SectionTitle.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { useWhatsApp } from '../hooks/useConfig.ts';

const VALUES = [
  {
    icon: <Target className="h-6 w-6" aria-hidden="true" />,
    title: 'Nuestra misión',
    text: 'Entregar atención odontológica de excelencia, accesible y sin dolor, cuidando la salud bucal de cada paciente y de su familia durante todas las etapas de la vida.',
  },
  {
    icon: <Eye className="h-6 w-6" aria-hidden="true" />,
    title: 'Nuestra visión',
    text: 'Ser la clínica dental de referencia en Santiago, reconocida por su tecnología, calidez y resultados que transforman sonrisas y vidas.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" aria-hidden="true" />,
    title: 'Nuestros valores',
    text: 'Ética profesional, transparencia en cada tratamiento, bioseguridad rigurosa y un trato cercano que hace que ir al dentista sea una experiencia tranquila.',
  },
];

const MILESTONES = [
  { year: '2009', text: 'Abrimos nuestras puertas en Providencia con un solo box de atención.' },
  { year: '2014', text: 'Incorporamos la primera sala de radiografía digital y escaneo 3D.' },
  { year: '2018', text: 'Ampliamos el equipo con especialistas en ortodoncia e implantes.' },
  { year: '2022', text: 'Lanzamos la atención online y agenda digital para nuestros pacientes.' },
  { year: '2026', text: 'Más de 5.000 pacientes confían en Sonrisa Clínica Dental.' },
];

export function AboutPage() {
  const { link: whatsappLink } = useWhatsApp();
  return (
    <>
      <Seo
        title="Nosotros"
        description="Conoce la historia, misión y valores de Sonrisa Clínica Dental, clínica odontológica en Providencia, Santiago de Chile, desde 2009."
        path="/nosotros"
      />

      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            level="h1"
            eyebrow="Nosotros"
            title="Cuidamos sonrisas desde 2009"
            description="Somos un equipo multidisciplinario de especialistas con una convicción simple: la salud dental de calidad debe ser accesible y humana."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <Card key={value.title} className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                {value.icon}
              </div>
              <h2 className="font-display text-lg font-bold text-brand-950">{value.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Nuestra historia"
            title="Un camino de confianza"
          />
          <ol className="mx-auto mt-10 max-w-2xl space-y-6">
            {MILESTONES.map((m) => (
              <li key={m.year} className="flex gap-4">
                <span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl bg-brand-900 font-display text-sm font-bold text-white">
                  {m.year}
                </span>
                <p className="pt-3 text-sm leading-relaxed text-slate-600">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-brand-900 p-8 text-center text-white sm:p-10">
          <h2 className="font-display text-2xl font-bold">¿Quieres conocernos en persona?</h2>
          <p className="mx-auto mt-2 max-w-lg text-brand-100">
            Te invitamos a visitar nuestra clínica en Providencia o a agendar una
            primera consulta sin costo.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/equipo" variant="secondary" size="lg">
              Conocer al equipo
            </Button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#167D3F] px-6 py-3 text-base font-semibold text-white hover:bg-[#137638]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}