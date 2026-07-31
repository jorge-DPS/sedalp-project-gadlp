import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { reinitializeMetronic } from '@/utils/metronic'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: { title: 'Dashboard' },
        },
        {
          path: 'public-profile/profiles/default',
          name: 'public-profile-default',
          component: () => import('@/views/public-profile/PublicProfileDefaultView.vue'),
          meta: {
            title: 'Default',
          },
        },
        {
          path: 'account/integrations',
          name: 'account-integrations',
          component: () => import('@/views/account/IntegrationsView.vue'),
          meta: {
            title: 'Integrations',
          },
        },
        {
          path: 'access-control/users',
          name: 'user-management',
          component: () => import('@/views/access-control/UserManagementView.vue'),
          meta: { title: 'Administración de usuarios' },
        },
        {
          path: 'access-control/roles',
          name: 'role-management',
          component: () => import('@/views/access-control/RoleManagementView.vue'),
          meta: { title: 'Administración de roles' },
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Metronic'} | Vue 3`
  reinitializeMetronic()
})

export default router
