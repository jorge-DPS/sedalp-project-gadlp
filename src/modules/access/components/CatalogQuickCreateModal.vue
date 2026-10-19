<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useAccessStore } from '@/modules/access/stores/access.store'
import { getApiError } from '@/shared/api/errors'

const props = defineProps<{ kind: 'unit' | 'profession' }>()
const emit = defineEmits<{ close: []; created: [id: number, name: string] }>()
const accessStore = useAccessStore()
const isUnit = computed(() => props.kind === 'unit')
const title = computed(() => (isUnit.value ? 'Nueva unidad organizacional' : 'Nueva profesión'))
const form = reactive({ name: '', code: '', description: '' })
const saving = ref(false)
const error = ref('')
const fieldErrors = ref<Record<string, string[]>>({})
const dialog = ref<HTMLDialogElement>()
let opener: HTMLElement | null = null

function close(): void {
  if (!saving.value) emit('close')
}

async function submit(): Promise<void> {
  if (saving.value) return
  saving.value = true
  error.value = ''
  fieldErrors.value = {}
  try {
    const item = isUnit.value
      ? await accessStore.createOrganizationalUnit({
          name: form.name.trim(),
          code: form.code.trim().toUpperCase(),
          description: form.description.trim() || null,
        })
      : await accessStore.createProfession({ name: form.name.trim() })
    emit('created', item.id, item.name)
  } catch (cause) {
    const response = getApiError(cause)
    error.value =
      response.status === 422 ? 'Revisa los campos indicados para continuar.' : response.message
    fieldErrors.value = response.errors
    await nextTick()
    dialog.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
  dialog.value?.showModal()
  dialog.value?.querySelector<HTMLInputElement>('#catalog-name')?.focus()
})

onBeforeUnmount(() => {
  dialog.value?.close()
  if (opener?.isConnected) opener.focus({ preventScroll: true })
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      aria-labelledby="catalog-title"
      aria-describedby="catalog-description"
      class="catalog-dialog m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl"
      @cancel.prevent="close"
    >
      <form :aria-busy="saving" @submit.prevent="submit">
        <header class="flex items-start gap-4 border-b border-border bg-muted/30 p-6">
          <span
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
            aria-hidden="true"
          >
            <i
              :class="isUnit ? 'ki-filled ki-office-bag' : 'ki-filled ki-teacher'"
              class="text-xl"
            ></i>
          </span>
          <div class="min-w-0 flex-1">
            <p class="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Información laboral
            </p>
            <h3 id="catalog-title" class="text-lg font-semibold tracking-tight">{{ title }}</h3>
            <p id="catalog-description" class="mt-2 text-sm leading-5 text-muted-foreground">
              Crea una opción y úsala en este registro sin salir del formulario.
            </p>
          </div>
          <button
            type="button"
            class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0"
            aria-label="Cerrar catálogo"
            :disabled="saving"
            @click="close"
          >
            <i class="ki-filled ki-cross" aria-hidden="true"></i>
          </button>
        </header>
        <fieldset :disabled="saving" class="grid min-w-0 gap-5 p-6">
          <p
            v-if="error"
            role="alert"
            class="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
          >
            {{ error }}
          </p>
          <div class="flex flex-col gap-2">
            <label for="catalog-name" class="text-sm font-medium">Nombre *</label>
            <input
              id="catalog-name"
              v-model="form.name"
              class="kt-input"
              maxlength="150"
              required
              :placeholder="isUnit ? 'Ej. Dirección de planificación' : 'Ej. Ingeniería civil'"
              :aria-invalid="Boolean(fieldErrors.name)"
              :aria-describedby="fieldErrors.name ? 'catalog-name-error' : undefined"
            />
            <span
              v-if="fieldErrors.name"
              id="catalog-name-error"
              class="text-xs text-destructive"
              >{{ fieldErrors.name[0] }}</span
            >
          </div>
          <template v-if="isUnit">
            <div class="flex flex-col gap-2">
              <label for="catalog-code" class="text-sm font-medium">Código *</label>
              <input
                id="catalog-code"
                v-model="form.code"
                class="kt-input uppercase"
                maxlength="50"
                required
                pattern="[A-Za-z][A-Za-z0-9_]*"
                placeholder="Ej. PLANIFICACION"
                :aria-invalid="Boolean(fieldErrors.code)"
                aria-describedby="catalog-code-help catalog-code-error"
              />
              <p id="catalog-code-help" class="text-xs leading-5 text-muted-foreground">
                Empieza con una letra. Usa letras sin tildes, números o guion bajo.
              </p>
              <span id="catalog-code-error" class="text-xs text-destructive">{{
                fieldErrors.code?.[0]
              }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <label for="catalog-description-input" class="text-sm font-medium"
                >Descripción
                <span class="font-normal text-muted-foreground">(opcional)</span></label
              >
              <textarea
                id="catalog-description-input"
                v-model="form.description"
                class="kt-textarea resize-y"
                rows="3"
                maxlength="255"
                placeholder="Describe brevemente la función de esta unidad."
                :aria-invalid="Boolean(fieldErrors.description)"
                aria-describedby="catalog-description-error"
              ></textarea>
              <span id="catalog-description-error" class="text-xs text-destructive">{{
                fieldErrors.description?.[0]
              }}</span>
            </div>
          </template>
          <p class="rounded-xl bg-muted/50 p-3 text-xs leading-5 text-muted-foreground">
            Esta opción quedará disponible para otros registros, incluso si después cancelas el
            formulario del usuario.
          </p>
        </fieldset>
        <footer
          class="flex flex-wrap justify-end gap-3 border-t border-border bg-muted/20 px-6 py-4"
        >
          <button type="button" class="kt-btn kt-btn-light" :disabled="saving" @click="close">
            Cancelar
          </button>
          <button type="submit" class="kt-btn kt-btn-primary" :disabled="saving">
            <span v-if="saving" class="kt-spinner kt-spinner-sm"></span
            >{{ saving ? 'Guardando…' : 'Guardar y seleccionar' }}
          </button>
        </footer>
      </form>
    </dialog>
  </Teleport>
</template>

<style scoped>
.catalog-dialog::backdrop {
  background: rgb(15 23 42 / 35%);
  backdrop-filter: blur(2px);
}
</style>
