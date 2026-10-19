<script setup lang="ts">
import CatalogQuickCreateModal from '@/modules/access/components/CatalogQuickCreateModal.vue'
import { useAuthStore } from '@/stores/auth'

import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'

import type {
  OrganizationalUnit,
  Position,
  Profession,
  Role,
} from '@/modules/access/types/access.types'
import type {
  CreateUserPayload,
  StaffMemberPayload,
  UpdateUserPayload,
  User,
} from '@/modules/users/types/user.types'

interface UserFormSubmission {
  payload: CreateUserPayload | UpdateUserPayload
  role: string
}

const props = defineProps<{
  open: boolean
  user: User | null
  roles: Role[]
  organizationalUnits: OrganizationalUnit[]
  positions: Position[]
  professions: Profession[]
  catalogsLoading?: boolean
  catalogsError?: string
  canAssignRole: boolean
  saving: boolean
  error: string
  fieldErrors: Record<string, string[]>
}>()

const emit = defineEmits<{
  retryCatalogs: []
  close: []
  submit: [submission: UserFormSubmission]
}>()

const authStore = useAuthStore()
const activeCatalog = ref<'unit' | 'profession' | null>(null)
const catalogSuccess = ref('')

function selectCreatedCatalog(id: number, name: string): void {
  if (activeCatalog.value === 'unit') form.organizationalUnitId = id
  else form.professionId = id
  activeCatalog.value = null
  catalogSuccess.value = `«${name}» se creó y quedó seleccionado.`
}

const roleLabels: Record<string, string> = {
  super_admin: 'Superadministrador',
  director: 'Director',
  responsable: 'Responsable',
  tecnico: 'Técnico',
  comunicador: 'Comunicador',
}

const form = reactive({
  email: '',
  password: '',
  passwordConfirmation: '',
  role: '',
  firstNames: '',
  paternalSurname: '',
  maternalSurname: '',
  birthDate: '',
  ci: '',
  ciComplement: '',
  phone: '',
  staffEmail: '',
  organizationalUnitId: '' as number | '',
  positionId: '' as number | '',
  professionId: '' as number | '',
})

function resetForm(): void {
  activeCatalog.value = null
  catalogSuccess.value = ''
  const staff = props.user?.staff_member

  form.email = props.user?.email ?? ''
  form.password = ''
  form.passwordConfirmation = ''
  form.role = props.user?.roles[0] ?? ''
  form.firstNames = staff?.first_names ?? ''
  form.paternalSurname = staff?.paternal_surname ?? ''
  form.maternalSurname = staff?.maternal_surname ?? ''
  form.birthDate = staff?.birth_date ?? ''
  form.ci = staff?.ci ?? ''
  form.ciComplement = staff?.ci_complement ?? ''
  form.phone = staff?.phone ?? ''
  form.staffEmail = staff?.email ?? ''
  form.organizationalUnitId = staff?.organizational_unit?.id ?? ''
  form.positionId = staff?.position?.id ?? ''
  form.professionId = staff?.profession?.id ?? ''
}

watch(
  () => [props.open, props.user] as const,
  ([open]) => {
    if (open) resetForm()
  },
  { immediate: true },
)

