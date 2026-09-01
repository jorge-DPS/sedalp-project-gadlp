<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import type {
  News,
  NewsContentNode,
  NewsPayload,
  NewsStatus,
} from '@/modules/news/types/news.types'

interface FormStep {
  title: string
  description: string
  icon: string
}

const props = defineProps<{
  open: boolean
  news: News | null
  canPublish: boolean
  saving: boolean
  error: string
  fieldErrors: Record<string, string[]>
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: NewsPayload]
}>()

const activeStep = ref(0)
const validationError = ref('')
const form = reactive({
  title: '',
  subtitle: '',
  excerpt: '',
  description: '',
  body: '',
  status: 'draft' as NewsStatus,
  publishedAt: '',
})
let originalBody = ''

const steps = computed<FormStep[]>(() => [
  {
    title: 'Contenido',
    description: 'Información principal',
    icon: 'ki-notepad-edit',
  },
  {
    title: props.news ? 'Publicación' : 'Revisión',
    description: props.news ? 'Estado y revisión' : 'Crear antes de añadir medios',
    icon: props.news ? 'ki-send' : 'ki-check-circle',
  },
])
const progress = computed(() => ((activeStep.value + 1) / steps.value.length) * 100)

function contentToText(node: NewsContentNode | null | undefined): string {
  if (!node) return ''
  if (node.type === 'text') return node.text ?? ''
  const separator = node.type === 'doc' ? '\n\n' : ''
  return (node.content ?? []).map(contentToText).filter(Boolean).join(separator)
}

function textToContent(value: string): NewsContentNode {
  const paragraphs = value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      type: 'paragraph',
      content: [{ type: 'text', text: paragraph }],
    }))

  return { type: 'doc', content: paragraphs }
}

function resetForm(): void {
  validationError.value = ''
  activeStep.value = 0
  originalBody = contentToText(props.news?.content)
  form.title = props.news?.title ?? ''
  form.subtitle = props.news?.subtitle ?? ''
  form.excerpt = props.news?.excerpt ?? ''
  form.description = props.news?.description ?? ''
  form.body = originalBody
  form.status = props.news?.status ?? 'draft'
  form.publishedAt = props.news?.publishedAt ?? ''
}

watch(
  () => [props.open, props.news] as const,
  ([open]) => {
    if (open) resetForm()
  },
  { immediate: true },
)

watch(
  () => form.status,
  (status) => {
    if (status === 'published' && !form.publishedAt) {
      form.publishedAt = new Date().toISOString().slice(0, 10)
    }
  },
)

watch(
  () => props.fieldErrors,
  (errors) => {
    const fields = Object.keys(errors)
    activeStep.value = fields.some((field) => ['status', 'published_at'].includes(field)) ? 1 : 0
  },
)

function fieldError(field: string): string {
  return props.fieldErrors[field]?.[0] ?? ''
}

function validateStep(step: number): boolean {
  validationError.value = ''

  if (
    step === 0 &&
    (!form.title.trim() || !form.excerpt.trim() || !form.description.trim() || !form.body.trim())
  ) {
    validationError.value = 'Completa el título, resumen, descripción y contenido para continuar.'
    return false
  }

  if (step === 1 && props.news && form.status === 'published' && !form.publishedAt) {
    validationError.value = 'Selecciona la fecha de publicación antes de guardar.'
    return false
  }

  return true
}

function goToStep(step: number): void {
  if (step <= activeStep.value || validateStep(activeStep.value)) {
    activeStep.value = step
  }
}

function nextStep(): void {
  if (!validateStep(activeStep.value)) return
  activeStep.value = Math.min(activeStep.value + 1, steps.value.length - 1)
}

function previousStep(): void {
  activeStep.value = Math.max(activeStep.value - 1, 0)
  validationError.value = ''
}

function close(): void {
  if (!props.saving) emit('close')
}

