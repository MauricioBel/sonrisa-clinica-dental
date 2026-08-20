import { EventBus } from './eventBus.js';
import {
  createInMemoryRecorder,
  registerAction,
} from './actions.js';
import { EVENT_TYPES } from './events.js';
import type { DomainEvent } from './events.js';

export type { AutomationAction, RecordedEvent } from './actions.js';
export type {
  AppointmentStatus,
  DomainEvent,
  PatientInfo,
  AppointmentInfo,
} from './events.js';

const bus = new EventBus('automation');
const recorder = createInMemoryRecorder();

// Acción interna por defecto: observabilidad en memoria de los eventos
// procesados (no persistida; una versión futura podrá añadir persistencia).
for (const type of EVENT_TYPES) {
  bus.subscribe(type, recorder.record, 'in-memory-recorder');
}

/** Emite un evento de dominio para que lo procesen las acciones registradas. */
export function emitDomainEvent(event: DomainEvent): Promise<void> {
  return bus.emit(event);
}

/** Registra una acción de automatización en el bus de la aplicación. */
export function registerAutomationAction<
  E extends DomainEvent,
>(
  action: {
    id: string;
    description: string;
    event: E['type'];
    run: (event: E) => void | Promise<void>;
  },
): () => void {
  return registerAction(bus, action);
}

/** Devuelve una copia del historial en memoria de eventos procesados. */
export function getEventHistory(
  type?: DomainEvent['type'],
): { type: DomainEvent['type']; occurredAt: string; data: DomainEvent['data'] }[] {
  return recorder.snapshot(type);
}

/** Limpia el historial en memoria (útil en pruebas). */
export function clearEventHistory(): void {
  recorder.clear();
}
