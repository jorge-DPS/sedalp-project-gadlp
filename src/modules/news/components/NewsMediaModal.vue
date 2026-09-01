<script setup lang="ts">
import { onBeforeUnmount, reactive, ref, watch } from 'vue'

import { newsApi, newsImageUrl } from '@/modules/news/api/news.api'
import type {
  News,
  NewsImage,
  NewsImageUpload,
  NewsVideo,
  ReorderItem,
} from '@/modules/news/types/news.types'
import { getApiError } from '@/shared/api/errors'

interface QueuedImage extends NewsImageUpload {
  id: string
  previewUrl: string
}

const MAX_IMAGES_PER_BATCH = 10
const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

const props = defineProps<{
  open: boolean
  news: News | null
}>()

const emit = defineEmits<{
  close: []
  changed: []
}>()

const images = ref<NewsImage[]>([])
const videos = ref<NewsVideo[]>([])
const busy = ref(false)
const error = ref('')
const queuedImages = ref<QueuedImage[]>([])
const videoForm = reactive({ youtubeUrl: '', title: '' })
const pendingDelete = ref<{ type: 'image' | 'video'; id: number; label: string } | null>(null)

function clearQueuedImages(): void {
  queuedImages.value.forEach((image) => URL.revokeObjectURL(image.previewUrl))
  queuedImages.value = []
}

watch(
  () => [props.open, props.news] as const,
  ([open, news]) => {
    if (!open || !news) {
      clearQueuedImages()
      return
    }
    images.value = news.images.map((image) => ({ ...image }))
    videos.value = news.videos.map((video) => ({ ...video }))
    clearQueuedImages()
    videoForm.youtubeUrl = ''
    videoForm.title = ''
    pendingDelete.value = null
    error.value = ''
  },
  { immediate: true },
)

onBeforeUnmount(clearQueuedImages)

function selectImages(event: Event): void {
  const input = event.target as HTMLInputElement
  const selectedFiles = Array.from(input.files ?? [])
  const remainingSlots = MAX_IMAGES_PER_BATCH - queuedImages.value.length
  error.value = ''

  if (remainingSlots <= 0) {
    error.value = `Solo puedes subir ${MAX_IMAGES_PER_BATCH} imágenes por operación.`
    input.value = ''
    return
  }

  const validFiles = selectedFiles.filter((file) => {
    if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
      error.value = 'Solo se permiten imágenes JPG, PNG o WebP.'
      return false
    }
    if (file.size > MAX_IMAGE_SIZE) {
      error.value = 'Cada imagen debe pesar como máximo 10 MB.'
      return false
    }
    return true
  })

  if (selectedFiles.length > remainingSlots) {
    error.value = `Se añadieron las primeras ${remainingSlots} imágenes para respetar el límite por operación.`
  }

  validFiles.slice(0, remainingSlots).forEach((file) => {
    const position = images.value.length + queuedImages.value.length + 1
    queuedImages.value.push({
      id: `${Date.now()}-${position}-${file.name}`,
      file,
      alt: `Imagen ${position}`,
      caption: '',
      previewUrl: URL.createObjectURL(file),
    })
  })

  input.value = ''
}

function removeQueuedImage(imageId: string): void {
  const image = queuedImages.value.find((item) => item.id === imageId)
  if (image) URL.revokeObjectURL(image.previewUrl)
  queuedImages.value = queuedImages.value.filter((item) => item.id !== imageId)
}

async function run(operation: () => Promise<void>): Promise<void> {
  error.value = ''
  busy.value = true
  try {
    await operation()
    emit('changed')
  } catch (requestError) {
    error.value = getApiError(requestError).message
  } finally {
    busy.value = false
  }
}

async function addImages(): Promise<void> {
  if (!props.news || !queuedImages.value.length) return
  if (queuedImages.value.some((image) => !image.alt.trim())) {
    error.value = 'Todas las imágenes deben tener un texto alternativo.'
    return
  }

  await run(async () => {
    images.value = await newsApi.addImages(
      props.news!.id,
      queuedImages.value.map(({ file, alt, caption }) => ({
        file,
        alt: alt.trim(),
        caption: caption.trim(),
      })),
    )
    clearQueuedImages()
  })
}

