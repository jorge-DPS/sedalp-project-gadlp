<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './mapInteractions.css'
import type { RegionBoundary } from '../types/maps.types'
import { regionColor } from './regionColors'

const props = defineProps<{
  boundaries: RegionBoundary[]
  visibleIds: number[]
  selectedId?: number
}>()
const emit = defineEmits<{ select: [id: number] }>()
const container = ref<HTMLDivElement>()
const mapError = ref('')
const tileError = ref(false)
const layers = new Map<number, L.GeoJSON>()
let map: L.Map | undefined
let observer: ResizeObserver | undefined
let fitted = false

function fitVisible(): void {
  const bounds = L.latLngBounds([])
  for (const id of props.visibleIds) {
    const layer = layers.get(id)
    if (layer?.getBounds().isValid()) bounds.extend(layer.getBounds())
  }
  if (bounds.isValid()) map?.fitBounds(bounds, { padding: [36, 36], maxZoom: 12, animate: false })
}

function focusRegion(id: number): void {
  const bounds = layers.get(id)?.getBounds()
  if (bounds?.isValid()) map?.fitBounds(bounds, { padding: [40, 40], maxZoom: 12, animate: false })
}

function syncVisibility(): void {
  if (!map) return
  const visible = new Set(props.visibleIds)
  for (const [id, layer] of layers) {
    if (visible.has(id)) {
      if (!map.hasLayer(layer)) layer.addTo(map)
    } else layer.remove()
    layer.setStyle({
      weight: props.selectedId === id ? 3 : 2,
      fillOpacity: props.selectedId === id ? 0.26 : 0.16,
    })
  }
  if (!fitted && visible.size > 0) {
    fitVisible()
    fitted = true
  }
}

function renderBoundaries(): void {
  if (!map) return
  layers.forEach((layer) => layer.remove())
  layers.clear()
  mapError.value = ''
  for (const boundary of props.boundaries) {
    const id = boundary.properties.region_id
    try {
      const layer = L.geoJSON(boundary, {
        style: {
          className: 'region-polygon',
          color: regionColor(id),
          fillColor: regionColor(id),
          weight: 2,
          fillOpacity: 0.16,
        },
        onEachFeature(_feature, featureLayer) {
          const label = document.createElement('span')
          label.textContent = boundary.properties.name
          featureLayer.bindTooltip(label, { sticky: true })
          featureLayer.on('click', () => emit('select', id))
        },
      })
      if (!layer.getBounds().isValid()) throw new Error('Invalid boundary')
      layers.set(id, layer)
    } catch {
      mapError.value =
        'No se pudo dibujar uno de los límites. Actualiza el mapa e inténtalo nuevamente.'
    }
  }
  syncVisibility()
}

onMounted(() => {
  if (!container.value) return
  map = L.map(container.value, { scrollWheelZoom: false, zoomControl: false }).setView(
    [-15.7, -68.2],
    7,
  )
  L.control.zoom({ position: 'bottomleft' }).addTo(map)
  L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map)
  L.tileLayer(
    import.meta.env.VITE_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution:
        import.meta.env.VITE_MAP_TILE_ATTRIBUTION ||
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .on('tileerror', () => {
      tileError.value = true
    })
    .addTo(map)
  renderBoundaries()
  observer = new ResizeObserver(() => map?.invalidateSize({ pan: false, animate: false }))
  observer.observe(container.value)
})
watch(() => props.boundaries, renderBoundaries)
watch(() => [props.visibleIds, props.selectedId], syncVisibility)
onBeforeUnmount(() => {
  observer?.disconnect()
  map?.remove()
  layers.clear()
  map = undefined
})
defineExpose({ fitVisible, focusRegion })
</script>

<template>
  <div class="relative isolate min-w-0 bg-secondary">
    <div
      class="pointer-events-none absolute inset-x-4 top-4 z-[400] flex flex-wrap items-start justify-between gap-2"
    >
      <span
        class="rounded-lg border border-input bg-background/95 px-3 py-2 text-xs font-medium text-foreground shadow-sm"
      >
        La Paz · Límites regionales
      </span>
      <button
        type="button"
        class="kt-btn kt-btn-sm kt-btn-outline pointer-events-auto bg-background shadow-sm"
        :disabled="!visibleIds.length"
        @click="fitVisible"
      >
        <i class="ki-filled ki-geolocation" aria-hidden="true" /> Ajustar vista
      </button>
    </div>
    <div
      ref="container"
      class="regional-map"
      role="region"
      aria-label="Mapa de límites regionales"
    />
    <div
      v-if="!visibleIds.length"
      class="pointer-events-none absolute inset-x-4 bottom-16 z-[400] flex justify-center"
    >
      <p
        class="max-w-sm rounded-xl border border-input bg-background/95 px-5 py-3 text-center text-sm text-muted-foreground shadow-sm"
      >
        {{
          boundaries.length
            ? 'Los límites están ocultos. Marca una región para mostrarla.'
            : 'Los límites aparecerán aquí cuando estén registrados.'
        }}
      </p>
    </div>
    <p
      v-if="mapError"
      role="alert"
      class="border-t border-input bg-background p-3 text-sm text-destructive"
    >
      {{ mapError }}
    </p>
    <p
      v-if="tileError"
      role="status"
      class="border-t border-input bg-background p-3 text-xs text-muted-foreground"
    >
      El mapa base no está disponible. Los límites siguen disponibles.
    </p>
  </div>
</template>

<style scoped>
.regional-map {
  height: clamp(520px, 68vh, 780px);
  width: 100%;
  z-index: 0;
  background: #e8edf0;
}
@media (max-width: 767px) {
  .regional-map {
    height: 460px;
  }
}
</style>
