import api from '@/services/api'
import type { PaginatedResponse } from '@/shared/api/types'
import type {
  MapRegion,
  RegionBoundary,
  RegionBoundaryCollection,
} from '@/modules/maps/types/maps.types'

export const mapsApi = {
  async boundaries(signal?: AbortSignal): Promise<RegionBoundaryCollection> {
    const { data } = await api.get<RegionBoundaryCollection>('/admin/region-boundaries', {
      signal,
      timeout: 30000,
    })
    return data
  },
  async createRegion(name: string): Promise<MapRegion> {
    const { data } = await api.post<{ data: MapRegion }>('/admin/regions', { name, active: true })
    return data.data
  },
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
