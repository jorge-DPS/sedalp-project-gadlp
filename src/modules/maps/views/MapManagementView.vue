<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import MapsPageHeader from '../components/MapsPageHeader.vue'
import RegionalMap from '../components/RegionalMap.vue'
import { regionColor } from '../components/regionColors'
import { useMapsStore } from '../stores/maps.store'
import { useAuthStore } from '@/stores/auth'
import { getApiError } from '@/shared/api/errors'

const store = useMapsStore()
const auth = useAuthStore()
const { boundaries, visibleIds } = storeToRefs(store)
const map = ref<InstanceType<typeof RegionalMap>>()
const search = ref('')
const selectedId = ref<number>()
const loading = ref(false)
const error = ref('')
let request: AbortController | undefined
const filtered = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('es')
  return boundaries.value.filter((item) =>
    (item.properties.name + ' ' + (item.properties.code ?? ''))
      .toLocaleLowerCase('es')
      .includes(query),
  )
})

async function load(): Promise<void> {
  request?.abort()
  const controller = new AbortController()
  request = controller
  loading.value = true
  error.value = ''
  try {
    await store.fetchBoundaries(controller.signal)
  } catch (failure) {
    if (!controller.signal.aborted) error.value = getApiError(failure).message
  } finally {
    if (!controller.signal.aborted) loading.value = false
  }
}
async function focusRegion(id: number): Promise<void> {
  store.setVisible(id, true)
  selectedId.value = id
  await nextTick()
  map.value?.focusRegion(id)
}
function toggle(id: number, event: Event): void {
  store.setVisible(id, (event.target as HTMLInputElement).checked)
}
onMounted(() => {
  void load()
})
onBeforeUnmount(() => request?.abort())
</script>

<template>
  <MapsPageHeader
    title="Visor general"
    description="Explora los límites regionales de La Paz. Elige qué regiones quieres ver en el mapa."
  >
    <template #actions>
      <button type="button" class="kt-btn kt-btn-outline" :disabled="loading" @click="load">
        <i
          class="ki-filled ki-arrows-circle"
          :class="{ 'animate-spin': loading }"
          aria-hidden="true"
        />
        {{ loading ? 'Actualizando…' : 'Actualizar' }}
      </button>
      <RouterLink
        v-if="auth.hasPermission('maps.view')"
        :to="{ name: 'maps.layers' }"
        class="kt-btn kt-btn-primary"
      >
        <i class="ki-filled ki-map" aria-hidden="true" /> Gestionar capas
      </RouterLink>
    </template>
  </MapsPageHeader>
  <div class="kt-container-fixed pb-6">
    <div
      v-if="error"
      role="alert"
      class="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm"
    >
      <p class="text-destructive">
        {{ error }} <span v-if="boundaries.length">Se conserva la última vista disponible.</span>
      </p>
      <button class="kt-btn kt-btn-sm kt-btn-outline" :disabled="loading" @click="load">
        Reintentar
      </button>
    </div>
    <section
      class="overflow-hidden rounded-xl border border-input bg-background shadow-sm"
      aria-label="Explorador regional"
      :aria-busy="loading"
    >
      <div
        class="grid min-w-0 md:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]"
      >
        <aside
          class="flex min-w-0 flex-col border-b border-input md:border-r md:border-b-0"
          aria-label="Límites regionales"
        >
          <div class="p-5 pb-3">
            <h2 class="text-lg font-semibold tracking-tight text-foreground">Límites regionales</h2>
            <p class="mt-1 text-xs text-muted-foreground">{{ boundaries.length }} disponibles</p>
            <label
              class="mt-5 flex items-center gap-2 rounded-lg border border-input px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
            >
              <i class="ki-filled ki-magnifier text-muted-foreground" aria-hidden="true" />
              <input
                v-model="search"
                type="search"
                maxlength="150"
                aria-label="Buscar región"
                placeholder="Buscar región…"
                class="h-10 w-full min-w-0 bg-transparent text-sm outline-none"
              />
            </label>
            <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium">
              <button
                type="button"
                class="text-primary hover:underline disabled:opacity-40"
                :disabled="!boundaries.length || visibleIds.length === boundaries.length"
                @click="store.showAll"
              >
                Mostrar todos
              </button>
              <button
                type="button"
                class="text-primary hover:underline disabled:opacity-40"
                :disabled="!visibleIds.length"
                @click="store.hideAll"
              >
                Ocultar todos
              </button>
            </div>
          </div>
          <p
            v-if="loading && !boundaries.length"
            role="status"
            class="px-5 py-8 text-sm text-muted-foreground"
          >
            Cargando límites regionales…
          </p>
          <div v-else-if="!boundaries.length" class="px-5 py-8">
            <i class="ki-filled ki-geolocation text-3xl text-muted-foreground" aria-hidden="true" />
            <h3 class="mt-3 text-sm font-semibold">Aún no hay límites registrados</h3>
            <p class="mt-2 text-xs leading-5 text-muted-foreground">
              Carga una capa de tipo «Límite regional» y asígnala a su región para verla en este
              mapa.
            </p>
          </div>
          <p
            v-else-if="!filtered.length"
            role="status"
            class="px-5 py-8 text-sm text-muted-foreground"
          >
            No hay regiones que coincidan con la búsqueda.
          </p>
          <ul v-else class="max-h-64 overflow-y-auto px-3 pb-3 md:max-h-[520px]">
            <li
              v-for="boundary in filtered"
              :key="boundary.properties.region_id"
              class="flex items-center gap-3 border-b border-input/70 px-2 py-4 last:border-0"
              :class="{ 'rounded-lg bg-secondary': selectedId === boundary.properties.region_id }"
            >
              <label class="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  class="kt-checkbox shrink-0"
                  :checked="visibleIds.includes(boundary.properties.region_id)"
                  :aria-label="'Mostrar ' + boundary.properties.name"
                  @change="toggle(boundary.properties.region_id, $event)"
                />
                <span
                  class="h-3 w-3 shrink-0 rounded-full"
                  :style="{ backgroundColor: regionColor(boundary.properties.region_id) }"
                  aria-hidden="true"
                />
                <span class="min-w-0">
                  <span class="block break-words text-sm font-medium leading-5 text-foreground">{{
                    boundary.properties.name
                  }}</span>
                  <span class="mt-1 block text-xs text-muted-foreground">{{
                    visibleIds.includes(boundary.properties.region_id)
                      ? 'Visible en el mapa'
                      : 'Límite oculto'
                  }}</span>
                </span>
              </label>
              <button
                type="button"
                class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0"
                :aria-label="'Centrar ' + boundary.properties.name"
                :title="'Centrar ' + boundary.properties.name"
                @click="focusRegion(boundary.properties.region_id)"
              >
                <i class="ki-filled ki-geolocation" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </aside>
        <RegionalMap
          ref="map"
          :boundaries="boundaries"
          :visible-ids="visibleIds"
          :selected-id="selectedId"
          @select="selectedId = $event"
        />
      </div>
      <footer
        class="flex flex-wrap items-center justify-between gap-2 border-t border-input px-5 py-4"
      >
        <p role="status" class="text-sm font-medium text-foreground">
          {{ visibleIds.length }} de {{ boundaries.length }} regiones visibles
        </p>
        <p class="text-xs text-muted-foreground">Desmarca una región para ocultar su límite.</p>
      </footer>
    </section>
  </div>
</template>
