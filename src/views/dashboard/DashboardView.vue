<script setup>
import { computed } from 'vue'

const todayLabel = computed(() =>
  new Intl.DateTimeFormat('es-BO', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date()),
)

// Los valores "—" deben reemplazarse con la respuesta del endpoint del dashboard.
const summaryCards = [
  {
    label: 'Regiones territoriales',
    value: '7',
    detail: 'Cobertura departamental',
    icon: 'ki-map',
    iconClass: 'bg-primary/10 text-primary',
  },
  {
    label: 'Municipios registrados',
    value: '87',
    detail: 'Departamento de La Paz',
    icon: 'ki-geolocation',
    iconClass: 'bg-success/10 text-success',
  },
  {
    label: 'Usuarios activos',
    value: '—',
    detail: 'Conectar con la API',
    icon: 'ki-people',
    iconClass: 'bg-info/10 text-info',
  },
  {
    label: 'Técnicos asignados',
    value: '—',
    detail: 'Conectar con la API',
    icon: 'ki-user-tick',
    iconClass: 'bg-warning/10 text-warning',
  },
]

const regions = [
  { name: 'Altiplano Sur', municipalities: 22, color: 'bg-primary' },
  { name: 'Altiplano Norte', municipalities: 19, color: 'bg-success' },
  { name: 'Valles Interandinos Norte', municipalities: 11, color: 'bg-info' },
  { name: 'Valles Interandinos Sur', municipalities: 11, color: 'bg-warning' },
  { name: 'Amazónica', municipalities: 9, color: 'bg-violet-500' },
  { name: 'Metropolitana', municipalities: 8, color: 'bg-cyan-500' },
  { name: 'Yungas', municipalities: 7, color: 'bg-orange-500' },
]

const totalMunicipalities = computed(() =>
  regions.reduce((total, region) => total + region.municipalities, 0),
)

const quickActions = [
  {
    title: 'Registrar personal',
    description: 'Añadir un nuevo servidor público',
    icon: 'ki-user-edit',
    to: '/staff-members/create',
  },
  {
    title: 'Administrar usuarios',
    description: 'Gestionar accesos al sistema',
    icon: 'ki-security-user',
    to: '/users',
  },
  {
    title: 'Asignar regiones',
    description: 'Vincular técnicos y cobertura',
    icon: 'ki-map',
    to: '/region-assignments',
  },
  {
    title: 'Nueva publicación',
    description: 'Crear contenido para el portal',
    icon: 'ki-notepad-edit',
    to: '/communications/create',
  },
]

const modules = [
  { name: 'API SIMRED', description: 'Laravel y PostgreSQL', status: 'Por verificar' },
  { name: 'Portal público', description: 'Contenido institucional', status: 'Por verificar' },
  { name: 'Cartografía', description: 'Capas y cobertura territorial', status: 'En desarrollo' },
]
</script>

