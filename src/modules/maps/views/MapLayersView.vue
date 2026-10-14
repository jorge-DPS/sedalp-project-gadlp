<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import MapsPageHeader from '../components/MapsPageHeader.vue'
import MapPreview from '../components/MapPreview.vue'
import MapLayerUploadModal from '../components/MapLayerUploadModal.vue'
import { layersApi } from '../api/layers.api'
import type { MapCollection, MapLayer, MapVersion } from '../types/layers.types'
import { useAuthStore } from '@/stores/auth'
import { getApiError } from '@/shared/api/errors'

const auth = useAuthStore()
const layers = ref<MapLayer[]>([])
const selected = ref<MapLayer>()
const geometry = shallowRef<MapCollection>()
const versions = ref<MapVersion[]>([])
const search = ref('')
const page = ref(1)
const lastPage = ref(1)
const total = ref(0)
const loading = ref(false)
const loadingMap = ref(false)
const error = ref('')
const detailError = ref('')
const success = ref('')
const editing = ref(false)
const updating = ref(false)
let listRequest: AbortController | undefined
let detailRequest: AbortController | undefined

async function load(targetPage = 1): Promise<void> {
  listRequest?.abort()
  const request = new AbortController()
  listRequest = request
  loading.value = true
  error.value = ''
  try {
    const result = await layersApi.list(search.value.trim(), targetPage, request.signal)
    if (request.signal.aborted) return
    layers.value = result.data
    total.value = result.meta.total
    page.value = result.meta.current_page
    lastPage.value = result.meta.last_page
  } catch (failure) {
    if (!request.signal.aborted) error.value = getApiError(failure).message
  } finally {
    if (!request.signal.aborted) loading.value = false
  }
}
async function select(layer: MapLayer): Promise<void> {
  detailRequest?.abort()
  const request = new AbortController()
  detailRequest = request
  selected.value = layer
  geometry.value = undefined
  versions.value = []
  detailError.value = ''
  loadingMap.value = true
  try {
    const [collection, history] = await Promise.all([
      layersApi.geometry(layer.id, request.signal),
      layersApi.versions(layer.id, 1, request.signal),
    ])
    if (request.signal.aborted) return
    geometry.value = collection
    versions.value = history.data
    const currentVersion = history.data[0]
    if (currentVersion) selected.value = { ...layer, current_version: currentVersion }
  } catch (failure) {
    if (!request.signal.aborted) detailError.value = getApiError(failure).message
  } finally {
    if (!request.signal.aborted) loadingMap.value = false
  }
}
function create(): void {
  updating.value = false
  editing.value = true
  success.value = ''
}
function startUpdate(): void {
  if (!selected.value || loadingMap.value || detailError.value) return
  updating.value = true
  editing.value = true
  success.value = ''
}
async function cancelEditing(): Promise<void> {
  editing.value = false
  if (updating.value && selected.value) {
    await Promise.all([load(page.value), select(selected.value)])
  }
}
async function saved(layer: MapLayer): Promise<void> {
  editing.value = false
  success.value = 'Capa guardada correctamente.'
  await Promise.all([load(), select(layer)])
}
onMounted(() => {
  void load()
})
onBeforeUnmount(() => {
  listRequest?.abort()
  detailRequest?.abort()
})
</script>

