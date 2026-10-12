import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import pinia from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { reinitializeMetronic } from '@/utils/metronic'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // Rutas públicas
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        title: 'Iniciar sesión',
        guestOnly: true,
      },
    },
    // Rutas protegidas
    {
      path: '/',
      component: DefaultLayout,

      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: 'mapas',
          name: 'maps.index',
          component: () => import('@/modules/maps/views/MapManagementView.vue'),
          meta: {
            title: 'Mapas',
            breadcrumbs: ['Cartografía', 'Mapas'],
            permission: 'regions.view',
          },
        },
        // Página inicial después del login
        {
          path: '',
          redirect: {
            name: 'dashboard',
          },
        },

        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue'),
          meta: { title: 'Dashboard' },
        },
        {
          path: 'usuarios',
          name: 'users.index',
          component: () => import('@/modules/users/views/UserManagementView.vue'),
          meta: {
            title: 'Administrar usuarios',
            breadcrumbs: ['Administración', 'Usuarios'],
            permission: 'users.view',
          },
        },
        {
          path: 'roles',
          name: 'roles.index',
          component: () => import('@/modules/access/views/RoleManagementView.vue'),
          meta: {
            title: 'Roles y permisos',
            breadcrumbs: ['Administración', 'Roles'],
            permission: 'roles.view',
          },
        },
        {
          path: 'news',
          name: 'news.index',
          component: () => import('@/modules/news/views/NewsView.vue'),
          meta: {
            title: 'Noticias',
            breadcrumbs: ['Comunicación', 'Noticias'],
            permission: 'news.view',
          },
        },
        {
          path: 'account/integrations',
          name: 'account-integrations',
          component: () => import('@/views/account/IntegrationsView.vue'),
          meta: { title: 'Integraciones' },
        },
        {
          path: 'public-profile/profiles/default',
          name: 'public-profile-default',
          component: () => import('@/views/public-profile/PublicProfileDefaultView.vue'),
          meta: { title: 'Perfil público' },
        },
      ],
    },

    // Ruta inexistente
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],

  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore(pinia)

  if (!authStore.sessionInitialized) {
    await authStore.initializeSession()
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  const guestOnly = to.matched.some((record) => record.meta.guestOnly)

  // No autenticado -> login
  if (requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
    }
  }

  // Ya autenticado -> no permitir volver al login
  if (guestOnly && authStore.isAuthenticated) {
    return {
      name: 'dashboard',
    }
  }

  const requiredPermission = to.meta.permission

  if (requiresAuth && requiredPermission && !authStore.hasPermission(requiredPermission)) {
    return {
      name: 'dashboard',
      query: {
        forbidden: '1',
      },
    }
  }

  return true
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Inicio'} | SEDALP`

  reinitializeMetronic()
})

export default router
