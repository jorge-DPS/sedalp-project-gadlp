<script setup>
import { computed, ref } from 'vue'
import AccessPageHeader from '@/components/access-control/AccessPageHeader.vue'
import { initialUsers, professions, regions, staffRoles } from '@/modules/access-control/mock-data'

const users = ref(initialUsers.map((user) => ({ ...user, regions: [...user.regions] })))
const search = ref('')
const roleFilter = ref('Todos')
const activeTab = ref('staff')
const showForm = ref(false)
const assignmentUser = ref(null)
const assignmentRegions = ref([])
const form = ref(emptyForm())

function emptyForm() {
  return { name: '', email: '', role: 'Técnico', profession: 'Licenciado/a', regions: [1] }
}

const filteredUsers = computed(() => {
  const term = search.value.trim().toLowerCase()
  return users.value.filter((user) => {
    const matchesTerm =
      !term ||
      `${user.name} ${user.email} ${user.role} ${user.profession}`.toLowerCase().includes(term)
    return matchesTerm && (roleFilter.value === 'Todos' || user.role === roleFilter.value)
  })
})

const technicians = computed(() => users.value.filter((user) => user.role === 'Técnico'))
const coveredRegionIds = computed(() => new Set(technicians.value.flatMap((user) => user.regions)))
const regionCoverage = computed(() =>
  regions.map((region) => ({
    ...region,
    technicians: technicians.value.filter((user) => user.regions.includes(region.id)),
  })),
)

function regionName(id) {
  return regions.find((region) => region.id === id)?.name ?? `Región ${id}`
}

function addUser() {
  if (!form.value.name.trim() || !form.value.email.trim()) return
  const isTechnician = form.value.role === 'Técnico'
  if (isTechnician && form.value.regions.length === 0) return
  users.value.unshift({
    id: Date.now(),
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    role: form.value.role,
    profession: isTechnician ? form.value.profession : '',
    status: 'Activo',
    regions: isTechnician ? form.value.regions.slice(0, 3) : [],
    initials: form.value.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  })
  form.value = emptyForm()
  showForm.value = false
}

function toggleFormRegion(id) {
  const selected = form.value.regions.includes(id)
  if (selected) form.value.regions = form.value.regions.filter((regionId) => regionId !== id)
  else if (form.value.regions.length < 3) form.value.regions.push(id)
}

function openAssignment(user) {
  assignmentUser.value = user
  assignmentRegions.value = [...user.regions]
}

function toggleAssignmentRegion(id) {
  const selected = assignmentRegions.value.includes(id)
  if (selected)
    assignmentRegions.value = assignmentRegions.value.filter((regionId) => regionId !== id)
  else if (assignmentRegions.value.length < 3) assignmentRegions.value.push(id)
}

function saveAssignment() {
  if (!assignmentUser.value || assignmentRegions.value.length === 0) return
  assignmentUser.value.regions = [...assignmentRegions.value]
  assignmentUser.value = null
}
</script>

