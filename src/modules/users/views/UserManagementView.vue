<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'

import AccessPageHeader from '@/components/ui/AccessPageHeader.vue'
import UserFormModal from '@/modules/users/components/UserFormModal.vue'
import UserReasonModal from '@/modules/users/components/UserReasonModal.vue'
import { useAccessStore } from '@/modules/access/stores/access.store'
import { useUsersStore } from '@/modules/users/stores/users.store'
import type { CreateUserPayload, UpdateUserPayload, User } from '@/modules/users/types/user.types'
import { getApiError } from '@/shared/api/errors'
import { useAuthStore } from '@/stores/auth'

type UserAction = 'activate' | 'suspend' | 'delete' | 'restore'

const authStore = useAuthStore()
const accessStore = useAccessStore()
const usersStore = useUsersStore()
const { roles, organizationalUnits, positions, professions } = storeToRefs(accessStore)
const { users, meta, loading, saving } = storeToRefs(usersStore)

const filters = reactive({
  search: '',
  role: '',
  account_status: '' as '' | 'active' | 'suspended',
  organizational_unit_id: '' as number | '',
  per_page: 15,
  page: 1,
})
const showingTrash = ref(false)
const formOpen = ref(false)
const editingUser = ref<User | null>(null)
const actionUser = ref<User | null>(null)
const action = ref<UserAction | null>(null)
const pageError = ref('')
const formError = ref('')
const formFieldErrors = ref<Record<string, string[]>>({})
const actionError = ref('')

const canCreate = computed(
  () => authStore.hasPermission('users.create') && authStore.hasPermission('roles.assign'),
)
const canUpdate = computed(() => authStore.hasPermission('users.update'))
const canAssignRole = computed(() => authStore.hasPermission('roles.assign'))
const canUpdateStatus = computed(() => authStore.hasPermission('users.status.update'))
const canDelete = computed(() => authStore.hasPermission('users.delete'))
const canViewTrash = computed(() => authStore.hasPermission('users.trash.view'))
const canRestore = computed(() => authStore.hasPermission('users.restore'))

const reasonTitle = computed(() => {
  const labels: Record<UserAction, string> = {
    activate: 'Activar usuario',
    suspend: 'Suspender usuario',
    delete: 'Eliminar usuario',
    restore: 'Restaurar usuario',
  }
  return action.value ? labels[action.value] : ''
})
const reasonDescription = computed(() => {
  const name = actionUser.value ? userName(actionUser.value) : 'este usuario'
  const descriptions: Record<UserAction, string> = {
    activate: `Se habilitará nuevamente el acceso de ${name}. Laravel invalidará las sesiones anteriores según su política de tokens.`,
    suspend: `Se impedirá el acceso de ${name} sin eliminar sus datos relacionados.`,
    delete: `Se realizará una eliminación lógica de ${name}. Sus datos permanecerán disponibles para auditoría y restauración.`,
    restore: `Se restaurará la cuenta eliminada de ${name}. Después podrás revisar y activar su estado si corresponde.`,
  }
  return action.value ? descriptions[action.value] : ''
})

function userName(user: User): string {
  const staff = user.staff_member
  if (!staff) return user.email
  return [staff.first_names, staff.paternal_surname, staff.maternal_surname]
    .filter(Boolean)
    .join(' ')
}

