<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const entries = computed(() =>
  [
    {
      name: 'maps.index',
      label: 'Visor general',
      permission: 'regions.view',
      icon: 'ki-geolocation',
    },
    { name: 'maps.layers', label: 'Gestión de capas', permission: 'maps.view', icon: 'ki-folder' },
  ].filter((entry) => auth.hasPermission(entry.permission)),
)
const active = computed(() => entries.value.some((entry) => entry.name === route.name))
const expanded = ref(active.value)
watch(
  () => route.name,
  () => {
    if (active.value) expanded.value = true
  },
)
</script>

<template>
  <div v-if="entries.length" class="kt-menu-item">
    <button
      type="button"
      class="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :class="active ? 'bg-secondary text-mono' : 'text-foreground'"
      :aria-expanded="expanded"
      aria-controls="cartography-submenu"
      @click="expanded = !expanded"
    >
      <i
        class="ki-filled ki-map text-lg"
        :class="active ? 'text-blue-400' : 'text-muted-foreground'"
        aria-hidden="true"
      />
      <span class="grow">Cartografía</span>
      <i
        class="ki-filled ki-down text-xs text-muted-foreground transition-transform motion-reduce:transition-none"
        :class="{ 'rotate-180': expanded }"
        aria-hidden="true"
      />
    </button>
    <nav
      v-show="expanded"
      id="cartography-submenu"
      aria-label="Secciones de cartografía"
      class="ms-5 mt-2 flex flex-col gap-1 border-s border-white/10 ps-3"
    >
      <RouterLink
        v-for="entry in entries"
        :key="entry.name"
        :to="{ name: entry.name }"
        data-kt-drawer-dismiss="true"
        active-class=""
        exact-active-class=""
        class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :class="
          route.name === entry.name
            ? 'bg-blue-500/15 font-medium text-blue-300'
            : 'text-zinc-400 hover:bg-secondary hover:text-foreground'
        "
      >
        <i class="ki-filled text-base" :class="entry.icon" aria-hidden="true" />
        {{ entry.label }}
      </RouterLink>
    </nav>
  </div>
</template>
