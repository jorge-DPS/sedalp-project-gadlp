import { defineStore } from 'pinia'
import { ref } from 'vue'

import { newsApi } from '@/modules/news/api/news.api'
import type { News, NewsFilters, NewsPayload } from '@/modules/news/types/news.types'
import type { PaginationMeta } from '@/shared/api/types'

const emptyMeta: PaginationMeta = {
  current_page: 1,
  from: null,
  last_page: 1,
  links: [],
  path: '',
  per_page: 15,
  to: null,
  total: 0,
}

export const useNewsStore = defineStore('news', () => {
  const news = ref<News[]>([])
  const meta = ref<PaginationMeta>({ ...emptyMeta })
  const loading = ref(false)
  const saving = ref(false)

  async function fetchNews(filters: NewsFilters, trashed = false): Promise<void> {
    loading.value = true
    try {
      const response = trashed ? await newsApi.trash(filters) : await newsApi.index(filters)
      news.value = response.data
      meta.value = response.meta
    } finally {
      loading.value = false
    }
  }

  async function createNews(payload: NewsPayload): Promise<News> {
    saving.value = true
    try {
      return await newsApi.create(payload)
    } finally {
      saving.value = false
    }
  }

  async function updateNews(newsId: number, payload: NewsPayload): Promise<News> {
    saving.value = true
    try {
      return await newsApi.update(newsId, payload)
    } finally {
      saving.value = false
    }
  }

  async function removeNews(newsId: number): Promise<void> {
    saving.value = true
    try {
      await newsApi.remove(newsId)
    } finally {
      saving.value = false
    }
  }

  async function restoreNews(newsId: number): Promise<void> {
    saving.value = true
    try {
      await newsApi.restore(newsId)
    } finally {
      saving.value = false
    }
  }

  async function forceDeleteNews(newsId: number): Promise<void> {
    saving.value = true
    try {
      await newsApi.forceDelete(newsId)
    } finally {
      saving.value = false
    }
  }

  return {
    news,
    meta,
    loading,
    saving,
    fetchNews,
    createNews,
    updateNews,
    removeNews,
    restoreNews,
    forceDeleteNews,
  }
})
