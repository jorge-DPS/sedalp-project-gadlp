<script setup lang="ts">
import { reactive, watch } from 'vue'

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
  canAssignRole: boolean
  saving: boolean
  error: string
  fieldErrors: Record<string, string[]>
}>()

const emit = defineEmits<{
  close: []
  submit: [submission: UserFormSubmission]
}>()

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
  const staff = props.user?.staff_member

  form.email = props.user?.email ?? ''
  form.password = ''
  form.passwordConfirmation = ''
  form.role = props.user?.roles[0] ?? props.roles[0]?.name ?? ''
  form.firstNames = staff?.first_names ?? ''
  form.paternalSurname = staff?.paternal_surname ?? ''
  form.maternalSurname = staff?.maternal_surname ?? ''
  form.birthDate = ''
  form.ci = ''
  form.ciComplement = ''
  form.phone = ''
  form.staffEmail = ''
  form.organizationalUnitId = staff?.organizational_unit?.id ?? ''
  form.positionId = staff?.position?.id ?? ''
  form.professionId = staff?.profession?.id ?? ''
}

watch(
  () => [props.open, props.user, props.roles] as const,
  ([open]) => {
    if (open) resetForm()
  },
  { immediate: true },
)

function submit(): void {
  if (props.user) {
    const staffMember: Partial<StaffMemberPayload> = {
      first_names: form.firstNames.trim(),
      paternal_surname: form.paternalSurname.trim() || null,
      maternal_surname: form.maternalSurname.trim() || null,
      organizational_unit_id: Number(form.organizationalUnitId),
      position_id: Number(form.positionId),
      profession_id: Number(form.professionId),
    }

    if (!props.user.staff_member) {
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
        organizational_unit_id: Number(form.organizationalUnitId),
        position_id: Number(form.positionId),
        profession_id: Number(form.professionId),
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
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true"
    :aria-label="user ? 'Editar usuario' : 'Crear usuario'"
    @click.self="emit('close')"
  >
    <form class="kt-card max-h-[92vh] w-full max-w-4xl overflow-y-auto" @submit.prevent="submit">
      <div class="kt-card-header sticky top-0 z-10 bg-background">
        <div>
          <h3 class="kt-card-title">{{ user ? 'Editar usuario' : 'Nuevo usuario' }}</h3>
          <p class="mt-1 text-xs text-secondary-foreground">
            La cuenta y los datos del funcionario se guardan de forma coordinada en Laravel.
          </p>
        </div>
        <button
          class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
          type="button"
          @click="emit('close')"
        >
          <i class="ki-filled ki-cross"></i>
        </button>
      </div>

      <div class="kt-card-content grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-if="error"
          class="md:col-span-2 lg:col-span-3 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
        >
          {{ error }}
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="user_first_names">Nombres</label>
          <input id="user_first_names" v-model="form.firstNames" class="kt-input" required />
          <span v-if="fieldError('staff_member.first_names')" class="text-xs text-destructive">{{
            fieldError('staff_member.first_names')
          }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="user_paternal_surname">Apellido paterno</label>
          <input id="user_paternal_surname" v-model="form.paternalSurname" class="kt-input" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="user_maternal_surname">Apellido materno</label>
          <input id="user_maternal_surname" v-model="form.maternalSurname" class="kt-input" />
        </div>

        <template v-if="!user || !user.staff_member">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium" for="user_ci">Cédula de identidad</label>
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
            <input id="user_staff_email" v-model="form.staffEmail" class="kt-input" type="email" />
          </div>
        </template>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="user_unit">Unidad organizacional</label>
          <select id="user_unit" v-model="form.organizationalUnitId" class="kt-select" required>
            <option disabled value="">Seleccione una unidad</option>
            <option v-for="item in organizationalUnits" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <span
            v-if="fieldError('staff_member.organizational_unit_id')"
            class="text-xs text-destructive"
            >{{ fieldError('staff_member.organizational_unit_id') }}</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="user_position">Cargo</label>
          <select id="user_position" v-model="form.positionId" class="kt-select" required>
            <option disabled value="">Seleccione un cargo</option>
            <option v-for="item in positions" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="user_profession">Profesión</label>
          <select id="user_profession" v-model="form.professionId" class="kt-select" required>
            <option disabled value="">Seleccione una profesión</option>
            <option v-for="item in professions" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-2 md:col-span-2">
          <label class="text-sm font-medium" for="user_email">Correo de acceso</label>
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
          <label class="text-sm font-medium" for="user_role">Rol</label>
          <select
            id="user_role"
            v-model="form.role"
            class="kt-select"
            :disabled="Boolean(user) && !canAssignRole"
            required
          >
            <option disabled value="">Seleccione un rol</option>
            <option v-for="item in roles" :key="item.id" :value="item.name">{{ item.name }}</option>
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
          Mínimo 12 caracteres, con mayúsculas, minúsculas, números y símbolos.
        </p>
      </div>

      <div class="kt-card-footer sticky bottom-0 justify-end gap-2 bg-background">
        <button class="kt-btn kt-btn-light" type="button" :disabled="saving" @click="emit('close')">
          Cancelar
        </button>
        <button class="kt-btn kt-btn-primary" type="submit" :disabled="saving">
          <span v-if="saving" class="kt-spinner kt-spinner-sm"></span>
          {{ saving ? 'Guardando...' : 'Guardar usuario' }}
        </button>
      </div>
    </form>
  </div>
</template>