<template>
  <MapsPageHeader
    title="Gestión de capas"
    description="Administra límites regionales, carreteras, rutas y puntos. Carga archivos y conserva el historial de cada actualización."
  >
    <template #actions>
      <RouterLink
        v-if="auth.hasPermission('regions.view')"
        :to="{ name: 'maps.index' }"
        class="kt-btn kt-btn-outline"
      >
        <i class="ki-filled ki-geolocation" aria-hidden="true" /> Abrir visor
      </RouterLink>
      <button
        v-if="auth.hasPermission('maps.create')"
        type="button"
        class="kt-btn kt-btn-primary"
        @click="create"
      >
        <i class="ki-filled ki-plus" aria-hidden="true" /> Nueva capa
      </button>
    </template>
  </MapsPageHeader>
  <div class="kt-container-fixed flex flex-col gap-5 pb-6">
    <div
      v-if="success"
      role="status"
      class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-600/20 bg-green-600/5 px-5 py-4 text-sm"
    >
      <p class="flex items-center gap-2">
        <i class="ki-filled ki-check-circle text-green-600" aria-hidden="true" />{{ success }}
      </p>
      <RouterLink
        v-if="selected?.kind === 'boundary' && auth.hasPermission('regions.view')"
        :to="{ name: 'maps.index' }"
        class="font-medium text-primary hover:underline"
        >Ver en el visor →</RouterLink
      >
    </div>
    <MapLayerUploadModal
      v-if="editing"
      :layer="updating ? selected : undefined"
      @saved="saved"
      @cancel="cancelEditing"
    />
    <section
      class="overflow-hidden rounded-xl border border-input bg-background shadow-sm"
      aria-label="Biblioteca cartográfica"
    >
      <div
        class="flex flex-wrap items-center justify-between gap-4 border-b border-input px-5 py-4"
      >
        <div>
          <h2 class="text-base font-semibold text-foreground">Biblioteca de capas</h2>
          <p class="mt-1 text-xs text-muted-foreground">
            {{ total }} {{ total === 1 ? 'capa registrada' : 'capas registradas'
            }}{{ search ? ' en esta búsqueda' : '' }}
          </p>
        </div>
        <form class="flex w-full gap-2 sm:w-auto" @submit.prevent="load()">
          <input
            v-model="search"
            type="search"
            aria-label="Buscar capas"
            class="kt-input min-w-0 flex-1 sm:w-64"
            placeholder="Buscar por nombre…"
            maxlength="150"
          />
          <button class="kt-btn kt-btn-outline shrink-0" :disabled="loading">Buscar</button>
        </form>
      </div>
      <div
        v-if="error"
        role="alert"
        class="flex flex-wrap items-center justify-between gap-3 border-b border-input px-5 py-4 text-sm text-destructive"
      >
        <p>{{ error }}</p>
        <button class="kt-btn kt-btn-sm kt-btn-outline" :disabled="loading" @click="load(page)">
          Reintentar
        </button>
      </div>
      <div class="grid min-w-0 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside
          class="min-w-0 border-b border-input lg:border-r lg:border-b-0"
          aria-label="Lista de capas"
          :aria-busy="loading"
        >
          <p class="px-5 pt-5 pb-3 text-xs font-semibold tracking-wide text-muted-foreground">
            CAPAS DISPONIBLES
          </p>
          <p v-if="loading" role="status" class="px-5 py-4 text-sm text-muted-foreground">
            Cargando capas…
          </p>
          <p v-else-if="!layers.length" class="px-5 py-6 text-sm leading-6 text-muted-foreground">
            {{
              search
                ? 'No hay capas que coincidan con tu búsqueda.'
                : 'Todavía no hay archivos en la biblioteca. Los límites importados anteriormente están disponibles en el Visor general.'
            }}
          </p>
          <ul class="max-h-72 overflow-y-auto px-3 pb-3 lg:max-h-[660px]">
            <li v-for="layer in layers" :key="layer.id" class="mb-1">
              <button
                class="flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-secondary"
                :class="
                  selected?.id === layer.id
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-transparent'
                "
                :aria-pressed="selected?.id === layer.id"
                @click="select(layer)"
              >
                <span
                  class="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-input bg-background text-primary"
                >
                  <i
                    class="ki-filled"
                    :class="layer.kind === 'boundary' ? 'ki-geolocation' : 'ki-map'"
                    aria-hidden="true"
                  />
                </span>
                <span class="min-w-0">
                  <span class="block break-words text-sm font-semibold text-foreground">{{
                    layer.name
                  }}</span>
                  <span class="mt-1 block text-xs leading-5 text-muted-foreground"
                    >{{ layer.region?.name || 'Sin región específica' }} · v{{
                      layer.current_version.number
                    }}</span
                  >
                  <span
                    class="mt-2 inline-block rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >{{ layer.kind === 'boundary' ? 'Límite regional' : 'Capa temática' }}</span
                  >
                </span>
              </button>
            </li>
          </ul>
          <div
            v-if="lastPage > 1"
            class="flex items-center justify-between gap-2 border-t border-input p-4 text-xs"
          >
            <button
              class="kt-btn kt-btn-sm kt-btn-outline"
              :disabled="page <= 1 || loading"
              @click="load(page - 1)"
            >
              Anterior
            </button>
            <span>{{ page }} / {{ lastPage }}</span>
            <button
              class="kt-btn kt-btn-sm kt-btn-outline"
              :disabled="page >= lastPage || loading"
              @click="load(page + 1)"
            >
              Siguiente
            </button>
          </div>
        </aside>
        <div class="flex min-w-0 flex-col gap-5 p-4 sm:p-6" :aria-busy="loadingMap">
          <template v-if="selected">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span class="rounded-md bg-primary/10 px-2 py-1 font-medium text-primary">{{
                    selected.kind === 'boundary' ? 'Límite regional' : 'Capa temática'
                  }}</span>
                  <span>Versión {{ selected.current_version.number }}</span>
                </div>
                <h2 class="break-words text-xl font-semibold tracking-tight">
                  {{ selected.name }}
                </h2>
                <p
                  v-if="selected.description"
                  class="mt-2 max-w-xl break-words text-sm leading-6 text-muted-foreground"
                >
                  {{ selected.description }}
                </p>
              </div>
              <button
                v-if="
                  auth.hasPermission('maps.update') &&
                  (selected.kind !== 'boundary' || auth.hasPermission('regions.update'))
                "
                class="kt-btn kt-btn-outline"
                :disabled="loadingMap || !!detailError"
                @click="startUpdate"
              >
                <i class="ki-filled ki-file-up" aria-hidden="true" /> Actualizar archivo
              </button>
            </div>
            <p
              v-if="loadingMap"
              role="status"
              class="flex min-h-80 items-center justify-center text-sm text-muted-foreground"
            >
              Cargando mapa…
            </p>
            <div
              v-if="detailError"
              role="alert"
              class="flex flex-col items-start gap-3 rounded-lg border border-destructive/25 p-4 text-sm text-destructive"
            >
              <p>{{ detailError }}</p>
              <button class="kt-btn kt-btn-sm kt-btn-outline" @click="select(selected)">
                Reintentar mapa
              </button>
            </div>
            <MapPreview v-if="geometry" :collection="geometry" :label="selected.name" />
            <details v-if="versions.length" class="rounded-lg border border-input p-4">
              <summary class="cursor-pointer text-sm font-medium">
                Historial · últimas {{ versions.length }} versiones
              </summary>
              <ul class="mt-3 flex flex-col divide-y divide-input text-sm">
                <li
                  v-for="version in versions"
                  :key="version.id"
                  class="break-words py-3 text-muted-foreground"
                >
                  v{{ version.number }} · {{ version.source_filename }} ·
                  {{ version.summary.feature_count }} elementos ·
                  {{ new Date(version.created_at).toLocaleDateString('es-BO') }}
                </li>
              </ul>
            </details>
          </template>
          <div
            v-else
            class="flex min-h-[460px] flex-col items-center justify-center rounded-lg bg-secondary/35 px-5 py-12 text-center"
          >
            <div
              class="flex size-16 items-center justify-center rounded-2xl border border-primary/15 bg-primary/5 text-3xl text-primary"
            >
              <i class="ki-filled ki-map" aria-hidden="true" />
            </div>
            <h3 class="mt-5 text-lg font-semibold text-foreground">
              Explora y administra tus capas
            </h3>
            <p class="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Selecciona una capa para explorar su mapa y revisar sus versiones, o carga un nuevo
              archivo de límites, carreteras, ríos, teleféricos o puntos de interés.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
