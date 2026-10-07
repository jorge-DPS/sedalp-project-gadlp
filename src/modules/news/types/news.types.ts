export type NewsStatus = 'draft' | 'published' | 'archived'

export interface NewsAuthor {
  id: number
  email: string
}

export interface NewsImage {
  id: number
  filename: string
  baseUrl: string
  alt: string
  caption: string | null
  position: number
}

export interface NewsVideo {
  id: number
  youtubeUrl: string
  title: string
  position: number
}

export interface NewsContentNode {
  type: string
  text?: string
  content?: NewsContentNode[]
  [key: string]: unknown
}

export interface News {
  id: number
  slug: string
  title: string
  subtitle: string | null
  excerpt: string
  content: NewsContentNode
  publishedAt: string | null
  status: NewsStatus
  images: NewsImage[]
  videos: NewsVideo[]
  createdBy: NewsAuthor
  updatedBy: NewsAuthor | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface NewsFilters {
  search?: string
  status?: NewsStatus | ''
  per_page?: number
  page?: number
}

export interface NewsPayload {
  title: string
  subtitle: string | null
  excerpt: string
  content: NewsContentNode
  status: NewsStatus
  published_at: string | null
}

export interface NewsImageUpload {
  file: File
  alt: string
  caption: string
}

export interface ReorderItem {
  id: number
  position: number
}
