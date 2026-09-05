import { CalendarCheck, Clock } from 'lucide-react';
import { Seo } from '../components/Seo.tsx';
import { SectionTitle } from '../components/ui/SectionTitle.tsx';
import { TreatmentList } from '../components/TreatmentCard.tsx';
import { useTreatments } from '../hooks/useTreatments.ts';
import { Button } from '../components/ui/Button.tsx';

export function TreatmentsPage() {
  const { data, loading, error } = useTreatments();

  return (
    <>
      <Seo
        title="Tratamientos dentales"
        description="Conoce todos nuestros tratamientos dentales: limpieza, blanqueamiento, implantes, ortodoncia, carillas, odontopediatría, endodoncia y diseño de sonrisa."
        path="/tratamientos"
      />

      <section className="bg-brand-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            level="h1"
            eyebrow="Nuestros tratamientos"
            title="Soluciones completas para tu salud dental"
            description="Desde limpiezas preventivas hasta diseño de sonrisa completo. Todos nuestros precios incluyen evaluación inicial."
          />
          <div className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
              Duración estimada por sesión
            </span>
            <span className="text-slate-300">|</span>
            <span>Precios referenciales en pesos chilenos (CLP)</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-14">
        <TreatmentList treatments={data} loading={loading} error={error} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 sm:pb-14">
        <div className="rounded-2xl bg-brand-50 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-bold text-brand-950">
            ¿No sabes qué tratamiento necesitas?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-slate-600">
            Agenda una evaluación inicial y nuestros especialistas te orientarán
            con un plan a tu medida.
          </p>
          <Button to="/agendar-hora" size="lg" className="mt-6">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Agendar evaluación inicial
          </Button>
        </div>
      </section>
    </>
  );
}