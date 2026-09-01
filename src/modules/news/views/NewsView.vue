<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'

import AccessPageHeader from '@/components/ui/AccessPageHeader.vue'
import ConfirmationModal from '@/components/ui/ConfirmationModal.vue'
import { newsImageUrl } from '@/modules/news/api/news.api'
import NewsFormModal from '@/modules/news/components/NewsFormModal.vue'
import NewsMediaModal from '@/modules/news/components/NewsMediaModal.vue'
import { useNewsStore } from '@/modules/news/stores/news.store'
import type { News, NewsPayload, NewsStatus } from '@/modules/news/types/news.types'
import { getApiError } from '@/shared/api/errors'
import { useAuthStore } from '@/stores/auth'

type NewsAction = 'delete' | 'restore' | 'forceDelete'

const authStore = useAuthStore()
const newsStore = useNewsStore()
const { news, meta, loading, saving } = storeToRefs(newsStore)

const filters = reactive({
  search: '',
  status: '' as NewsStatus | '',
  per_page: 15,
  page: 1,
})
const showingTrash = ref(false)
const pageError = ref('')
const pageNotice = ref('')
const formOpen = ref(false)
const editingNews = ref<News | null>(null)
const formError = ref('')
const formFieldErrors = ref<Record<string, string[]>>({})
const mediaOpen = ref(false)
const mediaNews = ref<News | null>(null)
const mediaChanged = ref(false)
const actionNews = ref<News | null>(null)
const action = ref<NewsAction | null>(null)
const actionError = ref('')

const canCreate = computed(() => authStore.hasPermission('news.create'))
const canUpdate = computed(() => authStore.hasPermission('news.update'))
const canDelete = computed(() => authStore.hasPermission('news.delete'))
const canPublish = computed(() => authStore.hasPermission('news.publish'))
const canViewTrash = computed(() => authStore.hasPermission('news.trash.view'))
const canRestore = computed(() => authStore.hasPermission('news.restore'))
const canForceDelete = computed(() => authStore.hasPermission('news.force_delete'))

const actionTitle = computed(() => {
  if (action.value === 'delete') return 'Eliminar noticia'
  if (action.value === 'restore') return 'Restaurar noticia'
  if (action.value === 'forceDelete') return 'Eliminar definitivamente'
  return ''
})
const actionDescription = computed(() => {
  const title = actionNews.value?.title ?? 'esta noticia'
  if (action.value === 'delete')
    return `“${title}” se moverá a la papelera y podrá restaurarse posteriormente.`
  if (action.value === 'restore') return `“${title}” volverá al listado de noticias disponibles.`
  if (action.value === 'forceDelete')
    return `“${title}” y sus medios se eliminarán definitivamente. Esta operación no se puede deshacer.`
  return ''
})

function statusLabel(status: NewsStatus): string {
  return { draft: 'Borrador', published: 'Publicada', archived: 'Archivada' }[status]
}

function statusClass(status: NewsStatus): string {
  return {
    draft: 'border-amber-300 bg-amber-50 text-amber-700',
    published: 'border-emerald-300 bg-emerald-50 text-emerald-700',
    archived: 'border-slate-300 bg-slate-50 text-slate-600',
  }[status]
}

function formatDate(value: string | null): string {
  if (!value) return 'Sin fecha'
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value)
  return new Intl.DateTimeFormat('es-BO', { dateStyle: 'medium' }).format(date)
}

function primaryImage(item: News): string {
  const image = [...item.images].sort((a, b) => a.position - b.position)[0]
  return image ? newsImageUrl(image) : ''
}

async function loadNews(): Promise<void> {
  pageError.value = ''
  try {
    await newsStore.fetchNews(filters, showingTrash.value)
  } catch (error) {
    pageError.value = getApiError(error).message
  }
}

async function applyFilters(): Promise<void> {
  filters.page = 1
  await loadNews()
}

async function changePage(page: number): Promise<void> {
  if (page < 1 || page > meta.value.last_page || page === meta.value.current_page) return
  filters.page = page
  await loadNews()
}