function initials(user: User): string {
  return userName(user)
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function statusLabel(user: User): string {
  return {
    active: 'Activo',
    suspended: 'Suspendido',
    disabled_by_staff: 'Funcionario inactivo',
    deleted: 'Eliminado',
  }[user.effective_status]
}

function statusClass(user: User): string {
  return {
    active: 'kt-badge-success',
    suspended: 'kt-badge-warning',
    disabled_by_staff: 'kt-badge-warning',
    deleted: 'kt-badge-destructive',
  }[user.effective_status]
}

async function loadUsers(): Promise<void> {
  pageError.value = ''
  try {
    await usersStore.fetchUsers(filters, showingTrash.value)
  } catch (error) {
    pageError.value = getApiError(error).message
  }
}

async function applyFilters(): Promise<void> {
  filters.page = 1
  await loadUsers()
}

async function changePage(page: number): Promise<void> {
  if (page < 1 || page > meta.value.last_page || page === meta.value.current_page) return
  filters.page = page
  await loadUsers()
}

async function changeSection(trash: boolean): Promise<void> {
  showingTrash.value = trash
  filters.page = 1
  await loadUsers()
}

function openCreate(): void {
  editingUser.value = null
  formError.value = ''
  formFieldErrors.value = {}
  formOpen.value = true
}

function openEdit(user: User): void {
  editingUser.value = user
  formError.value = ''
  formFieldErrors.value = {}
  formOpen.value = true
}

async function saveUser(submission: {
  payload: CreateUserPayload | UpdateUserPayload
  role: string
}): Promise<void> {
  formError.value = ''
  formFieldErrors.value = {}

  try {
    if (editingUser.value) {
      const userId = editingUser.value.id
      await usersStore.updateUser(userId, submission.payload as UpdateUserPayload)

      if (canAssignRole.value && submission.role !== editingUser.value.roles[0]) {
        await usersStore.updateRole(userId, submission.role)
      }
    } else {
      await usersStore.createUser(submission.payload as CreateUserPayload)
    }

    formOpen.value = false
    await loadUsers()
  } catch (error) {
    const apiError = getApiError(error)
    formError.value = apiError.message
    formFieldErrors.value = apiError.errors
  }
}

function openAction(user: User, nextAction: UserAction): void {
  actionUser.value = user
  action.value = nextAction
  actionError.value = ''
}

function closeAction(): void {
  actionUser.value = null
  action.value = null
  actionError.value = ''
}

async function confirmAction(reason: string): Promise<void> {
  if (!actionUser.value || !action.value) return

  actionError.value = ''
  try {
    if (action.value === 'activate') {
      await usersStore.updateStatus(actionUser.value.id, { status: 'active', reason })
    } else if (action.value === 'suspend') {
      await usersStore.updateStatus(actionUser.value.id, { status: 'suspended', reason })
    } else if (action.value === 'delete') {
      await usersStore.removeUser(actionUser.value.id, reason)
    } else {
      await usersStore.restoreUser(actionUser.value.id, reason)
    }

    closeAction()
    await loadUsers()
  } catch (error) {
    actionError.value = getApiError(error).message
  }
}

onMounted(async () => {
  pageError.value = ''
  try {
    await Promise.all([accessStore.loadUserCatalogs(), loadUsers()])
  } catch (error) {
    pageError.value = getApiError(error).message
  }
})
</script>

<template>
  <AccessPageHeader
    title="Administración de usuarios"
    description="Gestiona cuentas, datos del funcionario, roles, estado y eliminación lógica desde las API de Laravel."
    :action-label="canCreate && !showingTrash ? 'Nuevo usuario' : ''"
    @action="openCreate"
  />

  <div class="kt-container-fixed pb-10">
    <div
      v-if="pageError"
      class="mb-5 flex items-center justify-between gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive"
    >
      <span>{{ pageError }}</span>
      <button class="kt-btn kt-btn-sm kt-btn-light" type="button" @click="loadUsers">
        Reintentar
      </button>
    </div>

    <div class="mb-5 flex gap-1 border-b border-border">
      <button
        class="px-4 py-3 text-sm font-medium"
        :class="
          !showingTrash ? 'border-b-2 border-primary text-primary' : 'text-secondary-foreground'
        "
        type="button"
        @click="changeSection(false)"
      >
        Usuarios
      </button>
      <button
        v-if="canViewTrash"
        class="px-4 py-3 text-sm font-medium"
        :class="
          showingTrash ? 'border-b-2 border-primary text-primary' : 'text-secondary-foreground'
        "
        type="button"
        @click="changeSection(true)"
      >
        Papelera
      </button>
    </div>

    <div class="kt-card">
      <form class="kt-card-header flex-wrap gap-3 py-4" @submit.prevent="applyFilters">
        <div>
          <h3 class="kt-card-title">
            {{ showingTrash ? 'Usuarios eliminados' : 'Usuarios registrados' }}
          </h3>
          <p class="mt-1 text-xs text-secondary-foreground">
            {{ meta.total }} {{ meta.total === 1 ? 'registro' : 'registros' }}
          </p>
        </div>
        <div class="flex grow flex-wrap justify-end gap-2">
          <label class="kt-input w-full sm:max-w-64">
            <i class="ki-filled ki-magnifier"></i>
            <input v-model="filters.search" placeholder="Nombre, correo..." />
          </label>
          <template v-if="!showingTrash">
            <select v-model="filters.role" class="kt-select w-full sm:w-44">
              <option value="">Todos los roles</option>
              <option v-for="role in roles" :key="role.id" :value="role.name">
                {{ role.name }}
              </option>
            </select>
            <select v-model="filters.account_status" class="kt-select w-full sm:w-40">
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="suspended">Suspendidos</option>
            </select>
            <select v-model="filters.organizational_unit_id" class="kt-select w-full sm:w-52">
              <option value="">Todas las unidades</option>
              <option v-for="unit in organizationalUnits" :key="unit.id" :value="unit.id">
                {{ unit.name }}
              </option>
            </select>
          </template>
          <button class="kt-btn kt-btn-primary" type="submit" :disabled="loading">Filtrar</button>
        </div>
      </form>

      <div class="kt-card-table scrollable-x-auto">
        <table class="kt-table align-middle">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Unidad / cargo</th>
              <th>Profesión</th>
              <th>Rol</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="py-12 text-center text-secondary-foreground">
                Cargando usuarios...
              </td>
            </tr>
            <tr v-for="user in users" v-else :key="user.id">
              <td>
                <div class="flex items-center gap-3">
                  <span
                    class="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                    >{{ initials(user) }}</span
                  >
                  <div>
                    <p class="font-medium text-mono">{{ userName(user) }}</p>
                    <p class="text-xs text-secondary-foreground">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p>{{ user.staff_member?.organizational_unit?.name ?? '—' }}</p>
                <p class="text-xs text-secondary-foreground">
                  {{ user.staff_member?.position?.name ?? 'Sin cargo' }}
                </p>
              </td>
              <td>{{ user.staff_member?.profession?.name ?? '—' }}</td>
              <td>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="role in user.roles"
                    :key="role"
                    class="kt-badge kt-badge-outline kt-badge-primary"
                    >{{ role }}</span
                  >
                  <span v-if="!user.roles.length">—</span>
                </div>
              </td>
              <td>
                <span class="kt-badge kt-badge-outline" :class="statusClass(user)">{{
                  statusLabel(user)
                }}</span>
              </td>
              <td>
                <div class="flex justify-end gap-1">
                  <template v-if="!showingTrash">
                    <button
                      v-if="canUpdate"
                      class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                      type="button"
                      title="Editar"
                      @click="openEdit(user)"
                    >
                      <i class="ki-filled ki-pencil"></i>
                    </button>
                    <button
                      v-if="canUpdateStatus && user.account_status === 'active'"
                      class="kt-btn kt-btn-sm kt-btn-light"
                      type="button"
                      @click="openAction(user, 'suspend')"
                    >
                      Suspender
                    </button>
                    <button
                      v-if="canUpdateStatus && user.account_status === 'suspended'"
                      class="kt-btn kt-btn-sm kt-btn-light"
                      type="button"
                      @click="openAction(user, 'activate')"
                    >
                      Activar
                    </button>
                    <button
                      v-if="canDelete"
                      class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost text-destructive"
                      type="button"
                      title="Eliminar"
                      @click="openAction(user, 'delete')"
                    >
                      <i class="ki-filled ki-trash"></i>
                    </button>
                  </template>
                  <button
                    v-else-if="canRestore"
                    class="kt-btn kt-btn-sm kt-btn-primary"
                    type="button"
                    @click="openAction(user, 'restore')"
                  >
                    Restaurar
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && !users.length">
              <td colspan="6" class="py-12 text-center text-secondary-foreground">
                No se encontraron usuarios.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="kt-card-footer flex-wrap justify-between gap-3 text-sm text-secondary-foreground">
        <span>Mostrando {{ meta.from ?? 0 }}–{{ meta.to ?? 0 }} de {{ meta.total }}</span>
        <div class="flex gap-2">
          <button
            class="kt-btn kt-btn-sm kt-btn-light"
            type="button"
            :disabled="loading || meta.current_page <= 1"
            @click="changePage(meta.current_page - 1)"
          >
            Anterior
          </button>
          <span class="flex items-center px-2"
            >Página {{ meta.current_page }} de {{ meta.last_page }}</span
          >
          <button
            class="kt-btn kt-btn-sm kt-btn-light"
            type="button"
            :disabled="loading || meta.current_page >= meta.last_page"
            @click="changePage(meta.current_page + 1)"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>

  <UserFormModal
    :open="formOpen"
    :user="editingUser"
    :roles="roles"
    :organizational-units="organizationalUnits"
    :positions="positions"
    :professions="professions"
    :can-assign-role="canAssignRole"
    :saving="saving"
    :error="formError"
    :field-errors="formFieldErrors"
    @close="formOpen = false"
    @submit="saveUser"
  />

  <UserReasonModal
    :open="Boolean(actionUser && action)"
    :title="reasonTitle"
    :description="reasonDescription"
    :confirm-label="reasonTitle"
    :danger="action === 'delete'"
    :saving="saving"
    :error="actionError"
    @close="closeAction"
    @confirm="confirmAction"
  />
</template>