async function saveImage(image: NewsImage): Promise<void> {
  if (!props.news || !image.alt.trim()) return
  await run(async () => {
    const updated = await newsApi.updateImage(props.news!.id, image.id, {
      alt: image.alt.trim(),
      caption: image.caption?.trim() || null,
    })
    images.value = images.value.map((item) => (item.id === updated.id ? updated : item))
  })
}

async function addVideo(): Promise<void> {
  if (!props.news || !videoForm.youtubeUrl.trim() || !videoForm.title.trim()) return
  await run(async () => {
    const created = await newsApi.addVideo(
      props.news!.id,
      videoForm.youtubeUrl.trim(),
      videoForm.title.trim(),
    )
    videos.value.push(created)
    videoForm.youtubeUrl = ''
    videoForm.title = ''
  })
}

async function saveVideo(video: NewsVideo): Promise<void> {
  if (!props.news || !video.youtubeUrl.trim() || !video.title.trim()) return
  await run(async () => {
    const updated = await newsApi.updateVideo(props.news!.id, video.id, {
      youtube_url: video.youtubeUrl.trim(),
      title: video.title.trim(),
    })
    videos.value = videos.value.map((item) => (item.id === updated.id ? updated : item))
  })
}

async function confirmDelete(): Promise<void> {
  if (!props.news || !pendingDelete.value) return
  const target = pendingDelete.value

  await run(async () => {
    if (target.type === 'image') {
      await newsApi.removeImage(props.news!.id, target.id)
      images.value = images.value.filter((image) => image.id !== target.id)
    } else {
      await newsApi.removeVideo(props.news!.id, target.id)
      videos.value = videos.value.filter((video) => video.id !== target.id)
    }
    pendingDelete.value = null
  })
}

async function moveMedia(type: 'image' | 'video', index: number, offset: -1 | 1): Promise<void> {
  if (!props.news) return
  const collection = type === 'image' ? images.value : videos.value
  const nextIndex = index + offset
  if (nextIndex < 0 || nextIndex >= collection.length) return

  const reordered = [...collection]
  const [item] = reordered.splice(index, 1)
  if (!item) return
  reordered.splice(nextIndex, 0, item)
  const items: ReorderItem[] = reordered.map((media, position) => ({ id: media.id, position }))

  await run(async () => {
    if (type === 'image') images.value = await newsApi.reorderImages(props.news!.id, items)
    else videos.value = await newsApi.reorderVideos(props.news!.id, items)
  })
}
</script>

