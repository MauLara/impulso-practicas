# ImpulsoPrácticas - Guía y Arquitectura del Proyecto

Este archivo (`GEMINI.md`) define la arquitectura, reglas de estilizado y convenciones obligatorias para el desarrollo de la plataforma web de vinculación y asesoría de prácticas profesionales **ImpulsoPrácticas**.
El archivo con extensión .npmrc con legacy-peer-deps=true es obligatorio para twind/coe por lo que nunca de ser borrado o elimiando 


---

## 1. Stack Tecnológico y Enrutamiento
- **Core:** React 18+ + Vite + TypeScript en modo estricto (`"strict": true` en `tsconfig.json`).
- **Enrutamiento:** `react-router-dom` utilizando un layout raíz (`MainLayout` con `<Outlet />`) y carga diferida (`React.lazy` + `Suspense`) para las siguientes vistas:
  - `/` (Landing principal: propuesta de valor, pasos de acompañamiento, vacantes destacadas)
  - `/practicas` (Explorador de vacantes con filtros por área, modalidad y apoyo económico)
  - `/practicas/:slug` (Detalle de vacante y formulario de postulación)
  - `/empresas` (Información B2B y captación de empresas aliadas)
  - `/como-funciona` (Proceso de mentoría, preparación de CV y preguntas frecuentes)
  - `*` (Página 404 con navegación de retorno)

---

## 2. Sistema de Estilos y Diseño (Twind v1 — Cero CSS)
- **Restricción absoluta:** **Queda terminantemente prohibido crear, mantener o importar archivos `.css`**. Se deben eliminar `src/index.css` y `src/App.css` generados por defecto por Vite.
- **Herramienta exclusiva:** Todo el estilizado se realiza con **Twind v1** (`@twind/core`, `@twind/preset-autoprefix`, `@twind/preset-tailwind`).
- **Configuración y arranque obligatorio:**
  - La configuración reside exclusivamente en `src/core/theme/twind.config.ts`, definiendo tokens de marca (colores corporativos, tipografía, sombras y radios) y ejecutando `install(config)`.
  - `src/main.tsx` debe importar `./core/theme/twind.config` en la primera línea antes de renderizar `<App />` para inyectar el *preflight* y los estilos base.
  - Utilizar la utilidad `tx()` de `@twind/core` para gestionar variantes dinámicas en los componentes de `src/shared/`.

---

## 3. Arquitectura Modular y Patrones de Diseño
El proyecto aplica una arquitectura **Feature-Based** desacoplada mediante el **Patrón Repository** e inyección de dependencias con **React Context**, preparada para conectar un backend REST en el futuro sin modificar la interfaz:

```text
src/
├── core/
│   ├── domain/            # Entidades (Vacancy, Application, Company) e interfaces (IVacancyRepository, IApplicationRepository)
│   ├── router/            # Configuración centralizada de rutas, MainLayout y guards
│   └── theme/             # twind.config.ts (tokens de marca y setup de Twind)
├── infrastructure/
│   └── repositories/      # Implementaciones concretas (MockVacancyRepository, MockApplicationRepository)
├── context/               # ServicesProvider y hooks de consumo (useVacancies, useApplications)
├── shared/                # UI Kit reutilizable (Button, Card, Badge, Input, Modal, Navbar, Footer)
└── features/              # Módulos funcionales aislados
    ├── home/              # Secciones de la landing page principal
    ├── vacancies/         # Catálogo, filtros y vista de detalle de prácticas
    ├── applications/      # Flujo y formulario de postulación
    └── companies/         # Sección informativa y contacto para empresas

---

## 4. Validación y Calidad
- **Verificación obligatoria:** Antes de dar por finalizada cualquier tarea o cambio en el código, se debe ejecutar y verificar exitosamente:
  ```bash
  npm run build
  ```
  Asegurándose de que no existan errores de TypeScript, fallos de compilación ni problemas de tipos.
