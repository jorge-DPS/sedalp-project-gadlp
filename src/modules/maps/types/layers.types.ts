import type { FeatureCollection, Geometry } from 'geojson'
import type { MapRegion } from './maps.types'

export interface LayerSummary {
  feature_count: number
  geometry_types: Record<string, number>
  position_count: number
  srid: number
  repaired_features?: number
}
export interface MapCollection extends FeatureCollection<Geometry> {
  version_id?: number
  summary?: LayerSummary
}
export interface MapVersion {
  id: number
  number: number
  source_filename: string
  summary: LayerSummary
  created_at: string
}
export interface MapLayer {
  id: number
  name: string
  description: string | null
  kind: 'boundary' | 'overlay'
  region_id: number | null
  region: Pick<MapRegion, 'id' | 'name'> | null
  category: MapCategory
  publication_status: 'draft' | 'published' | 'pending'
  published_version: MapVersion | null
  published_at: string | null
  current_version: MapVersion
}

export const mapCategories = {
  boundaries: 'Límites regionales',
  roads: 'Carreteras y rutas',
  rivers: 'Ríos',
  cableways: 'Teleféricos',
  other: 'Otros / puntos de interés',
} as const
export type MapCategory = keyof typeof mapCategories
