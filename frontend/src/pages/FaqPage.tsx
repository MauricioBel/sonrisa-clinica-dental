import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Seo } from '../components/Seo.tsx';
import { SectionTitle } from '../components/ui/SectionTitle.tsx';
import { Button } from '../components/ui/Button.tsx';

const FAQS = [
  {
    question: '¿Cómo agendo una hora?',
    answer:
      'Puedes agendar online desde nuestra página en menos de un minuto: eliges tratamiento, profesional, fecha y horario. También puedes escribirnos por WhatsApp y te ayudaremos a coordinar.',
  },
  {
    question: '¿El precio de la primera consulta está incluido?',
    answer:
      'Sí. La evaluación inicial y el diagnóstico están incluidos en todos nuestros tratamientos. Recibirás un presupuesto claro y detallado antes de iniciar cualquier procedimiento.',
  },
  {
    question: '¿Puedo pagar en cuotas?',
    answer:
      'Ofrecemos opciones de pago en cuotas y convenios con varias clínicas. Consulta los detalles en tu presupuesto según el tratamiento que necesites.',
  },
  {
    question: '¿Cómo sé qué tratamiento necesito?',
    answer:
      'Agenda una evaluación inicial y un odontólogo realizará el diagnóstico con radiografía digital. Con el resultado te entregaremos un plan personalizado y sus alternativas.',
  },
  {
    question: '¿Trabajan con niños?',
    answer:
      'Por supuesto. Contamos con odontopediatría en un ambiente amigable diseñado para que los más pequeños se sientan cómodos desde su primera visita.',
  },
  {
    question: '¿Qué debo considerar antes de un blanqueamiento?',
    answer:
      'Te recomendamos una limpieza previa y una evaluación para confirmar que tus encías están sanas. El blanqueamiento lo realiza siempre un profesional supervisando el proceso.',
  },
  {
    question: '¿Qué pasa si necesito cancelar mi hora?',
    answer:
      'Escríbenos por WhatsApp o llámanos con al menos 24 horas de anticipación y reagendaremos sin costo. Así otros pacientes pueden aprovechar el horario.',
  },
  {
    question: '¿Dónde se ubica la clínica?',
    answer:
      'Estamos en Av. Providencia 1234, oficina 502, Providencia, Santiago de Chile, a pasos del metro Salvador. Contamos con estacionamiento convenio cercano.',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl bg-white ring-1 ring-slate-200/70">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-sm font-bold text-brand-950 sm:text-base">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed text-slate-600">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Seo
        title="Preguntas frecuentes"
        description="Resolvemos tus dudas sobre citas, precios, tratamientos y financiamiento en Sonrisa Clínica Dental."
        path="/preguntas-frecuentes"
        jsonLd={faqJsonLd}
      />

      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            level="h1"
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus dudas"
            description="Encuentra respuestas a las consultas más comunes sobre nuestra clínica y tratamientos."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-brand-50 p-8 text-center">
          <h2 className="font-display text-xl font-bold text-brand-950">
            ¿Tienes otra pregunta?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Escríbenos por WhatsApp o contáctanos y te responderemos a la brevedad.
          </p>
          <Button to="/contacto" size="lg" className="mt-6">
            Ir a contacto
          </Button>
        </div>
      </section>
    </>
  );
}