<template>
  <AccessPageHeader
    title="Administración de funcionarios"
    description="Gestiona al Director, Responsable y técnicos del Servicio Departamental de Autonomías."
    action-label="Nuevo funcionario"
    @action="showForm = !showForm"
  />

  <div class="kt-container-fixed pb-10">
    <form v-if="showForm" class="kt-card mb-5" @submit.prevent="addUser">
      <div class="kt-card-header"><h3 class="kt-card-title">Registrar funcionario</h3></div>
      <div class="kt-card-content grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Nombre completo</label
          ><input v-model="form.name" class="kt-input" required />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Correo institucional</label
          ><input v-model="form.email" class="kt-input" type="email" required />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Cargo</label
          ><select v-model="form.role" class="kt-select">
            <option v-for="role in staffRoles" :key="role">{{ role }}</option>
          </select>
        </div>
        <div v-if="form.role === 'Técnico'" class="flex flex-col gap-2">
          <label class="text-sm font-medium">Profesión</label
          ><select v-model="form.profession" class="kt-select">
            <option v-for="profession in professions" :key="profession">{{ profession }}</option>
          </select>
        </div>
        <div v-if="form.role === 'Técnico'" class="md:col-span-2 lg:col-span-4">
          <div class="mb-3 flex items-center justify-between">
            <label class="text-sm font-medium">Regiones iniciales</label
            ><span class="text-xs text-secondary-foreground">Selecciona de 1 a 3 regiones</span>
          </div>
          <div class="grid gap-2 sm:grid-cols-4 lg:grid-cols-7">
            <button
              v-for="region in regions"
              :key="region.id"
              class="kt-btn kt-btn-sm justify-center"
              :class="form.regions.includes(region.id) ? 'kt-btn-primary' : 'kt-btn-outline'"
              type="button"
              :disabled="!form.regions.includes(region.id) && form.regions.length >= 3"
              @click="toggleFormRegion(region.id)"
            >
              {{ region.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="kt-card-footer justify-end gap-2">
        <button class="kt-btn kt-btn-light" type="button" @click="showForm = false">Cancelar</button
        ><button class="kt-btn kt-btn-primary" type="submit">Guardar funcionario</button>
      </div>
    </form>

    <div class="mb-5 grid gap-5 sm:grid-cols-3">
      <div class="kt-card">
        <div class="kt-card-content flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary-foreground">Funcionarios</p>
            <p class="text-2xl font-semibold text-mono">{{ users.length }}</p>
          </div>
          <i class="ki-filled ki-people text-3xl text-primary"></i>
        </div>
      </div>
      <div class="kt-card">
        <div class="kt-card-content flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary-foreground">Técnicos</p>
            <p class="text-2xl font-semibold text-mono">{{ technicians.length }}</p>
          </div>
          <i class="ki-filled ki-briefcase text-3xl text-violet-600"></i>
        </div>
      </div>
      <div class="kt-card">
        <div class="kt-card-content flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary-foreground">Regiones cubiertas</p>
            <p class="text-2xl font-semibold text-mono">
              {{ coveredRegionIds.size }}
              <span class="text-base font-normal text-secondary-foreground">/ 7</span>
            </p>
          </div>
          <i class="ki-filled ki-geolocation text-3xl text-green-600"></i>
        </div>
      </div>
    </div>

    <div class="mb-5 flex gap-1 border-b border-border">
      <button
        class="px-4 py-3 text-sm font-medium"
        :class="
          activeTab === 'staff'
            ? 'border-b-2 border-primary text-primary'
            : 'text-secondary-foreground'
        "
        @click="activeTab = 'staff'"
      >
        Funcionarios
      </button>
      <button
        class="px-4 py-3 text-sm font-medium"
        :class="
          activeTab === 'coverage'
            ? 'border-b-2 border-primary text-primary'
            : 'text-secondary-foreground'
        "
        @click="activeTab = 'coverage'"
      >
        Cobertura regional
      </button>
    </div>

    <div v-if="activeTab === 'staff'" class="kt-card">
      <div class="kt-card-header flex-wrap gap-3 py-4">
        <h3 class="kt-card-title">Personal del servicio</h3>
        <div class="flex flex-wrap gap-2">
          <label class="kt-input max-w-64"
            ><i class="ki-filled ki-magnifier"></i
            ><input v-model="search" placeholder="Buscar funcionario..." /></label
          ><select v-model="roleFilter" class="kt-select w-40">
            <option>Todos</option>
            <option v-for="role in staffRoles" :key="role">{{ role }}</option>
          </select>
        </div>
      </div>
      <div class="kt-card-table scrollable-x-auto">
        <table class="kt-table align-middle">
          <thead>
            <tr>
              <th>Funcionario</th>
              <th>Cargo</th>
              <th>Profesión</th>
              <th>Regiones asignadas</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>
                <div class="flex items-center gap-3">
                  <span
                    class="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                    >{{ user.initials }}</span
                  >
                  <div>
                    <p class="font-medium text-mono">{{ user.name }}</p>
                    <p class="text-xs text-secondary-foreground">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="kt-badge kt-badge-outline">{{ user.role }}</span>
              </td>
              <td>{{ user.profession || '—' }}</td>
              <td>
                <div v-if="user.role === 'Técnico'" class="flex min-w-48 flex-wrap gap-1">
                  <span
                    v-for="regionId in user.regions"
                    :key="regionId"
                    class="kt-badge kt-badge-primary kt-badge-outline"
                    >{{ regionName(regionId) }}</span
                  ><span v-if="!user.regions.length" class="text-sm text-destructive"
                    >Sin asignación</span
                  >
                </div>
                <span v-else class="text-sm text-secondary-foreground">Cobertura general</span>
              </td>
              <td>
                <span class="kt-badge kt-badge-success kt-badge-outline">{{ user.status }}</span>
              </td>
              <td>
                <div class="flex justify-end gap-1">
                  <button
                    v-if="user.role === 'Técnico'"
                    class="kt-btn kt-btn-sm kt-btn-light"
                    @click="openAssignment(user)"
                  >
                    <i class="ki-filled ki-geolocation"></i>Asignar</button
                  ><button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost" title="Editar">
                    <i class="ki-filled ki-pencil"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!filteredUsers.length">
              <td colspan="6" class="py-10 text-center text-secondary-foreground">
                No se encontraron funcionarios.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="kt-card-footer text-sm text-secondary-foreground">
        Mostrando {{ filteredUsers.length }} de {{ users.length }} funcionarios
      </div>
    </div>

    <div v-else class="kt-card">
      <div class="kt-card-header">
        <div>
          <h3 class="kt-card-title">Cobertura de las siete regiones</h3>
          <p class="mt-1 text-xs text-secondary-foreground">
            Distribución territorial actual de los técnicos
          </p>
        </div>
      </div>
      <div class="kt-card-table scrollable-x-auto">
        <table class="kt-table">
          <thead>
            <tr>
              <th>Región</th>
              <th>Técnico asignado</th>
              <th>Profesión</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="region in regionCoverage" :key="region.id">
              <td class="font-medium text-mono">{{ region.name }}</td>
              <td>
                <div v-if="region.technicians.length" class="flex flex-col gap-1">
                  <span v-for="technician in region.technicians" :key="technician.id">{{
                    technician.name
                  }}</span>
                </div>
                <span v-else class="text-secondary-foreground">Sin técnico asignado</span>
              </td>
              <td>
                <div v-if="region.technicians.length" class="flex flex-col gap-1">
                  <span v-for="technician in region.technicians" :key="technician.id">{{
                    technician.profession
                  }}</span>
                </div>
                <span v-else>—</span>
              </td>
              <td>
                <span
                  class="kt-badge kt-badge-outline"
                  :class="region.technicians.length ? 'kt-badge-success' : 'kt-badge-warning'"
                  >{{ region.technicians.length ? 'Cubierta' : 'Pendiente' }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div
    v-if="assignmentUser"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="assignmentUser = null"
  >
    <div class="kt-card w-full max-w-xl">
      <div class="kt-card-header">
        <div>
          <h3 class="kt-card-title">Asignar regiones</h3>
          <p class="mt-1 text-xs text-secondary-foreground">
            {{ assignmentUser.name }} · {{ assignmentUser.profession }}
          </p>
        </div>
        <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost" @click="assignmentUser = null">
          <i class="ki-filled ki-cross"></i>
        </button>
      </div>
      <div class="kt-card-content">
        <div class="mb-4 flex items-center justify-between text-sm">
          <span>Selecciona entre 1 y 3 regiones</span
          ><span class="font-medium text-primary"
            >{{ assignmentRegions.length }} seleccionadas</span
          >
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <button
            v-for="region in regions"
            :key="region.id"
            class="flex items-center justify-between rounded-lg border p-3 text-left text-sm"
            :class="
              assignmentRegions.includes(region.id)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border'
            "
            :disabled="!assignmentRegions.includes(region.id) && assignmentRegions.length >= 3"
            @click="toggleAssignmentRegion(region.id)"
          >
            <span>{{ region.name }}</span
            ><i v-if="assignmentRegions.includes(region.id)" class="ki-filled ki-check-circle"></i>
          </button>
        </div>
      </div>
      <div class="kt-card-footer justify-end gap-2">
        <button class="kt-btn kt-btn-light" @click="assignmentUser = null">Cancelar</button
        ><button
          class="kt-btn kt-btn-primary"
          :disabled="assignmentRegions.length === 0"
          @click="saveAssignment"
        >
          Guardar asignación
        </button>
      </div>
    </div>
  </div>
</template>
