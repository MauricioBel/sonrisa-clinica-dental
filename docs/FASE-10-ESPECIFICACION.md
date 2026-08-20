# FASE 10 — Robustez, consistencia y endurecimiento del sistema

## 1. Propósito

La Fase 10 tiene como objetivo corregir inconsistencias detectadas durante la revisión integral de las Etapas 0–7 y reforzar reglas de negocio que actualmente dependen parcialmente del frontend.

La implementación debe ser conservadora:

1. Inspeccionar primero la implementación existente.
2. Reutilizar servicios, validaciones y mecanismos existentes.
3. Realizar cambios mínimos y aditivos cuando sea posible.
4. Mantener los contratos públicos existentes salvo que exista una razón técnica o de seguridad justificada.
5. Agregar pruebas antes o junto con cada corrección.
6. Ejecutar regresión completa después de cada grupo de cambios.
7. No realizar refactors no relacionados.
8. No implementar todavía las automatizaciones comerciales de la futura etapa de automatización de negocio.

---

# 2. Alcance

La Fase 10 comprende seis correcciones:

* M1 — Liberación del horario al completar una cita.
* M2 — Protección de citas frente a bloqueos de horario.
* M3 — Validación de fechas pasadas en backend.
* M4 — Protección al desactivar dentistas o tratamientos con citas futuras.
* M5 — Mitigación de exposición de datos personales en la consulta pública de citas.
* M6 — Consistencia de eventos durante el reagendamiento.

La implementación debe conservar la arquitectura actual:

```text
HTTP / Routes
      │
      ▼
Validation / Middleware
      │
      ▼
Services
      │
      ├── Prisma
      │
      └── Automation Event Bus
```

La Fase 10 no debe introducir una arquitectura paralela.

---

# 3. M1 — Liberación del horario al completar una cita

## 3.1 Problema

Actualmente una cita que pasa a `COMPLETED` puede conservar su `conflictKey`.

La disponibilidad deja de considerar las citas `COMPLETED`, por lo que visualmente el horario parece libre.

Sin embargo, el `conflictKey` único continúa ocupando la combinación:

```text
dentistId + date + time
```

Esto puede provocar un conflicto de unicidad al intentar reservar nuevamente ese horario.

## 3.2 Requisito

Cuando una cita pase correctamente a `COMPLETED`, su:

```text
conflictKey
```

debe quedar en:

```text
null
```

La liberación debe realizarse dentro de la misma operación transaccional que modifica el estado de la cita.

## 3.3 Reglas

* `CONFIRMED → COMPLETED` debe liberar `conflictKey`.
* `PENDING → COMPLETED`, si continúa siendo una transición válida, también debe liberar `conflictKey`.
* `CANCELLED` ya libera el `conflictKey`; no modificar esa lógica salvo que sea necesario.
* Una cita `COMPLETED` no debe poder volver a reservar el mismo horario.
* La cita histórica debe conservar todos sus demás datos.

## 3.4 Pruebas

Agregar pruebas para:

1. Crear cita.
2. Confirmarla.
3. Cambiarla a `COMPLETED`.
4. Comprobar que `conflictKey === null`.
5. Comprobar que el horario vuelve a aparecer disponible.
6. Crear una nueva cita en ese horario.
7. Comprobar que la nueva cita se crea correctamente.
8. Comprobar que la cita histórica sigue disponible para consulta administrativa.

---

# 4. M2 — Bloqueos de horario y citas activas

## 4.1 Problema

Actualmente un administrador puede crear un `TimeBlock` que cubra una franja donde ya existe una cita activa.

Esto genera una inconsistencia:

```text
Cita existente
      +
TimeBlock
      ↓
Horario oculto
pero cita todavía existente
```

## 4.2 Requisito

El backend debe rechazar la creación de un bloqueo que se solape con una cita activa del mismo dentista y fecha.

## 4.3 Estados considerados activos

Como mínimo:

```text
PENDING
CONFIRMED
```

Los estados terminales no deben impedir el bloqueo:

```text
CANCELLED
COMPLETED
```

## 4.4 Regla de solapamiento

Debe utilizarse la misma lógica de intervalos que ya utiliza el sistema:

```text
existing.startTime < new.endTime
AND
existing.endTime > new.startTime
```

