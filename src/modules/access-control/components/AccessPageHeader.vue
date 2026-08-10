<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  actionLabel: { type: String, required: true },
  actionIcon: { type: String, default: 'ki-plus' },
})

defineEmits(['action'])
</script>

<template>
  <div class="kt-container-fixed pb-5">
    <div class="flex items-start justify-between flex-wrap gap-4">
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2 text-sm text-secondary-foreground">
          <RouterLink to="/" class="hover:text-primary">Inicio</RouterLink>
          <i class="ki-filled ki-right text-xs"></i>
          <span>Seguridad</span>
        </div>
        <h1 class="text-2xl font-semibold text-mono">{{ title }}</h1>
        <p class="text-sm text-secondary-foreground">{{ description }}</p>
      </div>
      <button class="kt-btn kt-btn-primary" type="button" @click="$emit('action')">
        <i class="ki-filled" :class="actionIcon"></i>
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>
