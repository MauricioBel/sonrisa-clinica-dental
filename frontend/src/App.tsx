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
const AdminLoginPage = lazy(() =>
  import('./pages/admin/AdminLoginPage.tsx').then((m) => ({
    default: m.AdminLoginPage,
  })),
);
const AdminLayout = lazy(() =>
  import('./pages/admin/AdminLayout.tsx').then((m) => ({ default: m.AdminLayout })),
);
const AdminDashboardPage = lazy(() =>
  import('./pages/admin/AdminDashboardPage.tsx').then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const AdminAppointmentsPage = lazy(() =>
  import('./pages/admin/AdminAppointmentsPage.tsx').then((m) => ({
    default: m.AdminAppointmentsPage,
  })),
);
const AdminAppointmentDetailPage = lazy(() =>
  import('./pages/admin/AdminAppointmentDetailPage.tsx').then((m) => ({
    default: m.AdminAppointmentDetailPage,
  })),
);
const AdminDentistsPage = lazy(() =>
  import('./pages/admin/AdminDentistsPage.tsx').then((m) => ({
    default: m.AdminDentistsPage,
  })),
);
const AdminDentistFormPage = lazy(() =>
  import('./pages/admin/AdminDentistFormPage.tsx').then((m) => ({
    default: m.AdminDentistFormPage,
  })),
);
const AdminTreatmentsPage = lazy(() =>
  import('./pages/admin/AdminTreatmentsPage.tsx').then((m) => ({
    default: m.AdminTreatmentsPage,
  })),
);
const AdminTreatmentFormPage = lazy(() =>
  import('./pages/admin/AdminTreatmentFormPage.tsx').then((m) => ({
    default: m.AdminTreatmentFormPage,
  })),
);
const AdminTimeBlocksPage = lazy(() =>
  import('./pages/admin/AdminTimeBlocksPage.tsx').then((m) => ({
    default: m.AdminTimeBlocksPage,
  })),
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

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="citas" element={<AdminAppointmentsPage />} />
            <Route path="citas/:id" element={<AdminAppointmentDetailPage />} />
            <Route path="dentistas" element={<AdminDentistsPage />} />
            <Route path="dentistas/nuevo" element={<AdminDentistFormPage />} />
            <Route path="dentistas/:id/editar" element={<AdminDentistFormPage />} />
            <Route path="tratamientos" element={<AdminTreatmentsPage />} />
            <Route path="tratamientos/nuevo" element={<AdminTreatmentFormPage />} />
            <Route path="tratamientos/:id/editar" element={<AdminTreatmentFormPage />} />
            <Route path="bloqueos" element={<AdminTimeBlocksPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}