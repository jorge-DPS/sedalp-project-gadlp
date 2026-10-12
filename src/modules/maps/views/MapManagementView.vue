<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AccessPageHeader from '@/components/ui/AccessPageHeader.vue'
import MapPreview from '@/modules/maps/components/MapPreview.vue'
import { useMapsStore } from '@/modules/maps/stores/maps.store'
import type { MapRegion } from '@/modules/maps/types/maps.types'
import { getApiError } from '@/shared/api/errors'

const store = useMapsStore()
const { regions, meta, boundary } = storeToRefs(store)
const search = ref('')
const selected = ref<MapRegion | null>(null)
const loadingRegions = ref(false)
const loadingBoundary = ref(false)
const listError = ref('')
const boundaryError = ref('')
const missingBoundary = ref(false)
let listRequest: AbortController | null = null
let boundaryRequest: AbortController | null = null

const updatedAt = computed(() => {
  const value = boundary.value?.properties.updated_at
  if (!value) return 'Sin fecha registrada'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Sin fecha registrada'
    : new Intl.DateTimeFormat('es-BO', { dateStyle: 'medium' }).format(date)
})

async function selectRegion(region: MapRegion): Promise<void> {
  boundaryRequest?.abort()
  const request = new AbortController()
  boundaryRequest = request
  selected.value = region
  boundary.value = null
  boundaryError.value = ''
  missingBoundary.value = false
  loadingBoundary.value = true
  try {
    await store.fetchBoundary(region.id, request.signal)
  } catch (error) {
    if (request.signal.aborted) return
    const failure = getApiError(error)
    if (failure.status === 404) missingBoundary.value = true
    else boundaryError.value = failure.message
  } finally {
    if (!request.signal.aborted) loadingBoundary.value = false
  }
}

async function loadRegions(page = 1): Promise<void> {
  listRequest?.abort()
  const request = new AbortController()
  listRequest = request
  loadingRegions.value = true
  listError.value = ''
  try {
    await store.fetchRegions(search.value, page, request.signal)
    if (!request.signal.aborted && !selected.value && regions.value[0]) {
      void selectRegion(regions.value[0])
    }
  } catch (error) {
    if (!request.signal.aborted) listError.value = getApiError(error).message
  } finally {
    if (!request.signal.aborted) loadingRegions.value = false
  }
}

onMounted(() => {
  store.clear()
  void loadRegions()
})
onBeforeUnmount(() => {
  listRequest?.abort()
  boundaryRequest?.abort()
  store.clear()
})
</script>

