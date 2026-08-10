export default [
  {
    path: 'usuarios',
    name: 'users.index',
    component: () => import('./pages/UserManagementView.vue'),
    meta: {
      title: 'Administrar usuarios',
      permission: 'usuarios.ver',
    },
  },

  {
    path: 'roles',
    name: 'roles.index',
    component: () => import('./pages/RoleManagementView.vue'),
    meta: {
      title: 'Roles y permisos',
      permission: 'roles.ver',
    },
  },
]