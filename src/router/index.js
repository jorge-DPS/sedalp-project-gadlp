import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { reinitializeMetronic } from '@/utils/metronic'
import { tokenService } from '@/services/tokenService'

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
          component: () => import('@/views/access-control/UserManagementView.vue'),
          meta: {
            title: 'Administrar usuarios',
            breadcrumbs: ['Administración', 'Usuarios'],
            permission: 'usuarios.ver',
          },
        },
        {
          path: 'roles',
          name: 'roles.index',
          component: () => import('@/views/access-control/RoleManagementView.vue'),
          meta: {
            title: 'Roles y permisos',
            breadcrumbs: ['Administración', 'Roles'],
            permission: 'roles.ver',
          },
        },
        {
          path: 'news',
          name: 'news.index',
          component: () => import('@/views/communication/NewsView.vue'),
          meta: {
            title: 'Noticias',
            breadcrumbs: ['Comunicación', 'Noticias'],
          }
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

router.beforeEach((to) => {
  const loggedIn = tokenService.isAuthenticated()

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  const guestOnly = to.matched.some((record) => record.meta.guestOnly)

  // No autenticado -> login
  if (requiresAuth && !loggedIn) {
    return {
      name: 'login',
    }
  }

  // Ya autenticado -> no permitir volver al login
  if (guestOnly && loggedIn) {
    return {
      name: 'dashboard',
    }
  }

  return true
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Inicio'} | SEDALP`

  reinitializeMetronic()
})

export default router
