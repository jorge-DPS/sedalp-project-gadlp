export interface MapRegion {
  id: number
  name: string
  code: string | null
  active: boolean
}

export interface RegionBoundary {
  type: 'Feature'
  id: number
  geometry: { type: 'MultiPolygon'; coordinates: number[][][][] }
  properties: {
    region_id: number
    name: string
    code: string | null
    updated_at: string | null
  }
}

export interface RegionBoundaryCollection {
  type: 'FeatureCollection'
  features: RegionBoundary[]
}
