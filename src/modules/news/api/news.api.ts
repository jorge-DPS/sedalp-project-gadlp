import api from '@/services/api'
import type { DataResponse, MessageResponse, PaginatedResponse } from '@/shared/api/types'
import type {
  News,
  NewsFilters,
  NewsImage,
  NewsImageUpload,
  NewsPayload,
  NewsVideo,
  ReorderItem,
} from '@/modules/news/types/news.types'

function normalizedParams(filters: NewsFilters): Record<string, string | number> {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== '' && value !== undefined),
  ) as Record<string, string | number>
}

export const newsApi = {
  async index(filters: NewsFilters): Promise<PaginatedResponse<News>> {
    const { data } = await api.get<PaginatedResponse<News>>('/admin/news', {
      params: normalizedParams(filters),
    })
    return data
  },

  async trash(filters: NewsFilters): Promise<PaginatedResponse<News>> {
    const { data } = await api.get<PaginatedResponse<News>>('/admin/news/trash', {
      params: normalizedParams({
        search: filters.search,
        per_page: filters.per_page,
        page: filters.page,
      }),
    })
    return data
  },

  async create(payload: NewsPayload): Promise<News> {
    const { data } = await api.post<DataResponse<News>>('/admin/news', payload)
    return data.data
  },

  async update(newsId: number, payload: Partial<NewsPayload>): Promise<News> {
    const { data } = await api.patch<DataResponse<News>>(`/admin/news/${newsId}`, payload)
    return data.data
  },

  async remove(newsId: number): Promise<MessageResponse> {
    const { data } = await api.delete<MessageResponse>(`/admin/news/${newsId}`)
    return data
  },

  async restore(newsId: number): Promise<News> {
    const { data } = await api.post<DataResponse<News>>(`/admin/news/${newsId}/restore`)
    return data.data
  },

  async forceDelete(newsId: number): Promise<MessageResponse> {
    const { data } = await api.delete<MessageResponse>(`/admin/news/${newsId}/force`)
    return data
  },

  async addImages(newsId: number, images: NewsImageUpload[]): Promise<NewsImage[]> {
    const formData = new FormData()

    images.forEach((image, index) => {
      formData.append(`images[${index}][file]`, image.file)
      formData.append(`images[${index}][alt]`, image.alt)
      if (image.caption) formData.append(`images[${index}][caption]`, image.caption)
    })

    const { data } = await api.post<DataResponse<NewsImage[]>>(
      `/admin/news/${newsId}/images`,
      formData,
    )
    return data.data
  },

  async updateImage(
    newsId: number,
    imageId: number,
    payload: { alt: string; caption: string | null },
  ): Promise<NewsImage> {
    const { data } = await api.patch<DataResponse<NewsImage>>(
      `/admin/news/${newsId}/images/${imageId}`,
      payload,
    )
    return data.data
  },

  async removeImage(newsId: number, imageId: number): Promise<void> {
    await api.delete(`/admin/news/${newsId}/images/${imageId}`)
  },

  async reorderImages(newsId: number, items: ReorderItem[]): Promise<NewsImage[]> {
    const { data } = await api.put<DataResponse<NewsImage[]>>(
      `/admin/news/${newsId}/images/reorder`,
      { items },
    )
    return data.data
  },

  async addVideo(newsId: number, youtubeUrl: string, title: string): Promise<NewsVideo> {
    const { data } = await api.post<DataResponse<NewsVideo>>(`/admin/news/${newsId}/videos`, {
      youtube_url: youtubeUrl,
      title,
    })
    return data.data
  },

  async updateVideo(
    newsId: number,
    videoId: number,
    payload: { youtube_url: string; title: string },
  ): Promise<NewsVideo> {
    const { data } = await api.patch<DataResponse<NewsVideo>>(
      `/admin/news/${newsId}/videos/${videoId}`,
      payload,
    )
    return data.data
  },

  async removeVideo(newsId: number, videoId: number): Promise<void> {
    await api.delete(`/admin/news/${newsId}/videos/${videoId}`)
  },

  async reorderVideos(newsId: number, items: ReorderItem[]): Promise<NewsVideo[]> {
    const { data } = await api.put<DataResponse<NewsVideo[]>>(
      `/admin/news/${newsId}/videos/reorder`,
      { items },
    )
    return data.data
  },
}

export function newsImageUrl(image: NewsImage): string {
  const path = `${image.baseUrl}/${image.filename}.webp`
  if (/^https?:\/\//i.test(path)) return path

  const apiUrl = import.meta.env.VITE_API_URL || window.location.origin
  return new URL(path, new URL(apiUrl, window.location.origin).origin).toString()
}
