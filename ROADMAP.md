# ROADMAP DE CORRECCIÓN: Aislamiento de Temas, Restauración UI e Integración Gráfica

## Contexto y Diagnóstico
La refactorización previa aplicó la clase `theme-dark-classic` de manera global en `index.html`. Esto provocó un choque visual en la Landing Page pública (`/`): tarjetas oscuras con texto ilegible, títulos desaparecidos por falta de contraste, la 4ª tarjeta de dentistas rota y la omisión del `<Footer />`.

## Objetivo
1. Aislar el tema oscuro exclusivamente a la ruta `/admin` (Dashboard).
2. Restaurar la Landing Page (`/`) a un tema claro, profesional y de alto contraste (cumpliendo WCAG AA).
3. Estructurar e integrar la sección de Tratamientos con 8 tarjetas con soporte de imagen en proporción 3:2.

---

### 🟢 FASE 1: Aislamiento de Ámbito (Scope Isolation)

- [ ] **1.1 Desacoplar tema global en HTML:**
  - Remover `class="theme-dark-classic"` por defecto del archivo `index.html`.
- [ ] **1.2 Control dinámico de temas según la ruta:**
  - En `ThemeContext.tsx` / `App.tsx`, forzar que la ruta pública (`/`) aplique tema claro (`theme-light` o variables por defecto de fondo blanco/slate-50).
  - Asegurar que `theme-dark-classic` o `theme-mint-green` solo se activen dentro de la ruta `/admin/*` (`DashboardLayout`).

---

### 🟢 FASE 2: Restauración de Secciones en Landing Page (`/`)

- [ ] **2.1 Sección Beneficios (Debajo de Hero):**
  - Restaurar fondo claro (`bg-white` o `bg-slate-50`) en las tarjetas.
  - Título interno en gris oscuro (`text-slate-900`) y descripción en (`text-slate-600`).
  - Ajustar el contenedor de iconos con un fondo suave sin reflejos estridentes.

- [ ] **2.2 Sección Tratamientos Destacados:**
  - Restaurar el título visible de sección: `"Tratamientos Destacados"` (`text-3xl font-bold text-slate-900`).
  - Corregir el botón "Ver tratamientos" para que no quede en blanco sobre blanco (`btn-primary` con buen contraste).

- [ ] **2.3 Sección Dentistas / Especialistas:**
  - Restaurar título visible: `"Especialistas a tu Servicio"`.
  - Corregir renderizado en `fallbackData.ts` / `.map()` para que la 4ª tarjeta no sea un cuadro negro vacío.
  - Ajustar botones de agendamiento en cada tarjeta a un estado activo accesible.

- [ ] **2.4 Sección Testimonios / Opiniones:**
  - Aplicar fondo claro a las tarjetas de testimonios (`bg-slate-50`), texto legible y contraste adecuado en las estrellas de valoración.

---

### 🟢 FASE 3: Estructura e Integración de Imágenes de Tratamientos

- [ ] **3.1 Actualizar datos en `fallbackData.ts`:**
  Configurar el arreglo de tratamientos con los 8 ítems, incluyendo la ruta de imagen (`imageUrl`), título, descripción corta y la imagen correspondiente en formato 3:2:

  1. **Limpieza Dental**
     - Prompt ref: `3:2 aspect ratio, happy patient with clean healthy white teeth, water splash, fresh clean aesthetic`
     - Asset: `/images/treatments/limpieza-dental.jpg`
  2. **Blanqueamiento Dental**
     - Prompt ref: `3:2 aspect ratio, close-up woman natural bright white radiant smile, soft sunlight`
     - Asset: `/images/treatments/blanqueamiento-dental.jpg`
  3. **Implantes Dentales**
     - Prompt ref: `3:2 aspect ratio, mature man smiling confidently eating fresh red apple outdoors`
     - Asset: `/images/treatments/implantes-dentales.jpg`
  4. **Ortodoncia**
     - Prompt ref: `3:2 aspect ratio, young adult holding clear invisible aligner tray near smile`
     - Asset: `/images/treatments/ortodoncia.jpg`
  5. **Carillas Dentales**
     - Prompt ref: `3:2 aspect ratio, elegant portrait looking at mirror reflection of perfect smile`
     - Asset: `/images/treatments/carillas-dentales.jpg`
  6. **Odontopediatría**
     - Prompt ref: `3:2 aspect ratio, cheerful child laughing in bright colorful pediatric dental room`
     - Asset: `/images/treatments/odontopediatria.jpg`
  7. **Endodoncia**
     - Prompt ref: `3:2 aspect ratio, relaxed patient resting comfortably in modern dental chair`
     - Asset: `/images/treatments/endodoncia.jpg`
  8. **Diseño de Sonrisa**
     - Prompt ref: `3:2 aspect ratio, happy person admiring new smile in vanity mirror`
     - Asset: `/images/treatments/diseno-sonrisa.jpg`

- [ ] **3.2 Adaptar tarjeta de componente `TreatmentCard`:**
  - Encabezado de tarjeta con contenedor de imagen `aspect-[3/2] w-full overflow-hidden rounded-t-xl`.
  - Aplicar `object-cover w-full h-full` en la etiqueta `<img>` con fallback por si la imagen no carga.

---

### 🟢 FASE 4: Footer y Verificación de Entregables

- [ ] **4.1 Restaurar `<Footer />`:**
  - Asegurar que el componente `<Footer />` esté importado y renderizado al final de la página principal.
- [ ] **4.2 Definición de Hecho (Definition of Done):**
  - La Landing Page (`/`) carga impecable en modo claro con textos de alto contraste.
  - El Dashboard (`/admin`) mantiene su selector de temas funcionando independientemente.
  - El comando `npm run build` o `vite build` compila sin errores.
