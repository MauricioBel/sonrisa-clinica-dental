# ROADMAP: Refactorización de UI y Sistema de Temas (Sonrisa Admin)

## OBJETIVO PRINCIPAL
Unificar la estructura del layout (eliminar doble sidebar) e implementar un sistema de doble tema (Tema Clásico Oscuro y Tema Verde Menta) manteniendo la retrocompatibilidad y la estabilidad en producción.

---

## FASE 1: Layout y Eliminación de Doble Sidebar
- [x] **1.1:** Unificar enlaces de navegación de la barra lateral izquierda blanca (`Dashboard`, `Citas`) en la barra lateral oscura principal.
- [x] **1.2:** Eliminar el bloque de usuario ("Administrador / Cerrar sesión") del pie de la barra lateral izquierda.
- [x] **1.3:** Reajustar el Grid/Flexbox del contenedor principal para que ocupe el 100% del ancho disponible.

## FASE 2: Infraestructura del Sistema de Temas
- [x] **2.1:** Crear variables CSS base (o tokens de diseño) para fondos, texto, tarjetas, bordes y botones.
- [x] **2.2:** Definir valores para el **Tema 1 (Clásico Oscuro)**.
- [x] **2.3:** Definir valores para el **Tema 2 (Verde Menta)**.
- [x] **2.4:** Crear estado global/helper para alternar clases de tema y guardar la preferencia en `localStorage`.

## FASE 3: Rediseño de Componentes UX/UI
- [x] **3.1:** Transformar el texto `+ Nueva Cita` en un botón sólido prominente con el color primario activo.
- [x] **3.2:** Refactorizar tarjetas de métricas del Dashboard (manejo de estados nulos en Sillones Ocupados).
- [x] **3.3:** Crear componente de "Empty State" para la tabla de citas sin registros.

## FASE 4: Persistencia y Entrega
- [ ] **4.1:** Crear el selector de temas en la pantalla de `Configuración`.
