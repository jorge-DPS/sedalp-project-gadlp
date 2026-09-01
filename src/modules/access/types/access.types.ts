export interface Permission {
  id: number
  name: string
}

export interface Role {
  id: number
  name: string
  permissions: string[]
}

export interface CatalogItem {
  id: number
  name: string
  active: boolean
}

export interface OrganizationalUnit extends CatalogItem {
  code: string | null
  description: string | null
}

export interface Position extends CatalogItem {
  description: string | null
}

export type Profession = CatalogItem
