<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  actionLabel: { type: String, required: true },
  actionIcon: { type: String, default: 'ki-plus' },
})

defineEmits(['action'])

const route = useRoute()
const currentPage = computed(() => route.meta.title ?? 'Página actual')
const breadcrumbs = computed(() => route.meta.breadcrumbs ?? [currentPage.value])
</script>

<template>
  <div class="kt-container-fixed pb-5">
    <div class="flex items-start justify-between flex-wrap gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="text-2xl font-semibold text-mono">{{ title }}</h1>
        <div class="flex items-center gap-2 text-sm text-secondary-foreground">
          <RouterLink to="/" class="hover:text-primary">Inicio</RouterLink>
          <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb">
            <span class="text-muted-foreground">/</span>
            <span :class="{ 'text-mono': index === breadcrumbs.length - 1 }">
              {{ breadcrumb }}
            </span>
          </template>
        </div>

        <p class="text-sm text-secondary-foreground">{{ description }}</p>
      </div>
      <button class="kt-btn kt-btn-primary" type="button" @click="$emit('action')">
        <i class="ki-filled" :class="actionIcon"></i>
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>
