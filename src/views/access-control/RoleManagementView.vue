<script setup>
import { computed, ref } from 'vue'
import AccessPageHeader from '@/components/access-control/AccessPageHeader.vue'
import { initialRoles, permissionCatalog } from '@/modules/access-control/mock-data'

const roles = ref(initialRoles.map((role) => ({ ...role, permissions: [...role.permissions] })))
const editingRole = ref(null)
const draftPermissions = ref([])
const assignedUsers = computed(() => roles.value.reduce((total, role) => total + role.users, 0))

function permissionLabel(key) {
  return permissionCatalog.find((permission) => permission.key === key)?.label ?? key
}

function openPermissionEditor(role) {
  editingRole.value = role
  draftPermissions.value = [...role.permissions]
}

function savePermissions() {
  editingRole.value.permissions = [...draftPermissions.value]
  editingRole.value = null
}

function scrollToMatrix() {
  document.getElementById('permissions_matrix')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <AccessPageHeader
    title="Administración de roles"
    description="Configura el acceso institucional del Director, Responsable y técnicos."
    action-label="Ver matriz de permisos"
    action-icon="ki-tablet-text-down"
    @action="scrollToMatrix"
  />
  <div class="kt-container-fixed pb-10">
    <div class="mb-5 grid gap-5 sm:grid-cols-2">
      <div class="kt-card">
        <div class="kt-card-content flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary-foreground">Roles institucionales</p>
            <p class="text-2xl font-semibold text-mono">{{ roles.length }}</p>
          </div>
          <i class="ki-filled ki-security-user text-3xl text-primary"></i>
        </div>
      </div>
      <div class="kt-card">
        <div class="kt-card-content flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary-foreground">Funcionarios asignados</p>
            <p class="text-2xl font-semibold text-mono">{{ assignedUsers }}</p>
          </div>
          <i class="ki-filled ki-people text-3xl text-green-600"></i>
        </div>
      </div>
    </div>

    <div class="mb-7 grid gap-5 lg:grid-cols-3">
      <article v-for="role in roles" :key="role.id" class="kt-card">
        <div class="kt-card-header">
          <div class="flex items-center gap-3">
            <span
              class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              ><i class="ki-filled text-xl" :class="role.icon"></i
            ></span>
            <div>
              <h3 class="kt-card-title">{{ role.name }}</h3>
              <p class="text-xs text-secondary-foreground">
                {{ role.users }} {{ role.users === 1 ? 'funcionario' : 'funcionarios' }}
              </p>
            </div>
          </div>
        </div>
        <div class="kt-card-content flex grow flex-col gap-4">
          <p class="text-sm leading-6 text-secondary-foreground">{{ role.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="permission in role.permissions.slice(0, 4)"
              :key="permission"
              class="kt-badge kt-badge-outline kt-badge-primary"
              >{{ permissionLabel(permission) }}</span
            ><span v-if="role.permissions.length > 4" class="kt-badge kt-badge-outline"
              >+{{ role.permissions.length - 4 }}</span
            >
          </div>
        </div>
        <div class="kt-card-footer">
          <button
            class="kt-btn kt-btn-sm kt-btn-light w-full justify-center"
            @click="openPermissionEditor(role)"
          >
            <i class="ki-filled ki-setting-2"></i>Editar permisos
          </button>
        </div>
      </article>
    </div>

    <div id="permissions_matrix" class="kt-card scroll-mt-5">
      <div class="kt-card-header">
        <div>
          <h3 class="kt-card-title">Matriz de permisos</h3>
          <p class="mt-1 text-xs text-secondary-foreground">
            Vista comparativa de los accesos definidos para cada cargo
          </p>
        </div>
      </div>
      <div class="kt-card-table scrollable-x-auto">
        <table class="kt-table text-center">
          <thead>
            <tr>
              <th class="text-left">Función</th>
              <th v-for="role in roles" :key="role.id">{{ role.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="permission in permissionCatalog" :key="permission.key">
              <td class="text-left font-medium text-mono">{{ permission.label }}</td>
              <td v-for="role in roles" :key="role.id">
                <span
                  class="inline-flex size-7 items-center justify-center rounded-full"
                  :class="
                    role.permissions.includes(permission.key)
                      ? 'bg-green-500/10 text-green-600'
                      : 'bg-muted text-muted-foreground'
                  "
                  ><i
                    class="ki-filled"
                    :class="role.permissions.includes(permission.key) ? 'ki-check' : 'ki-minus'"
                  ></i
                ></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div
    v-if="editingRole"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="editingRole = null"
  >
    <div class="kt-card w-full max-w-lg">
      <div class="kt-card-header">
        <div>
          <h3 class="kt-card-title">Permisos de {{ editingRole.name }}</h3>
          <p class="mt-1 text-xs text-secondary-foreground">Configuración visual de la maqueta</p>
        </div>
        <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost" @click="editingRole = null">
          <i class="ki-filled ki-cross"></i>
        </button>
      </div>
      <div class="kt-card-content grid gap-3 sm:grid-cols-2">
        <label
          v-for="permission in permissionCatalog"
          :key="permission.key"
          class="flex items-center gap-3 rounded-lg border border-border p-3 text-sm"
          ><input
            v-model="draftPermissions"
            class="kt-checkbox"
            type="checkbox"
            :value="permission.key"
          />{{ permission.label }}</label
        >
      </div>
      <div class="kt-card-footer justify-end gap-2">
        <button class="kt-btn kt-btn-light" @click="editingRole = null">Cancelar</button
        ><button class="kt-btn kt-btn-primary" @click="savePermissions">Guardar cambios</button>
      </div>
    </div>
  </div>
</template>
