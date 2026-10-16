<script setup lang="ts">
import type { MapLayer } from '../types/layers.types'
defineProps<{ status: MapLayer['publication_status'] }>()
const labels = { draft: 'Borrador', published: 'Publicado', pending: 'Cambios pendientes' }
const colors = {
  draft: 'bg-secondary text-muted-foreground',
  published: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  pending: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium"
    :class="colors[status]"
  >
    <span class="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
    {{ labels[status] }}
  </span>
</template>
