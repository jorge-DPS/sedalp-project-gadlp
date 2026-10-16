<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { layersApi } from '../api/layers.api'
import { mapCategories } from '../types/layers.types'
import type { MapCategory, MapLayer } from '../types/layers.types'
import { getApiError } from '@/shared/api/errors'

const props = defineProps<{ layer: MapLayer; withdraw: boolean }>()
const emit = defineEmits<{ saved: [layer: MapLayer]; cancel: [] }>()
const dialog = ref<HTMLDialogElement>()
const category = ref<MapCategory>(props.layer.category)
const busy = ref(false)
const error = ref('')
let opener: HTMLElement | null = null
let previousOverflow = ''

function close(): void {
  if (!busy.value) emit('cancel')
}
async function submit(): Promise<void> {
  if (busy.value) return
  busy.value = true
  error.value = ''
  try {
    emit('saved', await layersApi.publication(props.layer, props.withdraw, category.value))
  } catch (failure) {
    const result = getApiError(failure)
    error.value = Object.values(result.errors).flat().join(' ') || result.message
  } finally {
    busy.value = false
  }
}
onMounted(() => {
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
  previousOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
  dialog.value?.showModal()
})
onBeforeUnmount(() => {
  dialog.value?.close()
  document.documentElement.style.overflow = previousOverflow
  if (opener?.isConnected) opener.focus({ preventScroll: true })
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      aria-labelledby="publication-title"
      aria-describedby="publication-description"
      class="publication-dialog m-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-2xl border border-input bg-background p-0 text-foreground shadow-2xl"
      @cancel.prevent="close"
    >
      <form class="flex max-h-[90dvh] flex-col" :aria-busy="busy" @submit.prevent="submit">
        <header class="flex items-start justify-between gap-4 border-b border-input p-5 sm:p-6">
          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Visibilidad pública
            </p>
            <h2 id="publication-title" class="text-xl font-semibold">
              {{ withdraw ? 'Retirar publicación' : 'Publicar capa' }}
            </h2>
          </div>
          <button
            type="button"
            class="kt-btn kt-btn-icon kt-btn-ghost"
            aria-label="Cerrar ventana"
            :disabled="busy"
            @click="close"
          >
            <i class="ki-filled ki-cross" aria-hidden="true" />
          </button>
        </header>
        <div class="min-h-0 space-y-5 overflow-y-auto p-5 sm:p-6">
          <div class="rounded-xl border border-input bg-secondary/40 p-4">
            <p class="break-words font-medium">{{ layer.name }}</p>
            <p class="mt-1 text-sm text-muted-foreground">
              Versión
              {{ withdraw ? layer.published_version?.number : layer.current_version.number }} ·
              {{ withdraw ? 'Actualmente pública' : 'Lista para revisión final' }}
            </p>
          </div>
          <p id="publication-description" class="text-sm leading-6 text-muted-foreground">
            {{
              withdraw
                ? 'La capa dejará de estar disponible en la API pública. Sus archivos y versiones permanecerán en el administrador.'
                : 'La versión que acabas de revisar quedará disponible en la API pública. Si ya hay una versión publicada, será reemplazada.'
            }}
          </p>
          <label
            v-if="!withdraw && layer.kind !== 'boundary'"
            class="flex flex-col gap-2 text-sm font-medium"
          >
            Categoría pública
            <select v-model="category" class="kt-select" :disabled="busy" required>
              <template v-for="(label, value) in mapCategories" :key="value">
                <option v-if="value !== 'boundaries'" :value="value">{{ label }}</option>
              </template>
            </select>
          </label>
          <p v-if="!withdraw" class="text-xs leading-5 text-muted-foreground">
            Verifica el nombre, la descripción y la geometría antes de confirmar. Los atributos
            originales del archivo no se publican.
          </p>
          <p
            v-if="error"
            role="alert"
            class="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
          >
            {{ error }}
          </p>
        </div>
        <footer class="flex flex-wrap justify-end gap-2 border-t border-input px-5 py-4 sm:px-6">
          <button
            type="button"
            autofocus
            class="kt-btn kt-btn-ghost"
            :disabled="busy"
            @click="close"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="kt-btn"
            :class="withdraw ? 'kt-btn-destructive' : 'kt-btn-primary'"
            :disabled="busy"
          >
            {{ busy ? 'Guardando…' : withdraw ? 'Retirar del público' : 'Confirmar publicación' }}
          </button>
        </footer>
      </form>
    </dialog>
  </Teleport>
</template>

<style scoped>
.publication-dialog::backdrop {
  background: rgb(15 23 42 / 55%);
  backdrop-filter: blur(3px);
}
</style>
