# SEDALP

Aplicación SPA construida con Vue 3, Vite y Metronic 9 Tailwind.

## Requisitos

- Node.js `^22.18.0` o `>=24.12.0`
- npm

## Comandos

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Estructura del proyecto

```text
src/
├── assets/
│   ├── metronic/        # Fuentes CSS/JS originales de Metronic
│   └── main.css         # Punto de entrada de estilos de la aplicación
├── components/
│   └── layout/          # Header, sidebar, footer y piezas reutilizables del layout
├── layouts/             # Contenedores de páginas con RouterView
├── router/              # Rutas y metadatos de navegación
├── utils/               # Adaptadores e inicialización de librerías
└── views/               # Páginas asociadas a rutas
    ├── account/
    │   └── IntegrationsView.vue
    ├── public-profile/
    │   └── PublicProfileDefaultView.vue
    └── DashboardView.vue

public/
├── css/                 # Bundles compilados de Metronic
├── js/                  # Scripts compilados de Metronic
├── media/               # Imágenes, iconos y logotipos
└── vendors/             # Dependencias estáticas del tema
```

### Convenciones

- Una vista que sea destino de Vue Router pertenece a `src/views`.
- Las vistas se agrupan por dominio cuando exista más de una sección funcional.
- Los componentes compartidos pertenecen a `src/components`.
- Los contenedores que definen la estructura visual global pertenecen a `src/layouts`.
- El código de Metronic se mantiene aislado en `src/assets/metronic`; no se mezcla con componentes de negocio.
- Los imports internos usan el alias `@`, que apunta a `src`.
- Las vistas del router se cargan de forma diferida para separar el bundle por página.

## Integración con Metronic

La integración sigue la guía oficial de Metronic para Vue:

1. Los fuentes de Metronic están en `src/assets/metronic`.
2. Los recursos multimedia y bundles estáticos están en `public`.
3. `src/assets/main.css` importa los estilos del tema y KeenIcons.
4. `src/main.js` aplica el tema antes de montar Vue y carga los scripts de Metronic.
5. `src/router/index.js` reinicializa las instancias visuales después de cada navegación.

Documentación oficial:

- [Integración de Metronic con Vue](https://keenthemes.com/metronic/tailwind/docs/getting-started/integration/vue)
- [Documentación de Metronic Tailwind](https://keenthemes.com/metronic/tailwind/docs/)

> Metronic es un producto con licencia. Conserva los archivos originales descargados y revisa la licencia correspondiente antes de desplegar el proyecto.
