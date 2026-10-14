<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { mapsApi } from '../api/maps.api'
import { layersApi } from '../api/layers.api'
import type { MapCollection, MapLayer } from '../types/layers.types'
import type { MapRegion } from '../types/maps.types'
import MapPreview from './MapPreview.vue'
import { getApiError } from '@/shared/api/errors'

const props = defineProps<{ layer?: MapLayer }>()
const emit = defineEmits<{ saved: [layer: MapLayer]; cancel: []; busyChange: [value: boolean] }>()
const auth = useAuthStore()
const name = ref('')
const description = ref('')
const kind = ref<'overlay' | 'boundary'>('overlay')
const regionId = ref('')
const regions = ref<MapRegion[]>([])
const file = ref<File | null>(null)
const preview = ref<MapCollection | null>(null)
const busy = ref(false)
watch(busy, (value) => emit('busyChange', value), { flush: 'sync' })
const error = ref('')
const replaceBoundary = ref(false)
const repair = ref(false)
const newRegion = ref('')
const isBoundary = computed(() => (props.layer?.kind ?? kind.value) === 'boundary')
const request = new AbortController()

onMounted(async () => {
  if (props.layer || !auth.hasPermission('regions.view')) return
  try {
    let page = 1
    let last = 1
    do {
      const result = await mapsApi.regions('', page, request.signal)
      regions.value.push(...result.data)
      last = result.meta.last_page
    } while (++page <= last)
  } catch (failure) {
    if (!request.signal.aborted) error.value = getApiError(failure).message
  }
})
onBeforeUnmount(() => request.abort())