<template>
  <AccessPageHeader
    title="Mapas"
    description="Consulta los límites regionales registrados y explora su ubicación."
  />
  <div class="kt-container-fixed pb-6">
    <div class="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside class="kt-card min-w-0" aria-label="Selección de región">
        <div class="kt-card-header"><h2 class="kt-card-title">Regiones</h2></div>
        <div class="kt-card-content flex flex-col gap-4">
          <form class="flex flex-col gap-2" @submit.prevent="loadRegions(1)">
            <label for="map-region-search" class="text-sm font-medium text-foreground"
              >Buscar región</label
            >
            <input
              id="map-region-search"
              v-model="search"
              type="search"
              maxlength="150"
              placeholder="Nombre o código"
              class="kt-input w-full"
            />
            <button
              class="kt-btn kt-btn-primary justify-center"
              type="submit"
              :disabled="loadingRegions"
            >
              Buscar
            </button>
          </form>
          <p v-if="loadingRegions" role="status" class="text-sm text-secondary-foreground">
            Buscando regiones…
          </p>
          <div v-else-if="listError" role="alert" class="flex flex-col gap-2 text-sm">
            <p class="text-destructive">{{ listError }}</p>
            <button class="kt-btn kt-btn-outline justify-center" @click="loadRegions()">
              Reintentar
            </button>
          </div>
          <template v-else>
            <p v-if="!regions.length" role="status" class="py-5 text-sm text-secondary-foreground">
              No se encontraron regiones.
            </p>
            <div v-else class="flex flex-col gap-2">
              <button
                v-for="region in regions"
                :key="region.id"
                type="button"
                class="flex w-full items-center justify-between gap-2 rounded-lg border p-3 text-start transition-colors hover:bg-secondary"
                :class="selected?.id === region.id ? 'border-primary bg-secondary' : 'border-input'"
                :aria-pressed="selected?.id === region.id"
                @click="selectRegion(region)"
              >
                <span class="min-w-0">
                  <span class="block break-words text-sm font-semibold text-foreground">{{
                    region.name
                  }}</span>
                  <span class="block text-xs text-secondary-foreground">{{
                    region.code || 'Sin código'
                  }}</span>
                </span>
                <span
                  class="kt-badge kt-badge-sm"
                  :class="region.active ? 'kt-badge-success' : 'kt-badge-secondary'"
                >
                  {{ region.active ? 'Activa' : 'Inactiva' }}
                </span>
              </button>
            </div>
            <div v-if="meta && meta.last_page > 1" class="flex items-center justify-between gap-2">
              <button
                class="kt-btn kt-btn-sm kt-btn-outline"
                :disabled="meta.current_page <= 1"
                @click="loadRegions(meta.current_page - 1)"
                aria-label="Página anterior"
              >
                Anterior
              </button>
              <span class="text-xs text-secondary-foreground"
                >{{ meta.current_page }} / {{ meta.last_page }}</span
              >
              <button
                class="kt-btn kt-btn-sm kt-btn-outline"
                :disabled="meta.current_page >= meta.last_page"
                @click="loadRegions(meta.current_page + 1)"
                aria-label="Página siguiente"
              >
                Siguiente
              </button>
            </div>
          </template>
        </div>
      </aside>

      <section class="kt-card min-w-0" aria-label="Visor cartográfico" :aria-busy="loadingBoundary">
        <div class="kt-card-header flex-wrap gap-2">
          <h2 class="kt-card-title">{{ selected?.name || 'Visor regional' }}</h2>
          <span class="kt-badge kt-badge-outline">Solo consulta</span>
        </div>
        <div class="kt-card-content flex min-w-0 flex-col gap-4">
          <div
            v-if="loadingBoundary"
            role="status"
            class="flex min-h-96 items-center justify-center text-sm text-secondary-foreground"
          >
            Cargando límite regional…
          </div>
          <div
            v-else-if="boundaryError"
            role="alert"
            class="flex min-h-96 flex-col items-center justify-center gap-4 text-center"
          >
            <p class="text-sm text-destructive">{{ boundaryError }}</p>
            <button
              v-if="selected"
              type="button"
              class="kt-btn kt-btn-outline"
              @click="selectRegion(selected)"
            >
              Reintentar
            </button>
          </div>
          <div
            v-else-if="missingBoundary"
            role="status"
            class="flex min-h-96 flex-col items-center justify-center gap-3 text-center"
          >
            <i
              class="ki-filled ki-geolocation text-4xl text-muted-foreground"
              aria-hidden="true"
            ></i>
            <h3 class="text-base font-semibold text-foreground">Sin límite disponible</h3>
            <p class="max-w-sm text-sm text-secondary-foreground">
              Esta región todavía no tiene un polígono registrado o ya no está disponible.
            </p>
          </div>
          <template v-else-if="boundary">
            <MapPreview :boundary="boundary" />
            <dl class="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt class="text-secondary-foreground">Región</dt>
                <dd class="mt-1 font-medium text-foreground">{{ boundary.properties.name }}</dd>
              </div>
              <div>
                <dt class="text-secondary-foreground">Polígonos</dt>
                <dd class="mt-1 font-medium text-foreground">
                  {{ boundary.geometry.coordinates.length }}
                </dd>
              </div>
              <div>
                <dt class="text-secondary-foreground">Última actualización</dt>
                <dd class="mt-1 font-medium text-foreground">{{ updatedAt }}</dd>
              </div>
            </dl>
          </template>
          <div
            v-else
            class="flex min-h-96 items-center justify-center text-sm text-secondary-foreground"
          >
            Selecciona una región para consultar su límite.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
