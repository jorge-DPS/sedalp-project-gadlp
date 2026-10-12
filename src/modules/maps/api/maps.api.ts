import api from '@/services/api'
import type { PaginatedResponse } from '@/shared/api/types'
import type { MapRegion, RegionBoundary } from '@/modules/maps/types/maps.types'

export const mapsApi = {
  async regions(
    search: string,
    page: number,
    signal?: AbortSignal,
  ): Promise<PaginatedResponse<MapRegion>> {
    const { data } = await api.get<PaginatedResponse<MapRegion>>('/admin/regions', {
      params: { search: search.trim() || undefined, page, per_page: 15 },
      signal,
    })
    return data
  },

  async boundary(regionId: number, signal?: AbortSignal): Promise<RegionBoundary> {
    const { data } = await api.get<RegionBoundary>(`/admin/regions/${regionId}/boundary`, {
      signal,
    })
    return data
  },
}
