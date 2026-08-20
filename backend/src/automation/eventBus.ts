import type { DomainEvent } from './events.js';

export type EventHandler<E extends DomainEvent = DomainEvent> = (
  event: E,
) => void | Promise<void>;

interface HandlerEntry {
  label?: string;
  handler: EventHandler<DomainEvent>;
}

/**
 * Bus de eventos de dominio en memoria. La automatización se mantiene
 * desacoplada de las rutas HTTP y de la UI: los servicios emiten eventos y
 * los suscriptores (acciones) se ejecutan de forma síncrona.
 */
export class EventBus {
  readonly name: string;

  private readonly handlersByType = new Map<
    DomainEvent['type'],
    Set<HandlerEntry>
  >();

  constructor(name = 'event-bus') {
    this.name = name;
  }

  subscribe<E extends DomainEvent>(
    type: E['type'],
    handler: EventHandler<E>,
    label?: string,
  ): () => void {
    const set = this.handlersByType.get(type) ?? new Set<HandlerEntry>();
    const entry: HandlerEntry = {
      handler: handler as EventHandler<DomainEvent>,
      label,
    };
    set.add(entry);
    this.handlersByType.set(type, set);
    return () => {
      set.delete(entry);
    };
  }

  async emit(event: DomainEvent): Promise<void> {
    const handlers = this.handlersByType.get(event.type);
    if (!handlers) return;
    for (const { handler, label } of handlers) {
      try {
        await handler(event);
      } catch (error) {
        // Un fallo en una acción nunca debe afectar a la operación de dominio
        // que originó el evento.
        console.error(
          `[event-bus:${this.name}] la acción "${label ?? event.type}" falló:`,
          error,
        );
      }
    }
  }
}