function submit(): void {
  for (let step = 0; step < steps.value.length; step += 1) {
    if (!validateStep(step)) {
      activeStep.value = step
      return
    }
  }

  const content =
    props.news && form.body === originalBody ? props.news.content : textToContent(form.body)
  const status: NewsStatus = props.news ? form.status : 'draft'

  emit('submit', {
    title: form.title.trim(),
    subtitle: form.subtitle.trim() || null,
    excerpt: form.excerpt.trim(),
    description: form.description.trim(),
    content,
    status,
    published_at: status === 'published' ? form.publishedAt || null : null,
  })
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 backdrop-blur-[2px] sm:p-6"
    role="dialog"
    aria-modal="true"
    :aria-label="news ? 'Editar noticia' : 'Crear noticia'"
    @click.self="close"
  >
    <div
      class="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
    >
      <header
        class="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7"
      >
        <div class="flex min-w-0 items-center gap-3.5">
          <span
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
          >
            <i class="ki-filled ki-notepad-edit text-2xl"></i>
          </span>
          <div class="min-w-0">
            <h2 class="truncate text-lg font-semibold text-mono sm:text-xl">
              {{ news ? 'Editar noticia' : 'Crear noticia' }}
            </h2>
            <p class="truncate text-sm text-secondary-foreground">
              {{
                news
                  ? 'Actualiza el contenido y controla su publicación.'
                  : 'Primero guarda el contenido; después añadirás imágenes y videos.'
              }}
            </p>
          </div>
        </div>
        <button
          class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0"
          type="button"
          :disabled="saving"
          aria-label="Cerrar formulario"
          @click="close"
        >
          <i class="ki-filled ki-cross text-lg"></i>
        </button>
      </header>

      <div class="h-1 shrink-0 bg-muted">
        <div
          class="h-full bg-primary transition-[width] duration-300"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <div class="grid min-h-0 grow lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside class="border-b border-border bg-muted/30 p-4 lg:border-r lg:border-b-0 lg:p-5">
          <nav
            class="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
            aria-label="Pasos del formulario"
          >
            <button
              v-for="(step, index) in steps"
              :key="step.title"
              class="group flex min-w-52 items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors lg:min-w-0"
              :class="
                index === activeStep
                  ? 'bg-background shadow-sm ring-1 ring-border'
                  : 'hover:bg-background/70'
              "
              type="button"
              :aria-current="index === activeStep ? 'step' : undefined"
              @click="goToStep(index)"
            >
              <span
                class="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold transition-colors"
                :class="
                  index === activeStep
                    ? 'bg-primary text-primary-foreground'
                    : index < activeStep
                      ? 'bg-green-500/15 text-green-600'
                      : 'bg-muted text-muted-foreground'
                "
              >
                <i v-if="index < activeStep" class="ki-filled ki-check"></i>
                <i v-else class="ki-filled" :class="step.icon"></i>
              </span>
              <span class="min-w-0">
                <span
                  class="block text-sm font-semibold"
                  :class="index === activeStep ? 'text-mono' : 'text-secondary-foreground'"
                  >{{ step.title }}</span
                >
                <span class="block truncate text-xs text-muted-foreground">{{
                  step.description
                }}</span>
              </span>
            </button>
          </nav>

          <div class="mt-5 hidden rounded-xl border border-border bg-background p-4 lg:block">
            <div class="mb-2 flex items-center gap-2 text-sm font-medium text-mono">
              <i class="ki-filled ki-information-2 text-primary"></i>
              Flujo seguro
            </div>
            <p class="text-xs leading-5 text-secondary-foreground">
              La noticia se guarda primero como borrador. Después podrás adjuntar medios sin perder
              el contenido si alguna carga falla.
            </p>
          </div>
        </aside>

        <main class="min-h-0 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
          <div
            v-if="error"
            class="mb-5 flex items-start gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive"
          >
            <i class="ki-filled ki-information-2 mt-0.5"></i>
            <span>{{ error }}</span>
          </div>
          <div
            v-if="validationError"
            class="mb-5 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning-foreground"
          >
            <i class="ki-filled ki-information-2 mt-0.5"></i>
            <span>{{ validationError }}</span>
          </div>

          <section v-if="activeStep === 0" class="mx-auto max-w-3xl">
            <div class="mb-7">
              <h3 class="text-xl font-semibold text-mono">Contenido de la noticia</h3>
              <p class="mt-1.5 text-sm text-secondary-foreground">
                El resumen aparecerá en la tarjeta pública y el contenido completo en el detalle.
              </p>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div class="flex flex-col gap-2 md:col-span-2">
                <label class="text-sm font-medium text-mono" for="news_title"
                  >Título <span class="text-destructive">*</span></label
                >
                <input
                  id="news_title"
                  v-model="form.title"
                  class="kt-input h-11 text-base font-medium"
                  maxlength="255"
                  placeholder="Escribe un título claro y directo"
                />
                <span v-if="fieldError('title')" class="text-xs text-destructive">{{
                  fieldError('title')
                }}</span>
              </div>
              <div class="flex flex-col gap-2 md:col-span-2">
                <label class="text-sm font-medium text-mono" for="news_subtitle"
                  >Subtítulo
                  <span class="font-normal text-muted-foreground">(opcional)</span></label
                >
                <input
                  id="news_subtitle"
                  v-model="form.subtitle"
                  class="kt-input h-11"
                  maxlength="255"
                  placeholder="Añade contexto adicional al título"
                />
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between gap-3">
                  <label class="text-sm font-medium text-mono" for="news_excerpt"
                    >Resumen <span class="text-destructive">*</span></label
                  >
                  <span class="text-xs text-muted-foreground"
                    >{{ form.excerpt.length }} / 1000</span
                  >
                </div>
                <textarea
                  id="news_excerpt"
                  v-model="form.excerpt"
                  class="kt-input min-h-32 resize-y py-3 leading-6"
                  maxlength="1000"
                  placeholder="Resume la noticia para la tarjeta pública"
                ></textarea>
                <span v-if="fieldError('excerpt')" class="text-xs text-destructive">{{
                  fieldError('excerpt')
                }}</span>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-mono" for="news_description"
                  >Descripción <span class="text-destructive">*</span></label
                >
                <textarea
                  id="news_description"
                  v-model="form.description"
                  class="kt-input min-h-32 resize-y py-3 leading-6"
                  placeholder="Descripción requerida por el contrato actual"
                ></textarea>
                <span v-if="fieldError('description')" class="text-xs text-destructive">{{
                  fieldError('description')
                }}</span>
              </div>
              <div class="flex flex-col gap-2 md:col-span-2">
                <label class="text-sm font-medium text-mono" for="news_content"
                  >Contenido completo <span class="text-destructive">*</span></label
                >
                <textarea
                  id="news_content"
                  v-model="form.body"
                  class="kt-input min-h-64 resize-y py-3 leading-7"
                  placeholder="Desarrolla aquí el contenido completo de la noticia"
                ></textarea>
                <div class="flex items-center gap-2 text-xs text-muted-foreground">
                  <i class="ki-filled ki-information-2"></i>
                  Separa los párrafos con una línea en blanco.
                </div>
                <span v-if="fieldError('content')" class="text-xs text-destructive">{{
                  fieldError('content')
                }}</span>
              </div>
            </div>
          </section>

          <section v-else class="mx-auto max-w-3xl">
            <div class="mb-7">
              <h3 class="text-xl font-semibold text-mono">
                {{ news ? 'Publicación y revisión' : 'Revisa antes de crear' }}
              </h3>
              <p class="mt-1.5 text-sm text-secondary-foreground">
                {{
                  news
                    ? 'Define la visibilidad y revisa la información antes de guardar.'
                    : 'La noticia se creará como borrador y luego se abrirá el administrador multimedia.'
                }}
              </p>
            </div>

            <div class="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <div v-if="news">
                <p class="mb-3 text-sm font-semibold text-mono">Estado de la noticia</p>
                <div class="grid gap-3">
                  <label
                    v-for="option in [
                      {
                        value: 'draft',
                        title: 'Borrador',
                        description:
                          'Permanece en administración y puede completarse más adelante.',
                        icon: 'ki-note',
                        tone: 'bg-amber-500/10 text-amber-600',
                      },
                      {
                        value: 'published',
                        title: 'Publicada',
                        description: 'Estará disponible para mostrarse en el portal público.',
                        icon: 'ki-send',
                        tone: 'bg-green-500/10 text-green-600',
                      },
                      {
                        value: 'archived',
                        title: 'Archivada',
                        description: 'Se conserva sin mostrarse como noticia vigente.',
                        icon: 'ki-archive',
                        tone: 'bg-slate-500/10 text-slate-600',
                      },
                    ]"
                    :key="option.value"
                    class="flex items-start gap-3 rounded-xl border p-4 transition-colors"
                    :class="[
                      form.status === option.value
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:bg-muted/30',
                      option.value !== 'published' || canPublish
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed opacity-60',
                    ]"
                  >
                    <input
                      v-model="form.status"
                      class="kt-radio mt-1"
                      type="radio"
                      :value="option.value"
                      :disabled="option.value === 'published' && !canPublish"
                    />
                    <span
                      class="flex size-9 shrink-0 items-center justify-center rounded-lg"
                      :class="option.tone"
                      ><i class="ki-filled" :class="option.icon"></i
                    ></span>
                    <span>
                      <span class="block text-sm font-semibold text-mono">{{ option.title }}</span>
                      <span class="mt-1 block text-xs leading-5 text-secondary-foreground">{{
                        option.description
                      }}</span>
                    </span>
                  </label>
                </div>

                <div
                  v-if="form.status === 'published'"
                  class="mt-5 flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-4"
                >
                  <label class="text-sm font-medium text-mono" for="news_published_at"
                    >Fecha de publicación <span class="text-destructive">*</span></label
                  >
                  <input
                    id="news_published_at"
                    v-model="form.publishedAt"
                    class="kt-input bg-background"
                    type="date"
                  />
                  <span v-if="fieldError('published_at')" class="text-xs text-destructive">{{
                    fieldError('published_at')
                  }}</span>
                </div>
              </div>

              <div v-else class="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div class="mb-5 flex items-center gap-3">
                  <span
                    class="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                    ><i class="ki-filled ki-route"></i
                  ></span>
                  <div>
                    <p class="font-semibold text-mono">Proceso de publicación</p>
                    <p class="text-xs text-secondary-foreground">Tres etapas seguras y separadas</p>
                  </div>
                </div>
                <ol class="flex flex-col gap-4">
                  <li class="flex gap-3">
                    <span
                      class="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                      >1</span
                    >
                    <span>
                      <span class="block text-sm font-semibold text-mono">Crear el borrador</span>
                      <span class="text-xs leading-5 text-secondary-foreground"
                        >Se guarda primero el contenido principal.</span
                      >
                    </span>
                  </li>
                  <li class="flex gap-3">
                    <span
                      class="flex size-7 shrink-0 items-center justify-center rounded-full bg-background text-xs font-semibold text-primary ring-1 ring-primary/25"
                      >2</span
                    >
                    <span>
                      <span class="block text-sm font-semibold text-mono">Añadir multimedia</span>
                      <span class="text-xs leading-5 text-secondary-foreground"
                        >Sube imágenes y registra videos después de crearla.</span
                      >
                    </span>
                  </li>
                  <li class="flex gap-3">
                    <span
                      class="flex size-7 shrink-0 items-center justify-center rounded-full bg-background text-xs font-semibold text-primary ring-1 ring-primary/25"
                      >3</span
                    >
                    <span>
                      <span class="block text-sm font-semibold text-mono">Publicar</span>
                      <span class="text-xs leading-5 text-secondary-foreground"
                        >Revisa el resultado y cambia su estado cuando esté lista.</span
                      >
                    </span>
                  </li>
                </ol>
              </div>

              <aside class="rounded-xl border border-border bg-muted/20 p-5">
                <div class="mb-4 flex items-center gap-2 text-sm font-semibold text-mono">
                  <i class="ki-filled ki-eye text-primary"></i>Resumen final
                </div>
                <dl class="flex flex-col gap-4">
                  <div>
                    <dt class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Título
                    </dt>
                    <dd class="mt-1.5 text-sm font-medium leading-6 text-mono">
                      {{ form.title || 'Sin título' }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Resumen
                    </dt>
                    <dd class="mt-1.5 line-clamp-5 text-sm leading-6 text-secondary-foreground">
                      {{ form.excerpt || 'Sin resumen' }}
                    </dd>
                  </div>
                  <div class="border-t border-border pt-4">
                    <div class="flex items-center gap-2 text-sm">
                      <span class="size-2 rounded-full bg-amber-500"></span>
                      <span class="font-medium text-mono">{{
                        news ? form.status : 'Borrador'
                      }}</span>
                    </div>
                  </div>
                </dl>
              </aside>
            </div>
          </section>
        </main>
      </div>

      <footer
        class="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-background px-5 py-4 sm:px-7"
      >
        <span class="text-xs text-secondary-foreground"
          >Paso {{ activeStep + 1 }} de {{ steps.length }}</span
        >
        <div class="flex items-center gap-2">
          <button
            v-if="activeStep > 0"
            class="kt-btn kt-btn-light"
            type="button"
            :disabled="saving"
            @click="previousStep"
          >
            <i class="ki-filled ki-left"></i>Anterior
          </button>
          <button
            v-if="activeStep < steps.length - 1"
            class="kt-btn kt-btn-primary"
            type="button"
            :disabled="saving"
            @click="nextStep"
          >
            Continuar<i class="ki-filled ki-right"></i>
          </button>
          <button
            v-else
            class="kt-btn kt-btn-primary min-w-44 justify-center"
            type="button"
            :disabled="saving"
            @click="submit"
          >
            <span v-if="saving" class="kt-spinner kt-spinner-sm"></span>
            <i v-else class="ki-filled" :class="news ? 'ki-check' : 'ki-arrow-right'"></i>
            {{ saving ? 'Guardando...' : news ? 'Guardar cambios' : 'Crear y añadir medios' }}
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