async function createRegion(): Promise<void> {
  if (!newRegion.value.trim() || busy.value) return
  busy.value = true
  error.value = ''
  try {
    const region = await mapsApi.createRegion(newRegion.value.trim())
    regions.value.push(region)
    regionId.value = String(region.id)
    newRegion.value = ''
  } catch (failure) {
    report(failure)
  } finally {
    busy.value = false
  }
}
function chooseFile(event: Event): void {
  file.value = (event.target as HTMLInputElement).files?.[0] ?? null
  preview.value = null
  error.value = ''
  if (file.value && file.value.size > 10 * 1024 * 1024) {
    error.value = 'El archivo debe pesar como máximo 10 MB.'
    file.value = null
  }
}
function report(failure: unknown): void {
  const result = getApiError(failure)
  error.value = Object.values(result.errors).flat().join(' ') || result.message
}
async function inspect(): Promise<void> {
  if (!file.value || busy.value) return
  busy.value = true
  error.value = ''
  preview.value = null
  try {
    preview.value = await layersApi.preview(file.value, repair.value, request.signal)
  } catch (failure) {
    if (!request.signal.aborted) report(failure)
  } finally {
    busy.value = false
  }
}
async function save(): Promise<void> {
  if (!file.value || !preview.value || busy.value) return
  busy.value = true
  error.value = ''
  const form = new FormData()
  form.append('file', file.value)
  form.append('repair_geometries', repair.value ? '1' : '0')
  form.append('replace_boundary', replaceBoundary.value ? '1' : '0')
  if (props.layer) form.append('expected_version_id', String(props.layer.current_version.id))
  else {
    form.append('name', name.value.trim())
    form.append('description', description.value.trim())
    form.append('kind', kind.value)
    if (regionId.value) form.append('region_id', regionId.value)
  }
  try {
    emit('saved', await layersApi.save(form, props.layer?.id))
  } catch (failure) {
    report(failure)
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <section class="px-5 pt-5 sm:px-6">
    <p class="max-w-3xl text-sm leading-6 text-muted-foreground">
      Sube un GeoJSON en WGS84 o un ZIP con una sola capa Shapefile: .shp, .shx, .dbf y .prj;
      incluye .cpg si existe. Todos deben tener el mismo nombre. Máximo 10 MB. No incluyas archivos
      .gpkg.
    </p>
    <form class="mt-5 flex flex-col gap-4" @submit.prevent="save">
      <fieldset :disabled="busy" class="flex min-w-0 flex-col gap-4">
        <template v-if="!layer">
          <h3 class="text-sm font-semibold text-foreground">Información de la capa</h3>
          <div class="grid gap-4 md:grid-cols-2">
            <label class="flex flex-col gap-2 text-sm"
              >Nombre de la capa
              <input
                v-model="name"
                autofocus
                required
                maxlength="150"
                class="kt-input"
                placeholder="Ej.: Carreteras de la región Metropolitana"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm"
              >Uso de la capa
              <select v-model="kind" class="kt-select">
                <option value="overlay">Capa temática</option>
                <option
                  v-if="auth.hasPermission('regions.update') && auth.hasPermission('regions.view')"
                  value="boundary"
                >
                  Límite regional
                </option>
              </select>
            </label>
            <label v-if="auth.hasPermission('regions.view')" class="flex flex-col gap-2 text-sm"
              >Región
              <select v-model="regionId" :required="isBoundary" class="kt-select">
                <option value="">
                  {{ isBoundary ? 'Selecciona una región' : 'Sin región específica' }}
                </option>
                <option v-for="region in regions" :key="region.id" :value="String(region.id)">
                  {{ region.name }}
                </option>
              </select>
              <span class="text-xs text-muted-foreground"
                >Usa «Límite regional» para el contorno de una región y «Capa temática» para
                carreteras, ríos o puntos.</span
              >
            </label>
            <details
              v-if="auth.hasPermission('regions.create') && auth.hasPermission('regions.view')"
              class="md:col-span-2 rounded-lg border border-input p-3"
            >
              <summary class="cursor-pointer text-sm">¿Falta una región? Crear región</summary>
              <div class="mt-3 flex flex-wrap items-end gap-3">
                <label class="flex flex-col gap-2 text-sm"
                  >Nombre de la nueva región
                  <input
                    v-model="newRegion"
                    maxlength="150"
                    class="kt-input"
                    placeholder="Ej.: Yungas"
                  />
                </label>
                <button
                  type="button"
                  class="kt-btn kt-btn-outline"
                  :disabled="!newRegion.trim()"
                  @click="createRegion"
                >
                  Crear región
                </button>
              </div>
            </details>
            <label class="flex flex-col gap-2 text-sm"
              >Descripción (opcional)
              <textarea v-model="description" maxlength="2000" class="kt-textarea" rows="2" />
            </label>
          </div>
        </template>
        <p v-else class="text-sm text-muted-foreground">
          Se creará una nueva versión. El archivo anterior quedará conservado en el historial.
        </p>
        <label class="flex flex-col gap-2 text-sm"
          >Archivo cartográfico · ZIP o GeoJSON
          <input
            type="file"
            :autofocus="!!layer"
            accept=".zip,.geojson,.json"
            class="w-full cursor-pointer rounded-xl border border-dashed border-primary/30 bg-primary/5 p-5 text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-background file:px-4 file:py-2 file:font-medium file:text-primary"
            @change="chooseFile"
          />
        </label>
        <label class="flex items-start gap-2 text-sm">
          <input
            v-model="repair"
            type="checkbox"
            class="kt-checkbox mt-0.5"
            @change="preview = null"
          />
          Intentar reparar geometrías inválidas. Puede dividir polígonos o eliminar fragmentos
          degenerados; revisa el mapa antes de guardar.
        </label>
        <label v-if="isBoundary" class="flex items-start gap-2 text-sm">
          <input v-model="replaceBoundary" type="checkbox" class="kt-checkbox mt-0.5" />
          Autorizo sustituir el límite regional si ya existe.
        </label>
      </fieldset>
      <p v-if="busy" role="status" class="text-sm">Procesando el archivo, espera un momento…</p>
      <p v-if="error" role="alert" class="text-sm text-destructive">{{ error }}</p>

      <div v-if="preview" class="mt-5 flex flex-col gap-3">
        <p role="status" class="text-sm">
          Archivo válido · {{ preview.summary?.feature_count }} elementos ·
          {{ Object.keys(preview.summary?.geometry_types ?? {}).join(', ') }} · WGS84
        </p>
        <p
          v-if="preview.summary?.repaired_features"
          role="status"
          class="text-sm text-muted-foreground"
        >
          Se repararon {{ preview.summary.repaired_features }} geometrías. Verifica que el resultado
          conserve el límite esperado.
        </p>
        <MapPreview :collection="preview" :label="layer?.name || name || 'Vista previa'" />
      </div>
      <div
        class="sticky bottom-0 z-10 -mx-5 mt-5 grid grid-cols-2 gap-2 border-t border-input bg-background px-5 py-4 sm:-mx-6 sm:flex sm:items-center sm:justify-end sm:px-6"
      >
        <button
          type="button"
          class="kt-btn kt-btn-ghost order-3 col-span-2 justify-center sm:order-none sm:me-auto"
          :disabled="busy"
          @click="emit('cancel')"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="kt-btn kt-btn-outline"
          :disabled="!file || busy"
          @click="inspect"
        >
          Validar y previsualizar
        </button>
        <button type="submit" class="kt-btn kt-btn-primary" :disabled="!preview || busy">
          Guardar {{ layer ? 'nueva versión' : 'capa' }}
        </button>
      </div>
    </form>
  </section>
</template>
