import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { mapsApi } from '@/modules/maps/api/maps.api'
import type { MapRegion, RegionBoundary } from '@/modules/maps/types/maps.types'
import type { PaginationMeta } from '@/shared/api/types'

export const useMapsStore = defineStore('maps', () => {
  const regions = ref<MapRegion[]>([])
  const meta = ref<PaginationMeta | null>(null)
  const boundary = shallowRef<RegionBoundary | null>(null)

  async function fetchRegions(search: string, page: number, signal: AbortSignal): Promise<void> {
    const response = await mapsApi.regions(search, page, signal)
    if (signal.aborted) return
    regions.value = response.data
    meta.value = response.meta
  }

  async function fetchBoundary(regionId: number, signal: AbortSignal): Promise<void> {
    const response = await mapsApi.boundary(regionId, signal)
    if (!signal.aborted) boundary.value = response
  }

  function clear(): void {
    regions.value = []
    meta.value = null
    boundary.value = null
  }

  return { regions, meta, boundary, fetchRegions, fetchBoundary, clear }
})
