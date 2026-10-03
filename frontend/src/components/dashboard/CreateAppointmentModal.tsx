import { useEffect, useState } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { adminApi } from '../../lib/api-admin.ts';
import type { AdminUser } from '../../types/admin.ts';

interface CreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentUser: AdminUser | null;
}

interface PatientForm {
  patientName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
}

interface FormData extends PatientForm {
  dentistId: number | '';
  treatmentId: number | '';
  date: string;
  time: string;
  comment: string;
}

interface Dentist {
  id: number;
  name: string;
  role: string;
  specialty: string;
  businessHours: { dayOfWeek: number; openTime: string; closeTime: string }[];
}

interface Treatment {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  durationMinutes: number;
}

export function CreateAppointmentModal({ isOpen, onClose, onSuccess, currentUser }: CreateAppointmentModalProps) {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    patientLastName: '',
    patientEmail: '',
    patientPhone: '',
    dentistId: '',
    treatmentId: '',
    date: '',
    time: '',
    comment: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchResources();
    }
  }, [isOpen]);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const [dentistsRes, treatmentsRes] = await Promise.all([
        adminApi.getDentists(),
        adminApi.getTreatments(),
      ]);
      
      // Defensive extraction - adminApi now returns { data, pagination }
      const dentistsData = Array.isArray(dentistsRes?.data) ? dentistsRes.data :
                          Array.isArray(dentistsRes) ? dentistsRes : [];
      const treatmentsData = Array.isArray(treatmentsRes?.data) ? treatmentsRes.data :
                            Array.isArray(treatmentsRes) ? treatmentsRes : [];
      
      setDentists(dentistsData);
      setTreatments(treatmentsData);
    } catch (err) {
      setError('Error al cargar los recursos');
      console.error('Error fetching resources:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Find dentist and treatment to get duration
      const dentist = dentists.find((d) => d.id === Number(formData.dentistId));
      const treatment = treatments.find((t) => t.id === Number(formData.treatmentId));
      
      if (!dentist || !treatment) {
        throw new Error('Seleccione un odontólogo y un tratamiento válidos');
      }

      // Validate date is not in the past
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        throw new Error('La fecha no puede ser anterior a hoy');
      }

      // Check if dentist works on this day
      const dayOfWeek = selectedDate.getDay(); // 0 = Sunday
      const worksToday = dentist.businessHours.some((bh) => bh.dayOfWeek === dayOfWeek);
      if (!worksToday) {
        throw new Error('El odontólogo no atiende en este día');
      }

      // Check if time is within business hours
      const hoursToday = dentist.businessHours.find((bh) => bh.dayOfWeek === dayOfWeek);
      if (hoursToday) {
        if (formData.time < hoursToday.openTime || formData.time > hoursToday.closeTime) {
          throw new Error(`La hora debe estar entre ${hoursToday.openTime} y ${hoursToday.closeTime}`);
        }
      }

      await adminApi.createAppointment({
        patientName: formData.patientName,
        patientLastName: formData.patientLastName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        date: formData.date,
        time: formData.time,
        comment: formData.comment || null,
        dentistId: Number(formData.dentistId),
        treatmentId: Number(formData.treatmentId),
        clinicaId: currentUser.clinicaId,
      });

      onSuccess();
      onClose();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cita');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      patientName: '',
      patientLastName: '',
      patientEmail: '',
      patientPhone: '',
      dentistId: '',
      treatmentId: '',
      date: '',
      time: '',
      comment: '',
    });
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 id="modal-title" className="font-display text-xl font-bold text-slate-900">
            Nueva Cita
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
            aria-label="Cerrar modal"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200" role="alert">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}

          {/* Loading state for resources */}
          {isLoading && (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl bg-slate-200/70 h-12" />
              ))}
            </div>
          )}

          {!isLoading && (
            <>
              {/* Patient Info Section */}
              <fieldset className="space-y-4">
                <legend className="font-medium text-slate-900">Datos del Paciente</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="patientName" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Nombre *
                    </label>
                    <input
                      id="patientName"
                      name="patientName"
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      placeholder="Ej: María"
                    />
                  </div>
                  <div>
                    <label htmlFor="patientLastName" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Apellido *
                    </label>
                    <input
                      id="patientLastName"
                      name="patientLastName"
                      type="text"
                      required
                      value={formData.patientLastName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      placeholder="Ej: González"
                    />
                  </div>
                  <div>
                    <label htmlFor="patientEmail" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Email *
                    </label>
                    <input
                      id="patientEmail"
                      name="patientEmail"
                      type="email"
                      required
                      value={formData.patientEmail}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      placeholder="paciente@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="patientPhone" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Teléfono *
                    </label>
                    <input
                      id="patientPhone"
                      name="patientPhone"
                      type="tel"
                      required
                      value={formData.patientPhone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Professional & Treatment */}
              <fieldset className="space-y-4">
                <legend className="font-medium text-slate-900">Servicio y Profesional</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="dentistId" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Odontólogo *
                    </label>
                    <select
                      id="dentistId"
                      name="dentistId"
                      required
                      value={formData.dentistId}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    >
                      <option value="">Seleccionar odontólogo</option>
                      {dentists.map((dentist) => (
                        <option key={dentist.id} value={dentist.id}>
                          {dentist.name} — {dentist.specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="treatmentId" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Tratamiento *
                    </label>
                    <select
                      id="treatmentId"
                      name="treatmentId"
                      required
                      value={formData.treatmentId}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    >
                      <option value="">Seleccionar tratamiento</option>
                      {treatments.map((treatment) => (
                        <option key={treatment.id} value={treatment.id}>
                          {treatment.name} (${new Intl.NumberFormat('es-CL').format(treatment.price)} CLP)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Date & Time */}
              <fieldset className="space-y-4">
                <legend className="font-medium text-slate-900">Fecha y Hora</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Fecha *
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Hora *
                    </label>
                    <input
                      id="time"
                      name="time"
                      type="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Comments */}
              <div>
                <label htmlFor="comment" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Observaciones (opcional)
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full resize-y rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  placeholder="Notas adicionales..."
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex-1 sm:flex-none rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {isSubmitting ? 'Guardando...' : 'Guardar Cita'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}