function submit(): void {
  if (props.saving || props.catalogsLoading || props.catalogsError || !props.positions.length)
    return
  if (form.password !== form.passwordConfirmation) {
    document.getElementById('user_password_confirmation')?.focus()
    return
  }
  if (props.user) {
    const staffMember: Partial<StaffMemberPayload> = {
      first_names: form.firstNames.trim(),
      paternal_surname: form.paternalSurname.trim() || null,
      maternal_surname: form.maternalSurname.trim() || null,
      organizational_unit_id:
        form.organizationalUnitId === '' ? null : Number(form.organizationalUnitId),
      position_id: Number(form.positionId),
      profession_id: form.professionId === '' ? null : Number(form.professionId),
    }

    {
      staffMember.birth_date = form.birthDate || null
      staffMember.ci = form.ci.trim()
      staffMember.ci_complement = form.ciComplement.trim().toUpperCase() || null
      staffMember.phone = form.phone.trim() || null
      staffMember.email = form.staffEmail.trim() || null
    }

    const payload: UpdateUserPayload = {
      email: form.email.trim(),
      staff_member: staffMember,
    }

    if (form.password) {
      payload.password = form.password
      payload.password_confirmation = form.passwordConfirmation
    }

    emit('submit', { payload, role: form.role })
    return
  }

  emit('submit', {
    role: form.role,
    payload: {
      email: form.email.trim(),
      password: form.password,
      password_confirmation: form.passwordConfirmation,
      role: form.role,
      staff_member: {
        first_names: form.firstNames.trim(),
        paternal_surname: form.paternalSurname.trim() || null,
        maternal_surname: form.maternalSurname.trim() || null,
        birth_date: form.birthDate || null,
        ci: form.ci.trim(),
        ci_complement: form.ciComplement.trim().toUpperCase() || null,
        phone: form.phone.trim() || null,
        email: form.staffEmail.trim() || null,
        organizational_unit_id:
          form.organizationalUnitId === '' ? null : Number(form.organizationalUnitId),
        position_id: Number(form.positionId),
        profession_id: form.professionId === '' ? null : Number(form.professionId),
      },
    },
  })
}

function fieldError(...fields: string[]): string {
  for (const field of fields) {
    const message = props.fieldErrors[field]?.[0]
    if (message) return message
  }
  return ''
}