async function changeSection(trash: boolean): Promise<void> {
  showingTrash.value = trash
  pageNotice.value = ''
  filters.page = 1
  filters.status = ''
  await loadNews()
}

function openCreate(): void {
  editingNews.value = null
  formError.value = ''
  formFieldErrors.value = {}
  formOpen.value = true
}

function openEdit(item: News): void {
  editingNews.value = item
  formError.value = ''
  formFieldErrors.value = {}
  formOpen.value = true
}

async function saveNews(payload: NewsPayload): Promise<void> {
  formError.value = ''
  formFieldErrors.value = {}
  pageNotice.value = ''
  const creating = !editingNews.value

  try {
    const savedNews = editingNews.value
      ? await newsStore.updateNews(editingNews.value.id, payload)
      : await newsStore.createNews({ ...payload, status: 'draft', published_at: null })

    formOpen.value = false
    await loadNews()

    if (creating) {
      pageNotice.value =
        'La noticia se creó como borrador. Ahora puedes añadir sus imágenes y videos.'
      mediaNews.value = savedNews
      mediaChanged.value = false
      mediaOpen.value = true
    }
  } catch (error) {
    const apiError = getApiError(error)
    formError.value = apiError.message
    formFieldErrors.value = apiError.errors
  }
}

function openMedia(item: News): void {
  mediaNews.value = item
  mediaChanged.value = false
  mediaOpen.value = true
}

async function closeMedia(): Promise<void> {
  mediaOpen.value = false
  mediaNews.value = null
  if (mediaChanged.value) await loadNews()
}

function openAction(item: News, nextAction: NewsAction): void {
  actionNews.value = item
  action.value = nextAction
  actionError.value = ''
}

function closeAction(): void {
  actionNews.value = null
  action.value = null
  actionError.value = ''
}

async function confirmAction(): Promise<void> {
  if (!actionNews.value || !action.value) return
  actionError.value = ''
  try {
    if (action.value === 'delete') await newsStore.removeNews(actionNews.value.id)
    else if (action.value === 'restore') await newsStore.restoreNews(actionNews.value.id)
    else await newsStore.forceDeleteNews(actionNews.value.id)

    closeAction()
    await loadNews()
  } catch (error) {
    actionError.value = getApiError(error).message
  }
}

onMounted(loadNews)
</script>