<template>
  <div
    v-if="open && news"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true"
    aria-label="Administrar medios"
    @click.self="emit('close')"
  >
    <div class="kt-card max-h-[92vh] w-full max-w-5xl overflow-y-auto">
      <div class="kt-card-header sticky top-0 z-10 bg-background">
        <div>
          <h3 class="kt-card-title">Multimedia de la noticia</h3>
          <p class="mt-1 max-w-2xl truncate text-xs text-secondary-foreground">
            Paso posterior al guardado · {{ news.title }}
          </p>
        </div>
        <button
          class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
          type="button"
          aria-label="Cerrar administrador multimedia"
          @click="emit('close')"
        >
          <i class="ki-filled ki-cross"></i>
        </button>
      </div>

      <div class="kt-card-content flex flex-col gap-8 pb-24">
        <div v-if="error" class="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {{ error }}
        </div>
        <div
          v-if="pendingDelete"
          class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
        >
          <span>¿Eliminar {{ pendingDelete.label }}?</span>
          <div class="flex gap-2">
            <button
              class="kt-btn kt-btn-sm kt-btn-light"
              type="button"
              :disabled="busy"
              @click="pendingDelete = null"
            >
              Cancelar
            </button>
            <button
              class="kt-btn kt-btn-sm kt-btn-destructive"
              type="button"
              :disabled="busy"
              @click="confirmDelete"
            >
              Eliminar
            </button>
          </div>
        </div>

        <section class="flex flex-col gap-4">
          <div>
            <h4 class="font-semibold text-mono">Imágenes</h4>
            <p class="text-xs text-secondary-foreground">
              JPG, PNG o WebP; máximo 10 MB por imagen.
            </p>
          </div>
          <form class="rounded-xl border border-border p-4" @submit.prevent="addImages">
            <label
              class="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/20 px-5 py-7 text-center transition-colors hover:border-primary/60 hover:bg-primary/5"
            >
              <span
                class="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
              >
                <i class="ki-filled ki-cloud-add text-2xl"></i>
              </span>
              <span class="text-sm font-semibold text-mono">Selecciona varias imágenes</span>
              <span class="text-xs text-secondary-foreground"
                >Hasta 10 archivos JPG, PNG o WebP por operación</span
              >
              <span class="kt-btn kt-btn-sm kt-btn-light mt-1">Buscar archivos</span>
              <input
                class="sr-only"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                :disabled="busy || queuedImages.length >= MAX_IMAGES_PER_BATCH"
                @change="selectImages"
              />
            </label>

            <div v-if="queuedImages.length" class="mt-4 grid gap-4 lg:grid-cols-2">
              <article
                v-for="(image, index) in queuedImages"
                :key="image.id"
                class="rounded-xl border border-border bg-background p-3.5 shadow-sm"
              >
                <div class="mb-3 flex gap-3">
                  <img
                    :src="image.previewUrl"
                    :alt="image.alt"
                    class="size-20 shrink-0 rounded-lg bg-muted object-cover"
                  />
                  <div class="min-w-0 grow py-1">
                    <p class="truncate text-sm font-semibold text-mono">{{ image.file.name }}</p>
                    <p class="mt-1 text-xs text-secondary-foreground">
                      Nueva imagen {{ index + 1 }} de {{ queuedImages.length }}
                    </p>
                    <p class="mt-1 text-xs text-muted-foreground">
                      {{ (image.file.size / 1024 / 1024).toFixed(2) }} MB
                    </p>
                  </div>
                  <button
                    class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0 text-destructive"
                    type="button"
                    title="Quitar imagen"
                    :disabled="busy"
                    @click="removeQueuedImage(image.id)"
                  >
                    <i class="ki-filled ki-trash"></i>
                  </button>
                </div>
                <div class="grid gap-3">
                  <input
                    v-model="image.alt"
                    class="kt-input"
                    maxlength="255"
                    :aria-label="`Texto alternativo de la imagen ${index + 1}`"
                    placeholder="Texto alternativo"
                    required
                  />
                  <input
                    v-model="image.caption"
                    class="kt-input"
                    maxlength="1000"
                    :aria-label="`Pie de la imagen ${index + 1}`"
                    placeholder="Pie de imagen (opcional)"
                  />
                </div>
              </article>
            </div>

            <div v-if="queuedImages.length" class="mt-4 flex justify-end">
              <button class="kt-btn kt-btn-primary" type="submit" :disabled="busy">
                <span v-if="busy" class="kt-spinner kt-spinner-sm"></span>
                <i v-else class="ki-filled ki-cloud-add"></i>
                Subir {{ queuedImages.length }}
                {{ queuedImages.length === 1 ? 'imagen' : 'imágenes' }}
              </button>
            </div>
          </form>

          <div class="grid gap-4 lg:grid-cols-2">
            <article
              v-for="(image, index) in images"
              :key="image.id"
              class="rounded-lg border border-border p-4"
            >
              <div class="mb-3 flex gap-3">
                <img
                  :src="newsImageUrl(image)"
                  :alt="image.alt"
                  class="size-20 shrink-0 rounded-md object-cover"
                />
                <div class="min-w-0 grow">
                  <p class="truncate text-sm font-medium text-mono">{{ image.filename }}.webp</p>
                  <p class="text-xs text-secondary-foreground">Posición {{ index + 1 }}</p>
                </div>
                <div class="flex gap-1">
                  <button
                    class="kt-btn kt-btn-sm kt-btn-icon kt-btn-light"
                    type="button"
                    title="Subir posición"
                    :disabled="busy || index === 0"
                    @click="moveMedia('image', index, -1)"
                  >
                    <i class="ki-filled ki-up"></i>
                  </button>
                  <button
                    class="kt-btn kt-btn-sm kt-btn-icon kt-btn-light"
                    type="button"
                    title="Bajar posición"
                    :disabled="busy || index === images.length - 1"
                    @click="moveMedia('image', index, 1)"
                  >
                    <i class="ki-filled ki-down"></i>
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <input
                  v-model="image.alt"
                  class="kt-input"
                  placeholder="Texto alternativo"
                  required
                />
                <input v-model="image.caption" class="kt-input" placeholder="Pie de imagen" />
                <div class="flex justify-end gap-2">
                  <button
                    class="kt-btn kt-btn-sm kt-btn-light"
                    type="button"
                    :disabled="busy"
                    @click="saveImage(image)"
                  >
                    Guardar
                  </button>
                  <button
                    class="kt-btn kt-btn-sm kt-btn-ghost text-destructive"
                    type="button"
                    :disabled="busy"
                    @click="pendingDelete = { type: 'image', id: image.id, label: 'esta imagen' }"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
            <p v-if="!images.length" class="text-sm text-secondary-foreground">
              La noticia todavía no tiene imágenes.
            </p>
          </div>
        </section>

        <section class="flex flex-col gap-4 border-t border-border pt-7">
          <div>
            <h4 class="font-semibold text-mono">Videos de YouTube</h4>
            <p class="text-xs text-secondary-foreground">
              Laravel valida que la dirección pertenezca a YouTube.
            </p>
          </div>
          <form
            class="grid gap-3 rounded-lg border border-border p-4 md:grid-cols-2"
            @submit.prevent="addVideo"
          >
            <input
              v-model="videoForm.youtubeUrl"
              class="kt-input"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <input
              v-model="videoForm.title"
              class="kt-input"
              placeholder="Título del video"
              maxlength="255"
              required
            />
            <div class="md:col-span-2 flex justify-end">
              <button class="kt-btn kt-btn-primary" type="submit" :disabled="busy">
                Añadir video
              </button>
            </div>
          </form>

          <div class="flex flex-col gap-3">
            <article
              v-for="(video, index) in videos"
              :key="video.id"
              class="grid gap-3 rounded-lg border border-border p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <input
                v-model="video.title"
                class="kt-input"
                aria-label="Título del video"
                required
              />
              <input
                v-model="video.youtubeUrl"
                class="kt-input"
                type="url"
                aria-label="URL del video"
                required
              />
              <div class="flex flex-wrap justify-end gap-1">
                <button
                  class="kt-btn kt-btn-sm kt-btn-icon kt-btn-light"
                  type="button"
                  title="Subir posición"
                  :disabled="busy || index === 0"
                  @click="moveMedia('video', index, -1)"
                >
                  <i class="ki-filled ki-up"></i>
                </button>
                <button
                  class="kt-btn kt-btn-sm kt-btn-icon kt-btn-light"
                  type="button"
                  title="Bajar posición"
                  :disabled="busy || index === videos.length - 1"
                  @click="moveMedia('video', index, 1)"
                >
                  <i class="ki-filled ki-down"></i>
                </button>
                <button
                  class="kt-btn kt-btn-sm kt-btn-light"
                  type="button"
                  :disabled="busy"
                  @click="saveVideo(video)"
                >
                  Guardar
                </button>
                <button
                  class="kt-btn kt-btn-sm kt-btn-ghost text-destructive"
                  type="button"
                  :disabled="busy"
                  @click="pendingDelete = { type: 'video', id: video.id, label: 'este video' }"
                >
                  Eliminar
                </button>
              </div>
            </article>
            <p v-if="!videos.length" class="text-sm text-secondary-foreground">
              La noticia todavía no tiene videos.
            </p>
          </div>
        </section>
      </div>

      <div class="kt-card-footer sticky bottom-0 justify-end bg-background">
        <button class="kt-btn kt-btn-primary" type="button" :disabled="busy" @click="emit('close')">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
