import { useEffect, useState } from 'react';
import { Plus, CalendarCheck, Users, LayoutDashboard, DollarSign } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout.tsx';
import { KpiCard } from '../../components/dashboard/KpiCard.tsx';
import { AgendaView } from '../../components/dashboard/AgendaView.tsx';
import { CreateAppointmentModal } from '../../components/dashboard/CreateAppointmentModal.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Skeleton } from '../../components/ui/Feedback.tsx';
import { adminApi } from '../../lib/api-admin.ts';
import type { AdminAppointment } from '../../types/admin.ts';
import type { LucideIcon } from 'lucide-react';

interface DashboardMetrics {
  totalToday: number;
  confirmed: number;
  pending: number;
  completed: number;
  cancelled: number;
  totalRevenue: number;
}

export function DashboardPage() {
  const { user } = useAdminAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    setRefreshKey((prev) => prev + 1); // Forces AgendaView to re-fetch
    // Re-fetch metrics
    fetchMetrics();
  };

  const fetchMetrics = async () => {
    try {
      const response = await adminApi.getAppointmentMetrics();
      // Validación defensiva: response.data debe ser un array
      const rawAppointments = Array.isArray(response?.data) ? response.data : 
                             Array.isArray((response as unknown as Record<string, unknown>)?.appointments) ? (response as unknown as Record<string, unknown>).appointments as AdminAppointment[] : 
                             Array.isArray(response) ? response as AdminAppointment[] : [];
      
      const totalToday = rawAppointments.length;
      const confirmed = rawAppointments.filter((a: AdminAppointment) => a.status === 'CONFIRMED').length;
      const pending = rawAppointments.filter((a: AdminAppointment) => a.status === 'PENDING').length;
      const completed = rawAppointments.filter((a: AdminAppointment) => a.status === 'COMPLETED').length;
      const cancelled = rawAppointments.filter((a: AdminAppointment) => a.status === 'CANCELLED').length;
      const totalRevenue = rawAppointments
        .filter((a: AdminAppointment) => a.status !== 'CANCELLED')
        .reduce((sum: number, a: AdminAppointment) => sum + (a.treatment?.price || 0), 0);

      setMetrics({
        totalToday,
        confirmed,
        pending,
        completed,
        cancelled,
        totalRevenue,
      });
    } catch (err) {
      console.error('Error fetching metrics:', err);
    } finally {
      setIsLoadingMetrics(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(amount);
  };

  const renderKpiCard = (
    title: string,
    value: string | number,
    subtitle: string,
    badgeText: string,
    badgeType: 'success' | 'warning' | 'info',
    icon: LucideIcon
  ) => {
    if (isLoadingMetrics) {
      return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-20 mt-2" />
          <Skeleton className="h-5 w-24 mt-2" />
        </div>
      );
    }
    return (
      <KpiCard
        title={title}
        value={value}
        subtitle={subtitle}
        badgeText={badgeText}
        badgeType={badgeType}
        icon={icon}
      />
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Resumen Operativo</h1>
            <p className="mt-1 text-sm text-slate-500">
              Bienvenido, {user?.nombre} · {user?.clinicaNombre}
            </p>
          </div>
          <Button className="w-full sm:w-auto" size="lg" variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
            + Nueva Cita
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {renderKpiCard(
            'Citas Hoy',
            metrics?.totalToday ?? 0,
            `${metrics?.confirmed ?? 0} confirmadas`,
            'Al día',
            'success',
            CalendarCheck
          )}
          {renderKpiCard(
            'En Sala de Espera',
            metrics?.pending ?? 0,
            `${metrics?.completed ?? 0} finalizadas`,
            'Atención',
            'warning',
            Users
          )}
          {renderKpiCard(
            'Sillones Ocupados',
            metrics ? `${metrics.confirmed}/${metrics.totalToday}` : '0/0',
            metrics && metrics.totalToday > 0 ? `${Math.round((metrics.confirmed / metrics.totalToday) * 100)}% ocupación` : 'Sin datos',
            'Óptimo',
            'success',
            LayoutDashboard
          )}
          {renderKpiCard(
            'Ingresos Proyectados',
            metrics ? formatCLP(metrics.totalRevenue) : '$0',
            `${metrics?.totalToday ?? 0} citas programadas`,
            'Crecimiento',
            'info',
            DollarSign
          )}
        </div>

        <AgendaView key={refreshKey} />

        <CreateAppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleModalSuccess}
          currentUser={user}
        />
      </div>
    </DashboardLayout>
  );
}