<template>
  <!-- Toolbar -->
  <div class="pb-5">
    <div class="kt-container-fixed flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-col gap-1">
        <h1 class="text-xl font-semibold text-mono">Panel principal</h1>
        <div class="flex items-center gap-2 text-sm text-secondary-foreground">
          <RouterLink class="hover:text-primary" to="/dashboard">Inicio</RouterLink>
          <i class="ki-filled ki-right text-xs"></i>
          <span>Dashboard</span>
        </div>
      </div>

      <div class="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
        <i class="ki-filled ki-calendar text-primary"></i>
        <span class="text-sm font-medium capitalize text-foreground">{{ todayLabel }}</span>
      </div>
    </div>
  </div>
  <!-- End toolbar -->

  <div class="kt-container-fixed">
    <div class="grid gap-5 lg:gap-7.5">
      <!-- Welcome -->
      <section
        class="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card p-6 lg:p-8"
      >
        <div class="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div class="max-w-3xl">
            <div class="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
              <span class="size-2 rounded-full bg-primary"></span>
              Sistema de Administración SEDALP
            </div>
            <h2 class="mb-2 text-2xl font-semibold text-mono lg:text-3xl">
              Bienvenido al panel de gestión
            </h2>
            <p class="max-w-2xl text-sm leading-6 text-secondary-foreground lg:text-base">
              Consulta el estado general del sistema, administra el personal y supervisa la
              cobertura territorial del Departamento de La Paz.
            </p>
          </div>

          <RouterLink class="kt-btn kt-btn-primary shrink-0" to="/users">
            <i class="ki-filled ki-people"></i>
            Administrar usuarios
          </RouterLink>
        </div>

        <div
          class="pointer-events-none absolute -bottom-16 -right-10 size-52 rounded-full bg-primary/10 blur-2xl"
        ></div>
      </section>

      <!-- Summary -->
      <section class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article v-for="card in summaryCards" :key="card.label" class="kt-card">
          <div class="kt-card-content flex items-center justify-between gap-4 p-5">
            <div class="flex min-w-0 flex-col gap-1">
              <span class="text-sm font-medium text-secondary-foreground">{{ card.label }}</span>
              <span class="text-3xl font-semibold text-mono">{{ card.value }}</span>
              <span class="truncate text-xs text-secondary-foreground">{{ card.detail }}</span>
            </div>
            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-xl"
              :class="card.iconClass"
            >
              <i class="ki-filled text-2xl" :class="card.icon"></i>
            </div>
          </div>
        </article>
      </section>

      <section class="grid items-stretch gap-5 xl:grid-cols-3 lg:gap-7.5">
        <!-- Regional distribution -->
        <article class="kt-card xl:col-span-2">
          <div class="kt-card-header border-b border-border">
            <div>
              <h3 class="kt-card-title">Cobertura territorial</h3>
              <p class="mt-1 text-xs text-secondary-foreground">
                Distribución de los 87 municipios por región
              </p>
            </div>
            <RouterLink class="kt-btn kt-btn-sm kt-btn-outline" to="/regions">
              Ver regiones
              <i class="ki-filled ki-right"></i>
            </RouterLink>
          </div>

          <div class="kt-card-content p-5 lg:p-7.5">
            <div class="mb-7 flex h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                v-for="region in regions"
                :key="region.name"
                :class="region.color"
                :style="{ width: `${(region.municipalities / totalMunicipalities) * 100}%` }"
                :title="`${region.name}: ${region.municipalities} municipios`"
              ></div>
            </div>

            <div class="grid gap-x-8 gap-y-4 md:grid-cols-2">
              <div
                v-for="region in regions"
                :key="region.name"
                class="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0"
              >
                <div class="flex min-w-0 items-center gap-3">
                  <span class="size-2.5 shrink-0 rounded-full" :class="region.color"></span>
                  <span class="truncate text-sm font-medium text-foreground">{{ region.name }}</span>
                </div>
                <span class="text-sm font-semibold text-mono">{{ region.municipalities }}</span>
              </div>
            </div>
          </div>
        </article>

        <!-- Quick actions -->
        <article class="kt-card">
          <div class="kt-card-header border-b border-border">
            <div>
              <h3 class="kt-card-title">Accesos rápidos</h3>
              <p class="mt-1 text-xs text-secondary-foreground">Operaciones frecuentes</p>
            </div>
          </div>

          <div class="kt-card-content flex flex-col p-2">
            <RouterLink
              v-for="action in quickActions"
              :key="action.title"
              :to="action.to"
              class="group flex items-center gap-3 rounded-lg p-3.5 transition-colors hover:bg-muted/60"
            >
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <i class="ki-filled text-lg" :class="action.icon"></i>
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-sm font-semibold text-mono group-hover:text-primary">
                  {{ action.title }}
                </div>
                <div class="truncate text-xs text-secondary-foreground">
                  {{ action.description }}
                </div>
              </div>
              <i class="ki-filled ki-right text-xs text-secondary-foreground"></i>
            </RouterLink>
          </div>
        </article>
      </section>

      <section class="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-7.5">
        <!-- Module status -->
        <article class="kt-card">
          <div class="kt-card-header border-b border-border">
            <div>
              <h3 class="kt-card-title">Estado de los módulos</h3>
              <p class="mt-1 text-xs text-secondary-foreground">Disponibilidad de los servicios</p>
            </div>
          </div>

          <div class="kt-card-content flex flex-col divide-y divide-border p-0">
            <div
              v-for="module in modules"
              :key="module.name"
              class="flex items-center justify-between gap-4 px-5 py-4 lg:px-7.5"
            >
              <div class="flex min-w-0 items-center gap-3">
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-secondary-foreground"
                >
                  <i class="ki-filled ki-setting-2"></i>
                </span>
                <div class="min-w-0">
                  <div class="text-sm font-semibold text-mono">{{ module.name }}</div>
                  <div class="truncate text-xs text-secondary-foreground">
                    {{ module.description }}
                  </div>
                </div>
              </div>
              <span
                class="kt-badge kt-badge-sm shrink-0"
                :class="
                  module.status === 'En desarrollo'
                    ? 'kt-badge-warning kt-badge-outline'
                    : 'kt-badge-secondary kt-badge-outline'
                "
              >
                {{ module.status }}
              </span>
            </div>
          </div>
        </article>

        <!-- Recent activity empty state -->
        <article class="kt-card">
          <div class="kt-card-header border-b border-border">
            <div>
              <h3 class="kt-card-title">Actividad reciente</h3>
              <p class="mt-1 text-xs text-secondary-foreground">Últimos movimientos registrados</p>
            </div>
            <button class="kt-btn kt-btn-sm kt-btn-ghost" type="button" title="Actualizar">
              <i class="ki-filled ki-arrows-circle"></i>
            </button>
          </div>

          <div class="kt-card-content flex min-h-[235px] flex-col items-center justify-center p-8 text-center">
            <div class="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
              <i class="ki-filled ki-time text-2xl text-secondary-foreground"></i>
            </div>
            <h4 class="mb-1 text-sm font-semibold text-mono">Sin actividad disponible</h4>
            <p class="max-w-sm text-xs leading-5 text-secondary-foreground">
              Cuando el backend exponga el historial, aquí se mostrarán los registros, cambios
              de usuarios y asignaciones territoriales más recientes.
            </p>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>
