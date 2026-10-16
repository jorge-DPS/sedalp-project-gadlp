import api from '@/services/api'
import type { DataResponse, PaginatedResponse } from '@/shared/api/types'
import type { MapCategory, MapCollection, MapLayer, MapVersion } from '../types/layers.types'

export const layersApi = {
  async list(search = '', page = 1, signal?: AbortSignal) {
    return (
      await api.get<PaginatedResponse<MapLayer>>('/admin/map-layers', {
        params: { search, page },
        signal,
      })
    ).data
  },
  async show(id: number, signal?: AbortSignal) {
    return (await api.get<DataResponse<MapLayer>>('/admin/map-layers/' + id, { signal })).data.data
  },
  async publication(layer: MapLayer, withdraw: boolean, category: MapCategory) {
    const payload = {
      expected_version_id: layer.current_version.id,
      expected_published_version_id: layer.published_version?.id ?? null,
      ...(!withdraw ? { category } : {}),
    }
    const url = '/admin/map-layers/' + layer.id + '/publication'
    return (
      withdraw
        ? await api.delete<DataResponse<MapLayer>>(url, { data: payload })
        : await api.put<DataResponse<MapLayer>>(url, payload)
    ).data.data
  },
  async geometry(id: number, signal?: AbortSignal) {
    return (await api.get<MapCollection>(`/admin/map-layers/${id}/geojson`, { signal })).data
  },
  async versions(id: number, page = 1, signal?: AbortSignal) {
    return (
      await api.get<PaginatedResponse<MapVersion>>(`/admin/map-layers/${id}/versions`, {
        params: { page },
        signal,
      })
    ).data
  },
  async preview(file: File, repair: boolean, signal?: AbortSignal) {
    const form = new FormData()
    form.append('file', file)
    form.append('repair_geometries', repair ? '1' : '0')
    return (
      await api.post<DataResponse<MapCollection>>('/admin/map-layers/preview', form, {
        timeout: 90000,
        signal,
      })
    ).data.data
  },
  async save(form: FormData, layerId?: number) {
    const url = layerId ? `/admin/map-layers/${layerId}/versions` : '/admin/map-layers'
    return (await api.post<DataResponse<MapLayer>>(url, form, { timeout: 90000 })).data.data
  },
}
