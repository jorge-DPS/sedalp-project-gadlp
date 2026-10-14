<script setup lang="ts">
defineProps<{ title: string; description: string }>()
</script>

<template>
  <div class="kt-container-fixed pb-6">
    <nav
      aria-label="Ruta de navegación"
      class="mb-4 flex items-center gap-2 text-xs text-muted-foreground"
    >
      <span>Cartografía</span>
      <i class="ki-filled ki-right text-[10px]" aria-hidden="true" />
      <span aria-current="page" class="text-foreground">{{ title }}</span>
    </nav>
    <div class="flex flex-wrap items-start justify-between gap-5">
      <div class="max-w-2xl">
        <h1 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {{ title }}
        </h1>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ description }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-2"><slot name="actions" /></div>
    </div>
  </div>
</template>