Para citas que representan una única franja horaria, debe considerarse correctamente la duración del tratamiento.

No duplicar innecesariamente la lógica existente: reutilizarla cuando sea posible.

## 4.5 Respuesta

Si existe una cita activa afectada:

```text
HTTP 409 Conflict
```

La respuesta debe indicar que el bloqueo entra en conflicto con una cita existente.

## 4.6 Pruebas

Agregar pruebas para:

1. Crear una cita confirmada.
2. Intentar crear un bloqueo que la cubra.
3. Comprobar `409`.
4. Crear un bloqueo en un horario libre.
5. Comprobar que funciona.
6. Crear un bloqueo sobre una cita cancelada.
7. Comprobar que no se rechaza por esa cita.
8. Verificar que el bloqueo continúa afectando la disponibilidad pública.

---

# 5. M3 — Impedir reservas y reagendas en fechas pasadas

## 5.1 Problema

El frontend impide seleccionar fechas anteriores mediante controles de interfaz.

Sin embargo, el backend actualmente puede aceptar determinadas fechas pasadas enviadas directamente mediante API.

La seguridad y las reglas de negocio no deben depender del frontend.

## 5.2 Requisito

El backend debe rechazar cualquier intento de:

* crear una cita en una fecha anterior al día actual;
* reagendar una cita a una fecha anterior al día actual.

## 5.3 Aplicación

La validación debe existir en la capa de servicio, no únicamente en React.

Debe aplicarse a:

```text
POST /api/appointments
POST /api/admin/appointments/:id/reschedule
```

## 5.4 Regla

Comparar utilizando la zona horaria configurada por la aplicación.

No utilizar una comparación UTC que pueda producir errores alrededor de medianoche.

## 5.5 Comportamiento

Una fecha anterior al día actual debe producir:

```text
HTTP 400
```

o el código de error de validación de negocio ya establecido por el proyecto.

No modificar innecesariamente el formato actual de errores.

## 5.6 Pruebas

Agregar pruebas para:

1. Crear cita con fecha de ayer → rechazado.
2. Crear cita con fecha actual → comportamiento actual conservado.
3. Crear cita con fecha futura → funciona.
4. Reagendar a ayer → rechazado.
5. Reagendar a fecha futura → funciona.
6. Mantener intacta la regresión existente.

---

# 6. M4 — Desactivación de dentistas y tratamientos con citas futuras

## 6.1 Problema

Actualmente un dentista o tratamiento puede ser desactivado aunque existan citas futuras activas relacionadas.

Esto puede dejar una agenda inconsistente:

```text
Dentista desactivado
       +
Cita futura CONFIRMED
       ↓
La cita existe pero el recurso deja de estar disponible
```

## 6.2 Objetivo

Evitar que una operación administrativa deje citas futuras activas en un estado incoherente.

## 6.3 Regla recomendada

Antes de desactivar un dentista o tratamiento, buscar citas futuras en estados:

```text
PENDING
CONFIRMED
```

Si existen, la desactivación debe ser rechazada.

## 6.4 Respuesta

Utilizar:

```text
HTTP 409 Conflict
```

La respuesta debe indicar que existen citas futuras activas asociadas al recurso.

## 6.5 Excepciones

Las citas:

```text
CANCELLED
COMPLETED
```

no deben impedir la desactivación.

## 6.6 Dentista

Para un dentista:

```text
Dentist.isActive = false
```

solo debe ejecutarse si no existen citas futuras activas.

## 6.7 Tratamiento

Para un tratamiento:

```text
Treatment.isActive = false
```

solo debe ejecutarse si no existen citas futuras activas.

## 6.8 Reactivación

La activación:

```text
isActive = true
```

no debe estar bloqueada por citas históricas.

## 6.9 Pruebas

Dentistas:

1. Dentista sin citas futuras → desactivación correcta.
2. Dentista con cita `CONFIRMED` futura → `409`.
3. Dentista con cita `PENDING` futura → `409`.
4. Dentista con solo citas canceladas → puede desactivarse.
5. Dentista con solo citas completadas → puede desactivarse.
6. Reactivación correcta.

Tratamientos:

1. Tratamiento sin citas futuras → desactivación correcta.
2. Tratamiento con cita `CONFIRMED` futura → `409`.
3. Tratamiento con cita `PENDING` futura → `409`.
4. Solo citas terminales → puede desactivarse.
5. Reactivación correcta.

---

# 7. M5 — Protección de datos personales en confirmación pública

## 7.1 Problema

Actualmente:

```text
GET /api/appointments/:id
```

utiliza un ID secuencial.

La respuesta puede exponer:

* nombre;
* apellido;
* email;
* teléfono.

Aunque existe rate limiting, un ID secuencial facilita la enumeración de reservas.

## 7.2 Objetivo

Reducir la exposición de datos personales sin romper innecesariamente el flujo público existente.

## 7.3 Principio

La confirmación pública no necesita entregar más información personal de la necesaria para que el paciente confirme visualmente su reserva.

## 7.4 Requisito mínimo

Evaluar y aplicar una de estas estrategias, priorizando la compatibilidad:

### Opción preferida

Introducir un identificador público opaco para la consulta de confirmación.

Ejemplo conceptual:

```text
/api/appointments/confirmation/:token
```

El token no debe ser el ID secuencial.

Debe utilizarse un mecanismo seguro y no predecible.

### Alternativa

Mantener temporalmente el endpoint por ID, pero minimizar los datos personales devueltos.

Como mínimo, considerar enmascarar:

```text
email
phone
```

## 7.5 Compatibilidad

No eliminar el endpoint actual sin analizar previamente su utilización por:

* frontend;
* página de confirmación;
* tests;
* documentación.

Si se introduce un endpoint nuevo, mantener el anterior temporalmente si es necesario para no romper el contrato público.

## 7.6 Relación con futura gestión de citas

La solución debe ser compatible con la futura gestión mediante token privado de cancelación/reagendamiento.

No implementar todavía el autoservicio completo del paciente.

## 7.7 Pruebas

Verificar:

1. Un identificador secuencial no permite obtener arbitrariamente datos sensibles adicionales.
2. El nuevo mecanismo, si se implementa, utiliza identificadores no predecibles.
3. La página de confirmación continúa funcionando.
4. Los datos necesarios para mostrar la cita siguen disponibles.
5. Tokens administrativos y `passwordHash` nunca aparecen.
6. Rate limiting continúa funcionando.

---

# 8. M6 — Evento `appointment.created` durante reagendamiento

## 8.1 Problema

Actualmente un reagendamiento produce:

```text
appointment.cancelled
appointment.rescheduled
```

pero la nueva cita creada durante la operación no emite:

```text
appointment.created
```

Esto puede dificultar automatizaciones futuras.

## 8.2 Requisito

Cuando un reagendamiento cree correctamente una nueva cita, debe emitirse:

```text
appointment.created
```

para la nueva cita.

El evento debe indicar:

```text
source = ADMIN
```

cuando corresponda.

## 8.3 Orden de eventos

El orden debe representar correctamente la operación.

La secuencia recomendada es:

```text
appointment.cancelled
        ↓
appointment.created
        ↓
appointment.rescheduled
```

La implementación debe mantener una semántica coherente con el contrato actual de `appointment.rescheduled`.

Si el diseño existente demuestra que otro orden es técnicamente más correcto, documentarlo antes de cambiarlo.

## 8.4 Post-commit

Todos los eventos deben seguir emitiéndose:

```text
DESPUÉS del éxito de la operación de dominio
```

Nunca dentro de una transacción que todavía pueda hacer rollback.

## 8.5 Aislamiento

Un error de una acción de automatización no debe:

* cancelar una cita;
* revertir un reagendamiento;
* producir un error HTTP;
* romper la transacción.

## 8.6 Pruebas

Agregar pruebas para:

1. Reagendar correctamente una cita.
2. Comprobar emisión de `appointment.created`.
3. Comprobar emisión de `appointment.cancelled`.
4. Comprobar emisión de `appointment.rescheduled`.
5. Verificar datos de la nueva cita.
6. Verificar `source = ADMIN`.
7. Verificar que un fallo de un listener no afecta la operación.

---

# 9. Requisitos generales de seguridad

La Fase 10 debe mantener:

* autenticación administrativa;
* rate limiting;
* validación Zod;
* separación entre rutas públicas y administrativas;
* no exposición de `passwordHash`;
* no exposición de tokens privados;
* no exposición de `conflictKey`;
* no confiar exclusivamente en validaciones frontend.

---

# 10. Compatibilidad con automatización

La Fase 10 debe conservar el módulo:

```text
backend/src/automation/
```

y su arquitectura actual.

No introducir:

* WhatsApp;
* email;
* SMS;
* Twilio;
* SendGrid;
* proveedores externos;
* cron jobs de producción;
* campañas;
* mensajes automáticos reales.

Estas funcionalidades pertenecen a una futura etapa de automatización de negocio.

---

# 11. Pruebas de regresión

Antes de considerar la Fase 10 terminada deben ejecutarse:

## Backend

```text
npm test
npm run lint
npm run build
```

La suite existente debe permanecer completamente verde.

Como referencia inicial:

```text
112/112 tests
```

Los nuevos tests deben aumentar ese número sin eliminar pruebas existentes.

## Frontend

Ejecutar:

```text
npm run lint
npm run build
```

No deben aparecer errores ni warnings nuevos relacionados con la Fase 10.

---

# 12. Estrategia de implementación

La implementación debe dividirse en grupos para reducir riesgo.

## Grupo A

```text
M1
M2
M3
```

Después:

```text
tests
lint
build
regresión completa
```

No avanzar si falla alguna prueba crítica.

## Grupo B

```text
M4
M5
M6
```

Después:

```text
tests
lint
build
regresión completa
```

No implementar el Grupo B hasta que el Grupo A esté estable.

---

# 13. Git

Cada grupo debe quedar en un commit independiente.

### Grupo A

Mensaje sugerido:

```text
fix(etapa-10): harden appointment availability rules
```

### Grupo B

Mensaje sugerido:

```text
fix(etapa-10): harden admin lifecycle and automation events
```

No realizar `push` automáticamente.

El trabajo debe detenerse después de cada commit hasta recibir autorización.

---

# 14. Criterios de aceptación

La Fase 10 se considera terminada cuando:

* [ ] COMPLETED libera `conflictKey`.
* [ ] Un horario completado puede volver a reservarse.
* [ ] Un bloqueo no puede ocultar una cita activa existente.
* [ ] Las fechas pasadas son rechazadas por backend.
* [ ] Dentistas con citas futuras activas no pueden desactivarse sin una regla explícita.
* [ ] Tratamientos con citas futuras activas no pueden desactivarse sin una regla explícita.
* [ ] La exposición pública de datos personales queda mitigada.
* [ ] La confirmación pública continúa funcionando.
* [ ] El reagendamiento genera los eventos de automatización definidos.
* [ ] Los eventos continúan siendo post-commit.
* [ ] Un fallo de una acción de automatización no rompe la operación.
* [ ] Todas las pruebas existentes continúan pasando.
* [ ] Las nuevas pruebas cubren cada corrección.
* [ ] Backend lint OK.
* [ ] Backend build OK.
* [ ] Frontend lint OK.
* [ ] Frontend build OK.
* [ ] Git working tree limpio después de cada commit.
* [ ] No se implementaron proveedores externos ni automatizaciones comerciales.

---

# 15. Fuera de alcance

La Fase 10 NO incluye:

* autoservicio de pacientes;
* login mediante RUT;
* cancelación pública mediante RUT;
* reagendamiento público;
* WhatsApp;
* email automático;
* SMS;
* campañas;
* CRM;
* recuperación de pacientes;
* recordatorios reales;
* integración con proveedores externos;
* facturación;
* pagos;
* multi-clínica;
* roles administrativos adicionales.

Estas funcionalidades deberán definirse en especificaciones posteriores.

---

# 16. Principio final

La Fase 10 no debe convertir el sistema en una arquitectura nueva.

Su objetivo es llevar la implementación existente desde:

```text
FUNCIONA
```

hacia:

```text
FUNCIONA
   +
REGLAS DE NEGOCIO CONSISTENTES
   +
SEGURIDAD
   +
DATOS PROTEGIDOS
   +
EVENTOS COHERENTES
   +
PRUEBAS
```

La automatización comercial será construida posteriormente sobre esta base.
