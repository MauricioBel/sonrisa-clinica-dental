# Auditoría preliminar: Sonrisa Clínica Dental

- **Fecha:** 2026-10-10
- **Rama:** `auditoria/randy` (commit base `45d67f8`)
- **Alcance:** revisión estática del código, solo lectura. No se ejecutó la app, ni los tests, ni el build, ni las migraciones.

## Leyenda

| Marca | Significado |
|---|---|
| ✅ **Verificado** | Se comprobó leyendo el código o la configuración en la línea citada. |
| 🔶 **Deducción** | Es una inferencia sobre el comportamiento en tiempo de ejecución o en despliegue. No se reprodujo; debe confirmarse ejecutándolo. |

---

## 1. Orientación

### 1.1 Qué hace la app
Es una web full-stack para una clínica dental ficticia de Providencia (Santiago).
- **Sitio público** (React SPA). Tiene inicio, tratamientos con detalle, equipo, FAQ, contacto, reserva de horas (`/agendar-hora`) y confirmación de reserva, además de un chatbot y un botón de WhatsApp. ✅ [frontend/src/App.tsx:79-90](../frontend/src/App.tsx#L79-L90)
- **Panel admin** en `/admin` y `/admin/citas`, protegido por sesión. ✅ [frontend/src/App.tsx:91-97](../frontend/src/App.tsx#L91-L97)
- **Chatbot** en `POST /api/chat`. Usa Gemini u OpenAI y, si no hay API key, responde con mensajes predefinidos. ✅ [backend/src/services/chat.service.ts:247-307](../backend/src/services/chat.service.ts#L247-L307)
- **Bot de WhatsApp** que corre como proceso aparte (`npm run whatsapp:init`). ✅ [backend/package.json:21](../backend/package.json#L21)
- **Soporte inicial para varias clínicas**: modelo `Clinica` y `clinicaId` en `Appointment` y `AdminUser`. ✅ [backend/prisma/schema.prisma:89-122](../backend/prisma/schema.prisma#L89-L122)

### 1.2 Cómo se levanta en local
1. Ejecutar `npm install` en la raíz, en `frontend/` y en `backend/`. En la raíz, el `postinstall` ejecuta `prisma skills sync`. ✅ [package.json:4](../package.json#L4)
2. Crear `backend/.env` con estas variables:
   - `DATABASE_URL` (Postgres) y `DIRECT_URL`
   - `SESSION_SECRET`
   - Opcionalmente `GEMINI_API_KEY` y `OPENAI_API_KEY`

   Si `DATABASE_URL` no está definida, se usa `postgres:postgres@localhost:5432/sonrisa_dental`. ✅ [backend/src/config/env.ts:26-29](../backend/src/config/env.ts#L26-L29)
3. En `backend/`, ejecutar `npm run prisma:generate`, después las migraciones o `prisma db push`, y después `npm run seed`.
4. En la raíz, ejecutar `npm run dev`. Arranca Vite en el puerto 5173 y la API en el 4000; el proxy `/api` de Vite redirige a la API. ✅ [frontend/vite.config.ts:8-14](../frontend/vite.config.ts#L8-L14)

**Obstáculos detectados al levantar el proyecto:**

| # | Hallazgo | Estado |
|---|---|---|
| O1 | El README dice que la base de datos es SQLite, pero el schema usa PostgreSQL. [README.md:5](../README.md#L5), [README.md:14](../README.md#L14), [schema.prisma:10](../backend/prisma/schema.prisma#L10) | ✅ Verificado |
| O2 | `migration_lock.toml` indica `sqlite`, así que las migraciones existentes son de la época SQLite. [migration_lock.toml:3](../backend/prisma/migrations/migration_lock.toml#L3) | ✅ Verificado |
| O3 | Por O2, `prisma migrate dev` contra Postgres probablemente falle. | 🔶 Deducción |
| O4 | El `datasource` no tiene `url` y no existe `prisma.config.ts`, ni en la raíz ni en `backend/`. [schema.prisma:9-11](../backend/prisma/schema.prisma#L9-L11) | ✅ Verificado |
| O5 | Por O4, la CLI de Prisma 7 (migrate, `db seed`) no sabrá a qué base conectarse, y `npm run seed` ([backend/package.json:20](../backend/package.json#L20)) no tiene configurado el comando de seed. | 🔶 Deducción |
| O6 | Las versiones de Prisma no coinciden: la raíz usa `prisma ^8.0.0-rc.17` y el backend `prisma ^7.10.0`. [package.json:9](../package.json#L9), [backend/package.json:54](../backend/package.json#L54) | ✅ Verificado |
| O7 | `backend/.env.example` tiene un `\n` literal, así que las dos variables quedan en una sola línea. [backend/.env.example:1](../backend/.env.example#L1) | ✅ Verificado |
| O8 | `instrucciones.txt` no contiene instrucciones: es un error de Prisma pegado ahí (`prisma.treatment.findMany()`). [instrucciones.txt:1](../instrucciones.txt#L1) | ✅ Verificado |
| O9 | `config.json` (raíz) y `frontend/public/config.json` tienen contenido distinto. El frontend carga el de `public/`. [frontend/src/lib/config.ts:32](../frontend/src/lib/config.ts#L32) | ✅ Verificado |

### 1.3 Flujo de una petición (ejemplo: `GET /api/treatments`)
```
useTreatments()                      frontend/src/hooks/useTreatments.ts
 → api.getTreatments() → fetch       frontend/src/lib/api.ts
 → proxy Vite /api → :4000           frontend/vite.config.ts:10
 → helmet → cors → json → session → apiLimiter   backend/src/app.ts:28-69
 → treatmentsRouter GET /            backend/src/routes/treatments.routes.ts
 → listTreatments()                  backend/src/controllers/public.controller.ts:4
 → prisma.treatment.findMany()       backend/src/lib/prisma.ts (PrismaClient + PrismaPg)
 → PostgreSQL → { data: [...] }
```
- ✅ Si la API falla, el frontend muestra `FALLBACK_TREATMENTS` sin avisar al usuario, así que la web puede parecer funcional aunque no haya base de datos. [frontend/src/hooks/useTreatments.ts:24-27](../frontend/src/hooks/useTreatments.ts#L24-L27)
- ✅ Una reserva pasa por `bookingLimiter`, luego por la validación zod y luego por `createAppointment`, que comprueba la disponibilidad y abre una transacción con chequeo de solapamiento. Como última barrera hay un índice único. [appointment.service.ts:64-78](../backend/src/services/appointment.service.ts#L64-L78), [schema.prisma:93](../backend/prisma/schema.prisma#L93)
- ✅ En Vercel, `/api/*` se sirve con `backend/src/app.ts` y el resto con el build estático del frontend. [vercel.json](../vercel.json)

### 1.4 Estado del ROADMAP.md
Ninguna casilla de [ROADMAP.md](../ROADMAP.md) está marcada, pero el código indica lo siguiente:

| Fase | Evidencia | Estado |
|---|---|---|
| 1. Tema oscuro solo en `/admin` | `index.html` no tiene clase de tema ([frontend/index.html:2](../frontend/index.html#L2)). `ThemeContext` detecta `/admin` y pone `theme-light` en el resto ([ThemeContext.tsx:37](../frontend/src/context/ThemeContext.tsx#L37), [ThemeContext.tsx:63](../frontend/src/context/ThemeContext.tsx#L63)) | ✅ Hecha en código |
| 2. Restaurar la landing | Secciones "Especialistas a tu Servicio" y "Testimonios" con fondo `bg-slate-50` ([HomePage.tsx:252](../frontend/src/pages/HomePage.tsx#L252), [HomePage.tsx:304](../frontend/src/pages/HomePage.tsx#L304)) | 🔶 Parece hecha. No se revisó visualmente el contraste ni la 4ª tarjeta |
| 3. Imágenes de tratamientos | Hay 8 ítems en `fallbackData.ts`. `TreatmentCard` usa `aspect-[3/2]` y `onError` ([TreatmentCard.tsx:17](../frontend/src/components/TreatmentCard.tsx#L17), [TreatmentCard.tsx:23](../frontend/src/components/TreatmentCard.tsx#L23)) | ✅ Hecha, pero con `.webp` y nombres distintos a los `.jpg` del roadmap |
| 4. Footer y build | `<Footer />` está en el layout ([Layout.tsx:22](../frontend/src/components/layout/Layout.tsx#L22)) | ✅ Footer hecho. 🔶 No se comprobó que el build compile |

### 1.5 Carpetas `.claude`, `.agents`, `.cursor` y `.devin`
- ✅ Las cuatro tienen exactamente el mismo contenido (comprobado con `diff -r`): las skills `prisma-platform-core-concepts` y `prisma-composer-core-concepts`.
- ✅ Llegaron en el merge `57a154d` de MauricioBel.
- 🔶 Las genera `prisma skills sync` ([package.json:4](../package.json#L4)) para cada asistente de IA: Claude Code, agentes genéricos, Cursor y Devin. Son documentación para esos asistentes y la app no las usa.

---

## 2. Arquitectura del backend

Es un **monolito Express en capas** (TypeScript, ESM):
```
server.ts (local) ─┐
vercel.ts (serverless) ─┴→ createApp()   backend/src/app.ts:21
  middleware global → routes/ (HTTP + validación zod + rate limit)
  → controllers/ y services/ (lógica) → lib/prisma.ts (cliente único) → PostgreSQL
  → errores: notFound → prismaErrorHandler → errorHandler   app.ts:79-81
```

| # | Observación | Estado |
|---|---|---|
| A1 | La factory `createApp()` la reutilizan el arranque local y el serverless. [server.ts](../backend/src/server.ts), [vercel.ts](../backend/src/vercel.ts) | ✅ Verificado |
| A2 | Los errores siguen un contrato único (`{ data }` / `{ error: { code, message } }`) gracias a `ApiError` y al manejador centralizado. [errors.ts:40-84](../backend/src/middleware/errors.ts#L40-L84) | ✅ Verificado |
| A3 | La separación de capas no es consistente: `public.controller.ts` consulta Prisma directamente, como si fuera un servicio. [public.controller.ts:7](../backend/src/controllers/public.controller.ts#L7) | ✅ Verificado |
| A4 | Hay lógica de sesión dentro de la ruta de login en vez de en un servicio. [admin.routes.ts:14-17](../backend/src/routes/admin.routes.ts#L14-L17) | ✅ Verificado |
| A5 | El chat lee `frontend/public/config.json` del disco, lo que acopla el backend con el frontend. [chat.service.ts:42-44](../backend/src/services/chat.service.ts#L42-L44) | ✅ Verificado |
| A6 | Por A5, en Vercel ese archivo no estará en el bundle del backend: el chat lanzará "No se pudo cargar la configuración" y devolverá 500. | 🔶 Deducción |
| A7 | El bot de WhatsApp es un proceso aparte dentro del mismo paquete y no comparte lógica ni datos con la API. [whatsappService.ts](../backend/src/services/whatsappService.ts) | ✅ Verificado |
| A8 | No hay tests automatizados; `test-connection.js` y `test-concurrencia.js` son scripts manuales. | ✅ Verificado |
| A9 | El cliente Prisma generado (`backend/src/generated/prisma`) está versionado en git. | ✅ Verificado |

---

## 3. Seguridad

### Críticas

| # | Hallazgo | Ubicación | Estado |
|---|---|---|---|
| S1 | **IDOR / exposición de datos de pacientes.** `GET /api/appointments/:id` no exige autenticación y los IDs son autoincrementales. Devuelve nombre, email, teléfono y comentario, y el comentario puede contener información de salud. El límite de 120 peticiones cada 15 min por IP solo ralentiza la enumeración. | [appointments.routes.ts:36-45](../backend/src/routes/appointments.routes.ts#L36-L45), [appointment.service.ts:113](../backend/src/services/appointment.service.ts#L113), [rateLimit.ts:39-45](../backend/src/middleware/rateLimit.ts#L39-L45), [schema.prisma:76](../backend/prisma/schema.prisma#L76) | ✅ Verificado (código). 🔶 No se explotó en vivo |
| S2 | **Hash de contraseñas débil.** Se usa SHA-256 sin salt ni coste, y la comparación con `!==` no es de tiempo constante. | [admin.service.ts:6-8](../backend/src/services/admin.service.ts#L6-L8), [admin.service.ts:16](../backend/src/services/admin.service.ts#L16), [seed.ts:17](../backend/prisma/seed.ts#L17) | ✅ Verificado |
| S3 | **Credenciales de admin fijas en el código**: `admin@sonrisadental.cl` / `admin123`, y además se imprimen en la consola. | [seed.ts:364-365](../backend/prisma/seed.ts#L364-L365), [seed.ts:370](../backend/prisma/seed.ts#L370) | ✅ Verificado |
| S4 | **La sesión de WhatsApp Web está versionada en git** (`backend/.wwebjs_auth/`) y no está en ningún `.gitignore`. | [whatsappService.ts:29](../backend/src/services/whatsappService.ts#L29), [.gitignore](../.gitignore), [backend/.gitignore](../backend/.gitignore) | ✅ Verificado que está en git. 🔶 No se sabe si la sesión sigue activa ni si alguien podría usarla para suplantar la cuenta |

### Altas

| # | Hallazgo | Ubicación | Estado |
|---|---|---|---|
| S5 | **El login no tiene un rate limit propio**: solo aplica el general de 300 peticiones cada 15 min, lo que permite fuerza bruta. Con S3 el riesgo aumenta. | [admin.routes.ts:10-19](../backend/src/routes/admin.routes.ts#L10-L19), [rateLimit.ts:18-24](../backend/src/middleware/rateLimit.ts#L18-L24) | ✅ Verificado |
| S6 | **`SESSION_SECRET` tiene un valor por defecto** y el servidor no se niega a arrancar si falta la variable. | [env.ts:30](../backend/src/config/env.ts#L30) | ✅ Verificado |
| S7 | **`NODE_ENV` vale `development` por defecto**, y en ese modo las respuestas 500 incluyen el stack trace. | [env.ts:23](../backend/src/config/env.ts#L23), [errors.ts:79-81](../backend/src/middleware/errors.ts#L79-L81) | ✅ Verificado (código). 🔶 Que en producción quede sin definir es una suposición |
| S8 | **No se regenera la sesión al hacer login**, lo que permite fijación de sesión. | [admin.routes.ts:15-16](../backend/src/routes/admin.routes.ts#L15-L16) | ✅ Verificado |
| S9 | **No se configura un `store` de sesión**, así que se usa el `MemoryStore` por defecto de express-session. | [app.ts:56-67](../backend/src/app.ts#L56-L67) | ✅ Verificado |
| S10 | Por S9: en producción el `MemoryStore` pierde memoria con el tiempo, y en Vercel cada instancia tiene su propia memoria, así que las sesiones se pierden entre peticiones. | [app.ts:56-67](../backend/src/app.ts#L56-L67) | 🔶 Deducción |
| S11 | **`trust proxy` vale 0 por defecto.** | [env.ts:31](../backend/src/config/env.ts#L31), [app.ts:43](../backend/src/app.ts#L43) | ✅ Verificado |
| S12 | Por S11, detrás de un proxy: (a) todos los clientes comparten el contador del rate limit, porque llegan con la IP del proxy; (b) con `secure: true`, express-session no enviaría la cookie y el login en producción fallaría. | [app.ts:63](../backend/src/app.ts#L63) | 🔶 Deducción |
| S13 | **`/api/chat` es público y llama a APIs de pago sin un límite propio**, lo que permite abuso de costos. | [app.ts:77](../backend/src/app.ts#L77), [chat.routes.ts:9-17](../backend/src/routes/chat.routes.ts#L9-L17) | ✅ Verificado. 🔶 El impacto en costos es estimado |
| S14 | **Prompt injection.** El cliente envía el `history`, que acepta mensajes con `role: 'assistant'` y `content` sin límite de largo, así que puede inventar respuestas previas del bot. Con Gemini, el prompt de sistema se manda dentro del mensaje del usuario. | [chat.ts:4-5](../backend/src/schemas/chat.ts#L4-L5), [chat.service.ts:257-267](../backend/src/services/chat.service.ts#L257-L267) | ✅ Verificado |

### Medias

| # | Hallazgo | Ubicación | Estado |
|---|---|---|---|
| S15 | **El cliente decide el `clinicaId`** al reservar. Si no lo envía, se usa `'default'`, una clínica que el seed no crea. | [validation.ts:39](../backend/src/schemas/validation.ts#L39), [appointment.service.ts:72](../backend/src/services/appointment.service.ts#L72), [appointment.service.ts:103](../backend/src/services/appointment.service.ts#L103) | ✅ Verificado |
| S16 | Por S15, una reserva sin `clinicaId` falla con un error de clave foránea (500). | — | 🔶 Deducción |
| S17 | **Inconsistencia entre clínicas**: la consulta de disponibilidad no filtra por `clinicaId`, pero la revisión de solapamiento sí, y el índice único incluye `clinicaId`. | [availability.service.ts:124-129](../backend/src/services/availability.service.ts#L124-L129), [appointment.service.ts:66-72](../backend/src/services/appointment.service.ts#L66-L72), [schema.prisma:93](../backend/prisma/schema.prisma#L93) | ✅ Verificado |
| S18 | **Sin protección CSRF explícita.** La autenticación va por cookie, no hay token CSRF y no se define `sameSite`. Exigir JSON lo mitiga en parte. | [app.ts:60-65](../backend/src/app.ts#L60-L65) | ✅ Verificado (configuración). 🔶 No se probó si es explotable |
| S19 | **CORS no permite `PATCH`.** Cambiar el estado de una cita desde otro origen fallaría (es un bug funcional, no un riesgo de seguridad). | [app.ts:48](../backend/src/app.ts#L48), [admin.routes.ts:53](../backend/src/routes/admin.routes.ts#L53) | ✅ Verificado (código). 🔶 Solo afecta si frontend y API están en orígenes distintos |
| S20 | **El bot de WhatsApp escribe datos personales en los logs**: mensajes, nombres y números de los pacientes. | [whatsappService.ts:127](../backend/src/services/whatsappService.ts#L127), [whatsappService.ts:168](../backend/src/services/whatsappService.ts#L168) | ✅ Verificado |
| S21 | **El bot lanza Chromium sin sandbox** (`--no-sandbox`, `--disable-web-security`). | [whatsappService.ts:34](../backend/src/services/whatsappService.ts#L34), [whatsappService.ts:42](../backend/src/services/whatsappService.ts#L42) | ✅ Verificado |
| S22 | whatsapp-web.js no es una librería oficial, así que existe riesgo de que WhatsApp bloquee el número. | [backend/package.json:37](../backend/package.json#L37) | 🔶 Deducción |

### Bajas

| # | Hallazgo | Ubicación | Estado |
|---|---|---|---|
| S23 | `/api/health` expone el `uptime` del proceso. | [health.routes.ts:10](../backend/src/routes/health.routes.ts#L10) | ✅ Verificado |
| S24 | La cookie de sesión usa el nombre por defecto (`connect.sid`), que delata el stack. | [app.ts:57](../backend/src/app.ts#L57) | ✅ Verificado |
| S25 | El script de prueba desactiva la verificación TLS (`rejectUnauthorized: false`). | [test-connection.js:34](../backend/test-connection.js#L34) | ✅ Verificado |
| S26 | El `postinstall` de la raíz ejecuta una versión RC de Prisma en cada instalación. | [package.json:4](../package.json#L4), [package.json:9](../package.json#L9) | ✅ Verificado |
| S27 | Hay archivos ajenos versionados: `sonrisa-codigo.zip`, `backend/.wwebjs_cache/` y `test.txt`. | raíz del repo | ✅ Verificado |
| S28 | Se guardan datos personales y de salud sin política de retención. Conviene revisarlo frente a la Ley 19.628 y la Ley 21.719 (Chile). | [schema.prisma:75-98](../backend/prisma/schema.prisma#L75-L98) | 🔶 Deducción (requiere revisión legal) |

### Comprobado sin hallazgos
- ✅ No hay credenciales reales en el repo. Los `.env.example` tienen placeholders y `env.ts` solo trae un valor por defecto para localhost.
- ✅ helmet está activo con CSP restrictiva y `x-powered-by` está desactivado ([app.ts:24-40](../backend/src/app.ts#L24-L40)).
- ✅ El body JSON está limitado a 50 kb ([app.ts:54](../backend/src/app.ts#L54)).
- ✅ Los endpoints de admin filtran por el `clinicaId` de la sesión y hay un 403 si una cita es de otra clínica ([admin.service.ts:86-88](../backend/src/services/admin.service.ts#L86-L88)).
- ✅ Toda la entrada se valida con zod.

---

## 4. Prioridades sugeridas
1. **S1**: exigir autenticación en `GET /api/appointments/:id` o reemplazar el ID por un token aleatorio.
2. **S4**: cerrar la sesión de WhatsApp desde el teléfono, sacar `.wwebjs_auth` del repo y añadirlo a `.gitignore`. Como sigue en el historial de git, valorar también limpiar el historial.
3. **S2, S3 y S5**: usar bcrypt o argon2, eliminar `admin123` y añadir un rate limit al login.
4. **S6 a S12**: que el servidor no arranque en producción sin `SESSION_SECRET` ni `NODE_ENV`, regenerar la sesión en el login, usar un store persistente (por ejemplo Postgres) y configurar `TRUST_PROXY`.
5. **S13 y S14**: añadir un rate limit al chat y no aceptar mensajes `assistant` enviados por el cliente (guardar el historial en el servidor).
6. **O1 a O7**: dejar el proyecto levantable: README, migraciones de Postgres, `prisma.config.ts` y la configuración del seed.
