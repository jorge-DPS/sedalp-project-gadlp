import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { mapsApi } from '../api/maps.api'
import type { RegionBoundary } from '../types/maps.types'

export const useMapsStore = defineStore('maps', () => {
  const boundaries = shallowRef<RegionBoundary[]>([])
  const hiddenIds = ref<number[]>([])
  const visibleIds = computed(() =>
    boundaries.value
      .map((item) => item.properties.region_id)
      .filter((id) => !hiddenIds.value.includes(id)),
  )

  async function fetchBoundaries(signal: AbortSignal): Promise<void> {
    const response = await mapsApi.boundaries(signal)
    if (signal.aborted) return
    boundaries.value = response.features
    const available = new Set(response.features.map((item) => item.properties.region_id))
    hiddenIds.value = hiddenIds.value.filter((id) => available.has(id))
  }

  function setVisible(id: number, visible: boolean): void {
    hiddenIds.value = hiddenIds.value.filter((hidden) => hidden !== id)
    if (!visible) hiddenIds.value.push(id)
  }

  function showAll(): void {
    hiddenIds.value = []
  }

  function hideAll(): void {
    hiddenIds.value = boundaries.value.map((item) => item.properties.region_id)
  }

  return { boundaries, visibleIds, fetchBoundaries, setVisible, showAll, hideAll }
})
