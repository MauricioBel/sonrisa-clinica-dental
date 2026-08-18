# FASE 7 - Especificación funcional y técnica

## Estado

Fase de diseño y planificación.

La Fase 7 extiende el sistema existente de Sonrisa Clínica Dental.
No debe reemplazar la arquitectura existente ni romper funcionalidades
validadas en las fases anteriores.

---

# 1. Objetivo general

Convertir el sitio institucional y sistema de reservas existente en una
plataforma reutilizable para una clínica dental real.

La Fase 7 incorpora principalmente:

- Panel administrativo.
- Gestión operativa de citas.
- Gestión de dentistas.
- Gestión de tratamientos.
- Gestión de disponibilidad y bloqueo de horarios.
- Cancelación y reagendamiento de citas.
- Base arquitectónica para automatizaciones.

La interfaz pública existente debe mantenerse funcional.

---

# 2. Arquitectura existente

El proyecto utiliza actualmente:

## Frontend

- React
- TypeScript
- React Router
- React Hook Form
- Zod
- Tailwind CSS
- Vite

## Backend

- Node.js
- TypeScript
- Express
- Prisma
- SQLite
- Zod
- Helmet
- CORS
- express-rate-limit

La Fase 7 debe extender esta arquitectura antes que reemplazarla.

---

# 3. Panel administrativo

Debe existir una interfaz administrativa separada de la experiencia
pública del paciente.

El administrador debe poder gestionar:

- citas
- dentistas
- tratamientos
- disponibilidad
- bloqueos de agenda

El panel debe utilizar los servicios y endpoints existentes siempre
que sea técnicamente posible.

---

# 4. Gestión de citas

El sistema debe permitir gestionar el ciclo de vida de una cita.

Operaciones previstas:

- visualizar citas
- consultar detalles
- cambiar estado
- cancelar cita
- reagendar cita
- confirmar cita cuando corresponda

Los estados deben definirse antes de implementar la lógica definitiva.

Estados candidatos:

- PENDING
- CONFIRMED
- CANCELLED
- COMPLETED

No agregar estados innecesarios sin justificación.

---

# 5. Gestión de disponibilidad

El administrador debe poder:

- bloquear horarios
- impedir reservas durante períodos bloqueados
- visualizar disponibilidad
- mantener la lógica de prevención de doble reserva existente

Los bloqueos deben integrarse con el sistema actual de disponibilidad.

---

# 6. Gestión de dentistas

El administrador debe poder:

- visualizar dentistas
- agregar dentistas
- editar dentistas
- activar/desactivar dentistas

La eliminación física debe evaluarse cuidadosamente debido a posibles
citas históricas asociadas.

---

# 7. Gestión de tratamientos

El administrador debe poder:

- visualizar tratamientos
- crear tratamientos
- editar tratamientos
- activar/desactivar tratamientos

No eliminar información histórica que pueda estar relacionada con citas
existentes sin evaluar primero sus consecuencias.

---

# 8. Cancelación y reagendamiento

El sistema debe permitir que un paciente pueda:

- identificar su reserva
- cancelar una cita cuando las reglas lo permitan
- solicitar o ejecutar un reagendamiento cuando corresponda

La implementación exacta de autenticación e identificación del paciente
debe definirse antes de desarrollar esta funcionalidad.

Se considera como posibilidad futura la identificación mediante RUT.

No implementar autenticación por RUT sin definir previamente seguridad,
privacidad, validación y protección contra abuso.

---

# 9. Automatización

Debe existir una arquitectura preparada para automatizaciones.

La automatización debe mantenerse separada de las rutas HTTP y de los
componentes visuales.

Conceptualmente:

API
↓
Application / Services
↓
Domain operation
↓
Automation module
↓
Actions / notifications / scheduled tasks

Ejemplo conceptual:

Nueva cita
↓
appointment.created
↓
Automation module
↓
acciones posteriores

La primera versión debe priorizar una arquitectura extensible antes que
integraciones externas complejas.

No implementar todavía proveedores externos de WhatsApp, correo u otros
servicios sin especificación previa.

---

# 10. Seguridad

Las funcionalidades administrativas deben estar protegidas.

No se debe considerar suficiente ocultar una ruta del frontend.

La autorización debe validarse en backend.

Debe mantenerse:

- validación Zod
- Helmet
- CORS restringido
- rate limiting
- protección contra doble reserva
- manejo centralizado de errores

---

# 11. Compatibilidad

No romper:

- sistema público
- reservas existentes
- disponibilidad
- confirmación de citas
- SEO
- accesibilidad
- responsive design
- code splitting
- seguridad existente

Las pruebas existentes deben seguir pasando.

---

# 12. Reutilización

La arquitectura debe favorecer que el sistema pueda convertirse
posteriormente en una plantilla reutilizable para otras clínicas dentales.

Los elementos específicos de una clínica deben poder separarse de la
lógica general del sistema.

Ejemplos:

- nombre de clínica
- logo
- colores
- dentistas
- tratamientos
- horarios
- datos de contacto
- configuración de comunicaciones

---

# 13. Regla de implementación

Antes de implementar cada módulo:

1. inspeccionar código existente;
2. identificar componentes reutilizables;
3. identificar servicios existentes;
4. definir cambios mínimos necesarios;
5. implementar;
6. ejecutar pruebas;
7. verificar regresiones.

No realizar reescrituras completas sin justificación técnica.

---

# 14. Estado actual

Esta especificación es preliminar.

Las decisiones técnicas detalladas de las secciones de administración,
automatización, autenticación y modelo de datos deben analizarse antes de
implementar.

La Fase 7 debe desarrollarse incrementalmente.