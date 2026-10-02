import { MoreVertical, Eye, CheckCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge.tsx';

type AppointmentStatus = 'CONFIRMED' | 'PENDING' | 'IN_PROGRESS' | 'CANCELLED';

interface MockAppointment {
  id: number;
  time: string;
  patientName: string;
  patientRut: string;
  patientPhone: string;
  treatment: string;
  dentist: string;
  status: AppointmentStatus;
}

const MOCK_APPOINTMENTS: MockAppointment[] = [
  {
    id: 1,
    time: '09:00',
    patientName: 'María González',
    patientRut: '12.345.678-9',
    patientPhone: '+56 9 1234 5678',
    treatment: 'Limpieza Dental',
    dentist: 'Dra. Valentina Rojas',
    status: 'CONFIRMED',
  },
  {
    id: 2,
    time: '10:30',
    patientName: 'Pedro Riquelme',
    patientRut: '15.678.901-2',
    patientPhone: '+56 9 2345 6789',
    treatment: 'Ortodoncia - Control',
    dentist: 'Dr. Sebastián Fuentes',
    status: 'IN_PROGRESS',
  },
  {
    id: 3,
    time: '12:00',
    patientName: 'Javiera Silva',
    patientRut: '18.234.567-3',
    patientPhone: '+56 9 3456 7890',
    treatment: 'Carillas Dentales',
    dentist: 'Dra. Camila Torres',
    status: 'PENDING',
  },
  {
    id: 4,
    time: '15:00',
    patientName: 'Diego Fernández',
    patientRut: '10.111.222-4',
    patientPhone: '+56 9 4567 8901',
    treatment: 'Implante Dental - Post-operatorio',
    dentist: 'Dra. Valentina Rojas',
    status: 'CONFIRMED',
  },
  {
    id: 5,
    time: '16:30',
    patientName: 'Sofía Morales',
    patientRut: '22.333.444-5',
    patientPhone: '+56 9 5678 9012',
    treatment: 'Endodoncia',
    dentist: 'Dr. Andrés Muñoz',
    status: 'CANCELLED',
  },
];

interface ActionMenuProps {
  appointmentId: number;
}

function ActionMenu({ appointmentId: _appointmentId }: ActionMenuProps) {
  return (
    <div className="relative inline-block text-left">
      <button
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Más acciones"
      >
        <MoreVertical className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="absolute right-0 mt-1 w-36 rounded-lg bg-white border border-slate-200 shadow-lg py-1 z-10">
        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
          <Eye className="h-4 w-4" aria-hidden="true" />
          Ver Ficha
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-brand-700 hover:bg-brand-50 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" aria-hidden="true" />
          Confirmar
        </button>
        <hr className="my-1 border-slate-100" />
        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export function AgendaView() {
  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead>
            <tr className="bg-slate-50 text-left text-sm font-semibold text-slate-600 border-b border-slate-200">
              <th className="p-4 w-20">Hora</th>
              <th className="p-4">Paciente</th>
              <th className="p-4">Tratamiento</th>
              <th className="p-4">Odontólogo</th>
              <th className="p-4 w-36">Estado</th>
              <th className="p-4 w-24 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_APPOINTMENTS.map((appt) => (
              <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-medium text-slate-900">{appt.time}</span>
                </td>
                <td className="p-4">
                  <p className="font-medium text-slate-900">{appt.patientName}</p>
                  <p className="text-xs text-slate-500">{appt.patientRut} · {appt.patientPhone}</p>
                </td>
                <td className="p-4 text-sm text-slate-700">{appt.treatment}</td>
                <td className="p-4 text-sm text-slate-700">{appt.dentist}</td>
                <td className="p-4">
                  <StatusBadge status={appt.status} />
                </td>
                <td className="p-4 text-center">
                  <ActionMenu appointmentId={appt.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}