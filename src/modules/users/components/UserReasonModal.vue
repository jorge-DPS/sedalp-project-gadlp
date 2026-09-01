<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
  description: string
  confirmLabel: string
  danger?: boolean
  saving: boolean
  error: string
}>()

const emit = defineEmits<{
  close: []
  confirm: [reason: string]
}>()

const reason = ref('')

watch(
  () => props.open,
  (open) => {
    if (open) reason.value = ''
  },
)
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
    <form class="kt-card w-full max-w-lg" @submit.prevent="emit('confirm', reason.trim())">
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
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="user_action_reason">Motivo</label>
          <textarea
            id="user_action_reason"
            v-model="reason"
            class="kt-input min-h-24 py-2"
            maxlength="500"
            required
          ></textarea>
          <span class="text-xs text-secondary-foreground"
            >Este motivo queda registrado por el backend.</span
          >
        </div>
      </div>
      <div class="kt-card-footer justify-end gap-2">
        <button class="kt-btn kt-btn-light" type="button" :disabled="saving" @click="emit('close')">
          Cancelar
        </button>
        <button
          class="kt-btn"
          :class="danger ? 'kt-btn-destructive' : 'kt-btn-primary'"
          type="submit"
          :disabled="saving || !reason.trim()"
        >
          {{ saving ? 'Procesando...' : confirmLabel }}
        </button>
      </div>
    </form>
  </div>
</template>
