<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  description: string
  confirmLabel: string
  danger?: boolean
  busy: boolean
  error: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true"
    :aria-label="title"
    @click.self="emit('close')"
  >
    <div class="kt-card w-full max-w-lg">
      <div class="kt-card-header">
        <h3 class="kt-card-title">{{ title }}</h3>
        <button
          class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
          type="button"
          @click="emit('close')"
        >
          <i class="ki-filled ki-cross"></i>
        </button>
      </div>
      <div class="kt-card-content flex flex-col gap-4">
        <p class="text-sm leading-6 text-secondary-foreground">{{ description }}</p>
        <div v-if="error" class="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {{ error }}
        </div>
      </div>
      <div class="kt-card-footer justify-end gap-2">
        <button class="kt-btn kt-btn-light" type="button" :disabled="busy" @click="emit('close')">
          Cancelar
        </button>
        <button
          class="kt-btn"
          :class="danger ? 'kt-btn-destructive' : 'kt-btn-primary'"
          type="button"
          :disabled="busy"
          @click="emit('confirm')"
        >
          {{ busy ? 'Procesando...' : confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
