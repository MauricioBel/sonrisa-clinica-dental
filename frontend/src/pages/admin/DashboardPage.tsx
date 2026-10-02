import { Plus, CalendarCheck, Users, LayoutDashboard, DollarSign } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout.tsx';
import { KpiCard } from '../../components/dashboard/KpiCard.tsx';
import { AgendaView } from '../../components/dashboard/AgendaView.tsx';
import { Button } from '../../components/ui/Button.tsx';

export function DashboardPage() {
  const { user } = useAdminAuth();

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
          <Button className="w-full sm:w-auto" size="lg" variant="primary">
            <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
            + Nueva Cita
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Citas Hoy"
            value={12}
            subtitle="+3 vs ayer"
            badgeText="Al día"
            badgeType="success"
            icon={CalendarCheck}
          />
          <KpiCard
            title="En Sala de Espera"
            value={3}
            subtitle="2 en consulta"
            badgeText="Atención"
            badgeType="warning"
            icon={Users}
          />
          <KpiCard
            title="Sillones Ocupados"
            value="5/8"
            subtitle="62% ocupación"
            badgeText="Óptimo"
            badgeType="success"
            icon={LayoutDashboard}
          />
          <KpiCard
            title="Ingresos Proyectados"
            value="$1.240.000"
            subtitle="+15% vs semana anterior"
            badgeText="Crecimiento"
            badgeType="info"
            icon={DollarSign}
          />
        </div>

        <AgendaView />
      </div>
    </DashboardLayout>
  );
}