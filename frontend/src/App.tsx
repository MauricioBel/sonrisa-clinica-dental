import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { Spinner } from './components/ui/Feedback.tsx';

// Code-splitting: Home se carga eager (LCP); el resto bajo demanda.
const TreatmentsPage = lazy(() =>
  import('./pages/TreatmentsPage.tsx').then((m) => ({ default: m.TreatmentsPage })),
);
const TreatmentDetailPage = lazy(() =>
  import('./pages/TreatmentDetailPage.tsx').then((m) => ({ default: m.TreatmentDetailPage })),
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage.tsx').then((m) => ({ default: m.AboutPage })),
);
const TeamPage = lazy(() =>
  import('./pages/TeamPage.tsx').then((m) => ({ default: m.TeamPage })),
);
const FaqPage = lazy(() =>
  import('./pages/FaqPage.tsx').then((m) => ({ default: m.FaqPage })),
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage.tsx').then((m) => ({ default: m.ContactPage })),
);
const BookingPage = lazy(() =>
  import('./pages/BookingPage.tsx').then((m) => ({ default: m.BookingPage })),
);
const AppointmentConfirmationPage = lazy(() =>
  import('./pages/AppointmentConfirmationPage.tsx').then((m) => ({
    default: m.AppointmentConfirmationPage,
  })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage.tsx').then((m) => ({ default: m.NotFoundPage })),
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-[50vh]">
            <Spinner label="Cargando página..." />
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/tratamientos" element={<TreatmentsPage />} />
            <Route path="/tratamientos/:slug" element={<TreatmentDetailPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/equipo" element={<TeamPage />} />
            <Route path="/preguntas-frecuentes" element={<FaqPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/agendar-hora" element={<BookingPage />} />
            <Route path="/reserva/confirmacion/:id" element={<AppointmentConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}