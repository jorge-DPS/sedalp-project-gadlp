<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import MapLayerUpload from './MapLayerUpload.vue'
import type { MapLayer } from '../types/layers.types'

defineProps<{ layer?: MapLayer }>()
const emit = defineEmits<{ saved: [layer: MapLayer]; cancel: [] }>()
const dialog = ref<HTMLDialogElement>()
const busy = ref(false)
let previousOverflow = ''
let opener: HTMLElement | null = null

function requestClose(): void {
  if (!busy.value) emit('cancel')
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
      class="layer-upload-modal m-auto w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-2xl border border-input bg-background p-0 text-foreground shadow-2xl"
      aria-labelledby="layer-upload-title"
      aria-describedby="layer-upload-description"
      @cancel.prevent="requestClose"
    >
      <div class="flex max-h-[90dvh] flex-col">
        <header
          class="flex shrink-0 items-start justify-between gap-4 border-b border-input px-5 py-5 sm:px-6"
        >
          <div class="min-w-0">
            <h2 id="layer-upload-title" class="text-xl font-semibold tracking-tight">
              {{ layer ? 'Actualizar archivo' : 'Nueva capa' }}
            </h2>
            <p
              id="layer-upload-description"
              class="mt-1.5 break-words text-sm leading-5 text-muted-foreground"
            >
              {{
                layer
                  ? layer.name + ' · Nueva versión del archivo cartográfico'
                  : 'Añade información al territorio y revisa su mapa antes de guardar.'
              }}
            </p>
          </div>
          <button
            type="button"
            class="kt-btn kt-btn-icon kt-btn-ghost shrink-0"
            aria-label="Cerrar ventana"
            :disabled="busy"
            @click="requestClose"
          >
            <i class="ki-filled ki-cross" aria-hidden="true" />
          </button>
        </header>
        <div :aria-busy="busy" class="min-h-0 overflow-y-auto overscroll-contain">
          <MapLayerUpload
            :layer="layer"
            @busy-change="busy = $event"
            @saved="emit('saved', $event)"
            @cancel="requestClose"
          />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.layer-upload-modal::backdrop {
  background: rgb(15 23 42 / 55%);
  backdrop-filter: blur(3px);
}
@media (max-width: 639px) {
  .layer-upload-modal {
    width: calc(100% - 1rem);
    max-width: none;
  }
}
</style>
