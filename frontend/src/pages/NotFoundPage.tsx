import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Seo } from '../components/Seo.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Card } from '../components/ui/Card.tsx';

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Página no encontrada"
        description="La página que buscas no existe o fue movida. Vuelve al inicio de Sonrisa Clínica Dental."
        path="/404"
      />
      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            <Search className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="mt-6 font-display text-6xl font-bold text-brand-100">404</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-brand-950">
            Página no encontrada
          </h1>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            La página que buscas no existe o fue movida. Te invitamos a volver al
            inicio o explorar nuestros tratamientos.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/">
              <Home className="h-4 w-4" aria-hidden="true" />
              Volver al inicio
            </Button>
            <Link
              to="/tratamientos"
              className="inline-flex items-center justify-center rounded-lg border border-brand-300 px-4 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
            >
              Ver tratamientos
            </Link>
          </div>
        </Card>
      </section>
    </>
  );
}