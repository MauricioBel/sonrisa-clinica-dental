import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { Spinner } from './components/ui/Feedback.tsx';
import { ConfigProvider } from './context/ConfigContext.tsx';
import { AdminAuthProvider } from './context/AdminAuthContext.tsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx';
import { AdminLayout } from './components/layout/AdminLayout.tsx';

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

// Admin pages
const AdminLoginPage = lazy(() =>
  import('./pages/admin/LoginPage.tsx').then((m) => ({ default: m.AdminLoginPage })),
);
const DashboardPage = lazy(() =>
  import('./pages/admin/DashboardPage.tsx').then((m) => ({ default: m.DashboardPage })),
);
const AdminAppointmentsPage = lazy(() =>
  import('./pages/admin/AppointmentsPage.tsx').then((m) => ({ default: m.AdminAppointmentsPage })),
);

export default function App() {
  return (
    <ConfigProvider>
      <AdminAuthProvider>
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
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<DashboardPage />} />
                  <Route path="/admin/citas" element={<AdminAppointmentsPage />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AdminAuthProvider>
    </ConfigProvider>
  );
}