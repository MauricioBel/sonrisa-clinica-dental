import type { DomainEvent } from './events.js';
import type { EventBus, EventHandler } from './eventBus.js';

/**
 * Acción de automatización registrada en el bus. La primera versión solo
 * incluye acciones internas; recordatorios, notificaciones y otros efectos
 * podrán añadirse como nuevas acciones sin tocar las rutas HTTP ni la UI.
 */
export interface AutomationAction<E extends DomainEvent = DomainEvent> {
  id: string;
  description: string;
  event: E['type'];
  run: EventHandler<E>;
}

/** Registra una acción en el bus y devuelve la función para darla de baja. */
export function registerAction<E extends DomainEvent>(
  bus: EventBus,
  action: AutomationAction<E>,
): () => void {
  return bus.subscribe(action.event, action.run, action.id);
}

const MAX_EVENT_HISTORY = 500;

export interface RecordedEvent {
  type: DomainEvent['type'];
  occurredAt: string;
  data: DomainEvent['data'];
}

/** Acción interna por defecto: registra en memoria los eventos procesados. */
export function createInMemoryRecorder() {
  const history: RecordedEvent[] = [];

  const record: EventHandler = (event) => {
    history.push({
      type: event.type,
      occurredAt: event.occurredAt,
      data: event.data,
    });
    if (history.length > MAX_EVENT_HISTORY) history.shift();
  };

  return {
    record,
    snapshot: (type?: DomainEvent['type']): RecordedEvent[] =>
      type === undefined
        ? [...history]
        : history.filter((entry) => entry.type === type),
    clear: (): void => {
      history.length = 0;
    },
  };
}
