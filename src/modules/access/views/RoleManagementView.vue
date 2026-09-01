<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

import AccessPageHeader from '@/components/ui/AccessPageHeader.vue'
import { useAccessStore } from '@/modules/access/stores/access.store'
import { getApiError } from '@/shared/api/errors'

const accessStore = useAccessStore()
const { roles, permissions, loading } = storeToRefs(accessStore)
const pageError = ref('')

const permissionsByModule = computed(() => {
  const groups = new Map<string, typeof permissions.value>()

  for (const permission of permissions.value) {
    const moduleName = permission.name.split('.')[0] ?? 'otros'
    const group = groups.get(moduleName) ?? []
    group.push(permission)
    groups.set(moduleName, group)
  }

  return [...groups.entries()].map(([name, items]) => ({ name, items }))
})

function readableName(value: string): string {
  return value
    .replaceAll('_', ' ')
    .replaceAll('.', ' · ')
    .replace(/^./, (letter) => letter.toUpperCase())
}

async function loadMatrix(): Promise<void> {
  pageError.value = ''
  try {
    await accessStore.loadAccessMatrix()
  } catch (error) {
    pageError.value = getApiError(error).message
  }
}

onMounted(loadMatrix)
</script>

<template>
  <AccessPageHeader
    title="Roles y permisos"
    description="Consulta el catálogo de acceso definido por Laravel. Esta pantalla no inventa operaciones de edición que el backend no expone."
    action-label="Actualizar matriz"
    action-icon="ki-arrows-circle"
    @action="loadMatrix"
  />

  <div class="kt-container-fixed pb-10">
    <div
      v-if="pageError"
      class="mb-5 flex items-center justify-between gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive"
    >
      <span>{{ pageError }}</span>
      <button class="kt-btn kt-btn-sm kt-btn-light" type="button" @click="loadMatrix">
        Reintentar
      </button>
    </div>

    <div class="mb-5 grid gap-5 sm:grid-cols-2">
      <div class="kt-card">
        <div class="kt-card-content flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary-foreground">Roles disponibles</p>
            <p class="text-2xl font-semibold text-mono">{{ roles.length }}</p>
          </div>
          <i class="ki-filled ki-security-user text-3xl text-primary"></i>
        </div>
      </div>
      <div class="kt-card">
        <div class="kt-card-content flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary-foreground">Permisos registrados</p>
            <p class="text-2xl font-semibold text-mono">{{ permissions.length }}</p>
          </div>
          <i class="ki-filled ki-key-square text-3xl text-green-600"></i>
        </div>
      </div>
    </div>

    <div v-if="loading" class="kt-card">
      <div class="kt-card-content py-14 text-center text-secondary-foreground">
        Cargando roles y permisos...
      </div>
    </div>

    <template v-else>
      <div class="mb-7 grid gap-5 lg:grid-cols-3">
        <article v-for="role in roles" :key="role.id" class="kt-card">
          <div class="kt-card-header">
            <div class="flex items-center gap-3">
              <span
                class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                ><i class="ki-filled ki-security-user text-xl"></i
              ></span>
              <div>
                <h3 class="kt-card-title">{{ readableName(role.name) }}</h3>
                <p class="text-xs text-secondary-foreground">
                  {{ role.permissions.length }} permisos
                </p>
              </div>
            </div>
          </div>
          <div class="kt-card-content flex flex-wrap content-start gap-2">
            <span
              v-for="permission in role.permissions"
              :key="permission"
              class="kt-badge kt-badge-outline kt-badge-primary"
              >{{ readableName(permission) }}</span
            >
            <span v-if="!role.permissions.length" class="text-sm text-secondary-foreground"
              >Sin permisos asignados</span
            >
          </div>
        </article>
      </div>

      <div id="permissions_matrix" class="kt-card">
        <div class="kt-card-header">
          <div>
            <h3 class="kt-card-title">Matriz efectiva de permisos</h3>
            <p class="mt-1 text-xs text-secondary-foreground">
              Los valores provienen de `/admin/access/roles` y `/admin/access/permissions`.
            </p>
          </div>
        </div>
        <div class="kt-card-table scrollable-x-auto">
          <table class="kt-table text-center">
            <thead>
              <tr>
                <th class="min-w-56 text-left">Permiso</th>
                <th v-for="role in roles" :key="role.id" class="min-w-36">
                  {{ readableName(role.name) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="group in permissionsByModule" :key="group.name">
                <tr class="bg-muted/40">
                  <td
                    :colspan="roles.length + 1"
                    class="text-left text-xs font-semibold uppercase text-secondary-foreground"
                  >
                    {{ readableName(group.name) }}
                  </td>
                </tr>
                <tr v-for="permission in group.items" :key="permission.id">
                  <td class="text-left font-medium text-mono">
                    {{ readableName(permission.name) }}
                  </td>
                  <td v-for="role in roles" :key="role.id">
                    <span
                      class="inline-flex size-7 items-center justify-center rounded-full"
                      :class="
                        role.permissions.includes(permission.name)
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-muted text-muted-foreground'
                      "
                    >
                      <i
                        class="ki-filled"
                        :class="
                          role.permissions.includes(permission.name) ? 'ki-check' : 'ki-minus'
                        "
                      ></i>
                    </span>
                  </td>
                </tr>
              </template>
              <tr v-if="!permissions.length">
                <td :colspan="roles.length + 1" class="py-12 text-center text-secondary-foreground">
                  No hay permisos disponibles.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