<template>
  <AccessPageHeader
    title="Noticias"
    description="Crea, publica, archiva y administra el contenido de comunicación mediante las API reales de Laravel."
  />

  <div class="kt-container-fixed pb-10">
    <div
      v-if="pageError"
      class="mb-5 flex items-center justify-between gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"
    >
      <span>{{ pageError }}</span>
      <button class="kt-btn kt-btn-sm kt-btn-light" type="button" @click="loadNews">
        Reintentar
      </button>
    </div>
    <div
      v-if="pageNotice"
      class="mb-5 flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
    >
      <span class="flex items-center gap-2"
        ><i class="ki-filled ki-check-circle"></i>{{ pageNotice }}</span
      >
      <button
        class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost text-emerald-700"
        type="button"
        aria-label="Cerrar mensaje"
        @click="pageNotice = ''"
      >
        <i class="ki-filled ki-cross"></i>
      </button>
    </div>

    <div class="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border">
      <div class="flex gap-1">
        <button
          class="px-4 py-3 text-sm font-semibold transition-colors"
          :class="
            !showingTrash ? 'border-b-2 border-primary text-primary' : 'text-secondary-foreground'
          "
          type="button"
          @click="changeSection(false)"
        >
          Noticias
        </button>
        <button
          v-if="canViewTrash"
          class="px-4 py-3 text-sm font-semibold transition-colors"
          :class="
            showingTrash ? 'border-b-2 border-primary text-primary' : 'text-secondary-foreground'
          "
          type="button"
          @click="changeSection(true)"
        >
          Papelera
        </button>
      </div>
      <button
        v-if="canCreate && !showingTrash"
        class="kt-btn kt-btn-primary mb-2.5"
        type="button"
        @click="openCreate"
      >
        <i class="ki-filled ki-plus"></i>
        Nueva noticia
      </button>
    </div>

    <form
      class="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background p-4 shadow-sm"
      @submit.prevent="applyFilters"
    >
      <div class="min-w-48 grow">
        <p class="text-sm font-semibold text-mono">
          {{ showingTrash ? 'Noticias eliminadas' : 'Contenido de comunicación' }}
        </p>
        <p class="mt-0.5 text-xs text-secondary-foreground">
          {{ meta.total }} {{ meta.total === 1 ? 'noticia' : 'noticias' }}
        </p>
      </div>
      <label class="kt-input w-full sm:max-w-72">
        <i class="ki-filled ki-magnifier"></i>
        <input v-model="filters.search" placeholder="Buscar noticias..." />
      </label>
      <select v-if="!showingTrash" v-model="filters.status" class="kt-select w-full sm:w-44">
        <option value="">Todos los estados</option>
        <option value="draft">Borrador</option>
        <option value="published">Publicada</option>
        <option value="archived">Archivada</option>
      </select>
      <button class="kt-btn kt-btn-light" type="submit" :disabled="loading">
        <i class="ki-filled ki-setting-4"></i>
        Filtrar
      </button>
    </form>

    <div v-if="loading" class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="index in 6"
        :key="index"
        class="overflow-hidden rounded-2xl border border-border bg-background"
      >
        <div class="h-48 animate-pulse bg-muted"></div>
        <div class="space-y-3 p-5">
          <div class="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
          <div class="h-3 w-full animate-pulse rounded bg-muted"></div>
          <div class="h-3 w-2/3 animate-pulse rounded bg-muted"></div>
        </div>
      </article>
    </div>

    <div
      v-else-if="!news.length"
      class="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center"
    >
      <span
        class="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
      >
        <i class="ki-filled text-3xl" :class="showingTrash ? 'ki-trash' : 'ki-notepad'"></i>
      </span>
      <h3 class="text-base font-semibold text-mono">
        {{ showingTrash ? 'La papelera está vacía' : 'Todavía no hay noticias' }}
      </h3>
      <p class="mt-2 max-w-md text-sm text-secondary-foreground">
        {{
          showingTrash
            ? 'Las noticias eliminadas aparecerán aquí y podrán restaurarse.'
            : 'Crea la primera noticia y luego añade sus imágenes y videos.'
        }}
      </p>
      <button
        v-if="canCreate && !showingTrash"
        class="kt-btn kt-btn-primary mt-5"
        type="button"
        @click="openCreate"
      >
        <i class="ki-filled ki-plus"></i>Nueva noticia
      </button>
    </div>

    <div v-else class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="item in news"
        :key="item.id"
        class="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
      >
        <div class="relative h-48 overflow-hidden bg-muted">
          <img
            v-if="primaryImage(item)"
            :src="primaryImage(item)"
            :alt="item.images[0]?.alt || item.title"
            class="size-full object-cover transition duration-300 group-hover:scale-[1.025]"
          />
          <div
            v-else
            class="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/5 to-muted text-secondary-foreground"
          >
            <span
              class="flex size-12 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-sm"
            >
              <i class="ki-filled ki-picture text-2xl"></i>
            </span>
            <span class="text-xs font-medium">Sin imagen de portada</span>
          </div>
          <span
            class="absolute top-3 left-3 rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm"
            :class="statusClass(item.status)"
          >
            {{ statusLabel(item.status) }}
          </span>
          <div
            class="absolute right-3 bottom-3 flex items-center gap-1 rounded-lg bg-black/65 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
          >
            <i class="ki-filled ki-picture"></i>{{ item.images.length }}
            <span class="mx-1 h-3 w-px bg-white/35"></span>
            <i class="ki-filled ki-youtube"></i>{{ item.videos.length }}
          </div>
        </div>

        <div class="flex grow flex-col p-5">
          <div class="mb-3 flex min-w-0 items-center gap-2 text-xs text-secondary-foreground">
            <span class="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
              <i class="ki-filled ki-calendar"></i>
              {{ formatDate(item.publishedAt ?? item.updatedAt) }}
            </span>
            <span class="text-muted-foreground">·</span>
            <span class="min-w-0 truncate">{{
              item.updatedBy?.email ?? item.createdBy?.email ?? '—'
            }}</span>
          </div>
          <h3 class="line-clamp-2 text-base font-semibold leading-6 text-mono">{{ item.title }}</h3>
          <p class="mt-2 line-clamp-3 text-sm leading-6 text-secondary-foreground">
            {{ item.excerpt }}
          </p>
          <p class="mt-3 truncate text-xs text-muted-foreground">/{{ item.slug }}</p>

          <div
            class="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4"
          >
            <template v-if="!showingTrash">
              <button
                v-if="canUpdate"
                class="kt-btn kt-btn-sm kt-btn-light"
                type="button"
                @click="openMedia(item)"
              >
                <i class="ki-filled ki-picture"></i>Multimedia
              </button>
              <div class="ml-auto flex gap-1">
                <button
                  v-if="canUpdate"
                  class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                  type="button"
                  title="Editar noticia"
                  aria-label="Editar noticia"
                  @click="openEdit(item)"
                >
                  <i class="ki-filled ki-pencil"></i>
                </button>
                <button
                  v-if="canDelete"
                  class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost text-destructive"
                  type="button"
                  title="Eliminar noticia"
                  aria-label="Eliminar noticia"
                  @click="openAction(item, 'delete')"
                >
                  <i class="ki-filled ki-trash"></i>
                </button>
              </div>
            </template>
            <template v-else>
              <button
                v-if="canRestore"
                class="kt-btn kt-btn-sm kt-btn-primary"
                type="button"
                @click="openAction(item, 'restore')"
              >
                <i class="ki-filled ki-arrows-circle"></i>Restaurar
              </button>
              <button
                v-if="canForceDelete"
                class="kt-btn kt-btn-sm kt-btn-ghost ml-auto text-destructive"
                type="button"
                @click="openAction(item, 'forceDelete')"
              >
                Eliminar definitivamente
              </button>
            </template>
          </div>
        </div>
      </article>
    </div>

    <div
      v-if="!loading && news.length"
      class="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-secondary-foreground"
    >
      <span>Mostrando {{ meta.from ?? 0 }}–{{ meta.to ?? 0 }} de {{ meta.total }}</span>
      <div class="flex items-center gap-2">
        <button
          class="kt-btn kt-btn-sm kt-btn-light"
          type="button"
          :disabled="meta.current_page <= 1"
          @click="changePage(meta.current_page - 1)"
        >
          <i class="ki-filled ki-left"></i>Anterior
        </button>
        <span class="px-2">Página {{ meta.current_page }} de {{ meta.last_page }}</span>
        <button
          class="kt-btn kt-btn-sm kt-btn-light"
          type="button"
          :disabled="meta.current_page >= meta.last_page"
          @click="changePage(meta.current_page + 1)"
        >
          Siguiente<i class="ki-filled ki-right"></i>
        </button>
      </div>
    </div>
  </div>

  <NewsFormModal
    :open="formOpen"
    :news="editingNews"
    :can-publish="canPublish"
    :saving="saving"
    :error="formError"
    :field-errors="formFieldErrors"
    @close="formOpen = false"
    @submit="saveNews"
  />
  <NewsMediaModal
    :open="mediaOpen"
    :news="mediaNews"
    @close="closeMedia"
    @changed="mediaChanged = true"
  />
  <ConfirmationModal
    :open="Boolean(actionNews && action)"
    :title="actionTitle"
    :description="actionDescription"
    :confirm-label="actionTitle"
    :danger="action === 'delete' || action === 'forceDelete'"
    :busy="saving"
    :error="actionError"
    @close="closeAction"
    @confirm="confirmAction"
  />
</template>