const dialog = ref<HTMLDialogElement>()
let opener: HTMLElement | null = null
let previousOverflow = ''
function close(): void {
  if (!props.saving && !activeCatalog.value) emit('close')
}
function restoreFocus(): void {
  document.documentElement.style.overflow = previousOverflow
  if (opener?.isConnected) opener.focus({ preventScroll: true })
}
watch(
  () => props.open,
  async (open) => {
    await nextTick()
    if (open) {
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
      previousOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      dialog.value?.showModal()
      dialog.value?.querySelector<HTMLInputElement>('#user_first_names')?.focus()
    } else if (dialog.value?.open) {
      dialog.value.close()
      restoreFocus()
    }
  },
  { immediate: true },
)
onBeforeUnmount(() => {
  if (dialog.value?.open) {
    dialog.value.close()
    restoreFocus()
  }
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      aria-labelledby="user-form-title"
      aria-describedby="user-form-description"
      class="user-form-dialog m-auto w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl"
      @cancel.prevent="close"
    >
      <form class="flex h-[90dvh] min-h-0 flex-col" :aria-busy="saving" @submit.prevent="submit">
        <div
          class="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-muted/30 px-6 py-5"
        >
          <div>
            <h3 id="user-form-title" class="text-lg font-semibold tracking-tight">
              {{ user ? 'Editar usuario' : 'Nuevo usuario' }}
            </h3>
            <p id="user-form-description" class="mt-1 text-sm text-muted-foreground">
              Registra los datos de la persona y configura su acceso. Los campos con * son
              obligatorios.
            </p>
          </div>
          <button
            class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
            aria-label="Cerrar formulario"
            :disabled="saving"
            type="button"
            @click="close"
          >
            <i class="ki-filled ki-cross"></i>
          </button>
        </div>

        <div data-user-form-scroll class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <fieldset :disabled="saving" class="grid min-w-0 gap-5 p-6 md:grid-cols-2">
            <div
              v-if="error || Object.keys(fieldErrors).length"
              role="alert"
              class="md:col-span-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              {{ error }}
              <ul v-if="Object.keys(fieldErrors).length" class="mt-2 list-disc pl-5">
                <li v-for="(messages, key) in fieldErrors" :key="key">{{ messages[0] }}</li>
              </ul>
            </div>

            <div
              v-if="catalogsError"
              role="alert"
              class="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm md:col-span-2"
            >
              <p>{{ catalogsError }}</p>
              <button
                type="button"
                class="kt-btn kt-btn-sm kt-btn-outline mt-3"
                :disabled="catalogsLoading"
                @click="emit('retryCatalogs')"
              >
                Reintentar carga
              </button>
            </div>
            <p
              v-if="catalogsLoading"
              role="status"
              class="text-sm text-muted-foreground md:col-span-2"
            >
              Cargando opciones del formulario…
            </p>
            <div class="md:col-span-2">
              <h4 class="text-sm font-semibold">01 · Datos personales</h4>
              <p class="mt-1 text-xs text-muted-foreground">
                Identificación y datos de contacto del personal.
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_first_names">Nombres *</label>
              <input id="user_first_names" v-model="form.firstNames" class="kt-input" required />
              <span
                v-if="fieldError('staff_member.first_names')"
                class="text-xs text-destructive"
                >{{ fieldError('staff_member.first_names') }}</span
              >
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_paternal_surname"
                >Apellido paterno</label
              >
              <input id="user_paternal_surname" v-model="form.paternalSurname" class="kt-input" />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_maternal_surname"
                >Apellido materno</label
              >
              <input id="user_maternal_surname" v-model="form.maternalSurname" class="kt-input" />
            </div>

            <template v-if="open">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium" for="user_ci">Cédula de identidad *</label>
                <input
                  id="user_ci"
                  v-model="form.ci"
                  class="kt-input"
                  inputmode="numeric"
                  maxlength="15"
                  required
                />
                <span v-if="fieldError('staff_member.ci')" class="text-xs text-destructive">{{
                  fieldError('staff_member.ci')
                }}</span>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium" for="user_ci_complement">Complemento</label>
                <input
                  id="user_ci_complement"
                  v-model="form.ciComplement"
                  class="kt-input uppercase"
                  maxlength="2"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium" for="user_birth_date">Fecha de nacimiento</label>
                <input id="user_birth_date" v-model="form.birthDate" class="kt-input" type="date" />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium" for="user_phone">Teléfono</label>
                <input id="user_phone" v-model="form.phone" class="kt-input" type="tel" />
              </div>
              <div class="flex flex-col gap-2 md:col-span-2">
                <label class="text-sm font-medium" for="user_staff_email"
                  >Correo del funcionario (opcional)</label
                >
                <input
                  id="user_staff_email"
                  v-model="form.staffEmail"
                  class="kt-input"
                  type="email"
                />
              </div>
            </template>

            <div class="border-t border-border pt-5 md:col-span-2">
              <h4 class="text-sm font-semibold">02 · Información laboral</h4>
              <p class="mt-1 text-xs text-muted-foreground">
                El cargo describe su función. Unidad y profesión se pueden completar después.
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_unit"
                >Unidad organizacional
                <span class="font-normal text-muted-foreground">(opcional)</span></label
              >
              <select
                id="user_unit"
                v-model="form.organizationalUnitId"
                class="kt-select"
                :disabled="catalogsLoading"
              >
                <option value="">Sin unidad asignada</option>
                <option v-for="item in organizationalUnits" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <button
                v-if="authStore.hasPermission('organizational_units.create')"
                type="button"
                class="kt-btn kt-btn-sm kt-btn-ghost self-start text-primary"
                :disabled="catalogsLoading || Boolean(catalogsError)"
                @click="activeCatalog = 'unit'"
              >
                <i class="ki-filled ki-plus" aria-hidden="true"></i>Nueva unidad
              </button>
              <span
                v-if="fieldError('staff_member.organizational_unit_id')"
                class="text-xs text-destructive"
                >{{ fieldError('staff_member.organizational_unit_id') }}</span
              >
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_position">Cargo *</label>
              <select
                id="user_position"
                v-model="form.positionId"
                class="kt-select"
                :disabled="catalogsLoading"
                required
              >
                <option disabled value="">Seleccione un cargo</option>
                <option
                  v-if="
                    user?.staff_member?.position &&
                    !positions.some((p) => p.id === user?.staff_member?.position?.id)
                  "
                  :value="user.staff_member.position.id"
                >
                  {{ user.staff_member.position.name }} (no disponible)
                </option>
                <option v-for="item in positions" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_profession"
                >Profesión <span class="font-normal text-muted-foreground">(opcional)</span></label
              >
              <select
                id="user_profession"
                v-model="form.professionId"
                class="kt-select"
                :disabled="catalogsLoading"
              >
                <option value="">Sin especificar</option>
                <option v-for="item in professions" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <button
                v-if="authStore.hasPermission('professions.create')"
                type="button"
                class="kt-btn kt-btn-sm kt-btn-ghost self-start text-primary"
                :disabled="catalogsLoading || Boolean(catalogsError)"
                @click="activeCatalog = 'profession'"
              >
                <i class="ki-filled ki-plus" aria-hidden="true"></i>Nueva profesión
              </button>
            </div>

            <p
              v-if="catalogSuccess"
              role="status"
              class="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-primary md:col-span-2"
            >
              {{ catalogSuccess }}
            </p>
            <p
              v-if="!catalogsLoading && !catalogsError && !positions.length"
              role="status"
              class="text-sm text-destructive md:col-span-2"
            >
              No hay cargos disponibles. Un administrador debe cargar el catálogo antes de registrar
              personal.
            </p>
            <div class="border-t border-border pt-5 md:col-span-2">
              <h4 class="text-sm font-semibold">03 · Acceso al sistema</h4>
              <p class="mt-1 text-xs text-muted-foreground">
                El perfil de acceso determina los permisos y es independiente del cargo laboral.
              </p>
            </div>
            <div class="flex flex-col gap-2 md:col-span-2">
              <label class="text-sm font-medium" for="user_email">Correo de acceso *</label>
              <input
                id="user_email"
                v-model="form.email"
                class="kt-input"
                type="email"
                autocomplete="off"
                required
              />
              <span v-if="fieldError('email')" class="text-xs text-destructive">{{
                fieldError('email')
              }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_role">Perfil de acceso *</label>
              <select
                id="user_role"
                v-model="form.role"
                class="kt-select"
                :disabled="Boolean(user) && !canAssignRole"
                required
              >
                <option disabled value="">Seleccione un perfil</option>
                <option v-if="user && !roles.some((r) => r.name === form.role)" :value="form.role">
                  {{ form.role }}
                </option>
                <option v-for="item in roles" :key="item.id" :value="item.name">
                  {{ roleLabels[item.name] ?? item.name }}
                </option>
              </select>
              <span v-if="fieldError('role')" class="text-xs text-destructive">{{
                fieldError('role')
              }}</span>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_password">{{
                user ? 'Nueva contraseña (opcional)' : 'Contraseña'
              }}</label>
              <input
                id="user_password"
                v-model="form.password"
                class="kt-input"
                type="password"
                autocomplete="new-password"
                :required="!user"
                minlength="12"
              />
              <span v-if="fieldError('password')" class="text-xs text-destructive">{{
                fieldError('password')
              }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="user_password_confirmation"
                >Confirmar contraseña</label
              >
              <input
                id="user_password_confirmation"
                v-model="form.passwordConfirmation"
                class="kt-input"
                type="password"
                autocomplete="new-password"
                :required="!user || Boolean(form.password)"
                minlength="12"
              />
            </div>
            <p class="self-end text-xs leading-5 text-secondary-foreground">
              <span
                v-if="form.passwordConfirmation && form.password !== form.passwordConfirmation"
                class="mb-2 block text-destructive"
                >Las contraseñas no coinciden.</span
              >
              Mínimo 12 caracteres, con mayúsculas, minúsculas, números y símbolos.
            </p>
          </fieldset>
        </div>

        <div class="flex shrink-0 justify-end gap-3 border-t border-border bg-muted/20 px-6 py-4">
          <button class="kt-btn kt-btn-light" type="button" :disabled="saving" @click="close">
            Cancelar
          </button>
          <button
            class="kt-btn kt-btn-primary"
            type="submit"
            :disabled="
              saving ||
              catalogsLoading ||
              Boolean(catalogsError) ||
              !positions.length ||
              Boolean(form.password && form.password !== form.passwordConfirmation)
            "
          >
            <span v-if="saving" class="kt-spinner kt-spinner-sm"></span>
            {{ saving ? 'Guardando...' : 'Guardar usuario' }}
          </button>
        </div>
      </form>
    </dialog>
  </Teleport>
  <CatalogQuickCreateModal
    v-if="open && activeCatalog"
    :kind="activeCatalog"
    @close="activeCatalog = null"
    @created="selectCreatedCatalog"
  />
</template>
<style scoped>
.user-form-dialog::backdrop {
  background: rgb(15 23 42 / 55%);
  backdrop-filter: blur(3px);
}
</style>
