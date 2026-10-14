<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './mapInteractions.css'
import type { RegionBoundary } from '@/modules/maps/types/maps.types'

import type { MapCollection } from '../types/layers.types'
const props = defineProps<{
  boundary?: RegionBoundary
  collection?: MapCollection
  label?: string
}>()
const mapLabel = computed(
  () => props.label || props.boundary?.properties.name || 'Capa cartográfica',
)
const container = ref<HTMLDivElement | null>(null)
const showBoundary = ref(true)
const mapError = ref('')
const tileError = ref(false)
let map: L.Map | null = null
let boundaryLayer: L.GeoJSON | null = null
let observer: ResizeObserver | null = null

function fitBoundary(): void {
  const bounds = boundaryLayer?.getBounds()
  if (bounds?.isValid()) map?.fitBounds(bounds, { padding: [28, 28], maxZoom: 13, animate: false })
}

function renderBoundary(): void {
  if (!map) return
  boundaryLayer?.remove()
  boundaryLayer = null
  mapError.value = ''
  try {
    boundaryLayer = L.geoJSON(props.collection || props.boundary, {
      style: (feature) => ({
        className:
          feature?.geometry.type === 'Polygon' || feature?.geometry.type === 'MultiPolygon'
            ? 'region-polygon'
            : '',
        color: '#2563eb',
        weight: 3,
        fillColor: '#3b82f6',
        fillOpacity: 0.18,
      }),
      pointToLayer: (_feature, latlng) =>
        L.circleMarker(latlng, { radius: 7, color: '#2563eb', fillOpacity: 0.7 }),
      onEachFeature(feature, layer) {
        const label = document.createElement('span')
        label.textContent =
          typeof feature.properties?.name === 'string' ? feature.properties.name : mapLabel.value
        layer.bindTooltip(label)
      },
    })
    if (!boundaryLayer.getBounds().isValid())
      throw new Error('La capa no contiene geometrías válidas.')
    if (showBoundary.value) boundaryLayer.addTo(map)
    fitBoundary()
  } catch {
    boundaryLayer?.remove()
    boundaryLayer = null
    mapError.value = 'No fue posible dibujar esta capa.'
  }
}

onMounted(() => {
  if (!container.value) return
  map = L.map(container.value, { scrollWheelZoom: false }).setView([-16.5, -68.15], 9)
  const tiles = L.tileLayer(
    import.meta.env.VITE_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution:
        import.meta.env.VITE_MAP_TILE_ATTRIBUTION ||
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map)
  tiles.on('tileerror', () => {
    tileError.value = true
  })
  L.control.scale({ imperial: false }).addTo(map)
  renderBoundary()
  observer = new ResizeObserver(() => {
    map?.invalidateSize({ pan: false, animate: false })
    fitBoundary()
  })
  observer.observe(container.value)
})

watch(() => [props.boundary, props.collection], renderBoundary)
watch(showBoundary, (visible) => {
  if (!map || !boundaryLayer) return
  if (visible) boundaryLayer.addTo(map)
  else boundaryLayer.remove()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  map?.remove()
  map = null
})
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-input bg-background">
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-input p-4">
      <label class="flex items-center gap-2 text-sm text-foreground">
        <input v-model="showBoundary" type="checkbox" class="kt-checkbox" />
        Mostrar capa
      </label>
      <button type="button" class="kt-btn kt-btn-sm kt-btn-outline" @click="fitBoundary">
        Ajustar a la capa
      </button>
    </div>
    <p v-if="mapError" role="alert" class="p-4 text-sm text-destructive">{{ mapError }}</p>
    <p v-if="tileError" role="status" class="bg-secondary p-3 text-sm text-secondary-foreground">
      El mapa base no está disponible. Puedes seguir consultando la capa.
    </p>
    <div ref="container" class="map-preview" role="region" :aria-label="'Mapa de ' + mapLabel" />
    <div
      class="flex flex-wrap items-center gap-2 border-t border-input px-4 py-3 text-xs text-secondary-foreground"
    >
      <span class="inline-block h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
      {{ mapLabel }}
      <span class="ms-auto">Arrastra para moverte · Usa + y − para acercar o alejar</span>
    </div>
  </div>
</template>

<style scoped>
.map-preview {
  height: clamp(360px, 60vh, 680px);
  width: 100%;
  z-index: 0;
  background: #e8edf0;
}
</style>
