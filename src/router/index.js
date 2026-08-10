import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { reinitializeMetronic } from '@/utils/metronic'
import { tokenService } from '@/modules/auth/services/tokenService'

import authRoutes from '@/modules/auth/routes'
import dashboardRoutes from '@/modules/dashboard/routes'
import accessControlRoutes from '@/modules/access-control/routes'
import accountRoutes from '@/modules/account/routes'
import publicProfileRoutes from '@/modules/public-profile/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // Rutas públicas
    ...authRoutes,

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
            name: 'users.index',
          },
        },

        ...dashboardRoutes,
        ...accessControlRoutes,
        ...accountRoutes,
        ...publicProfileRoutes,
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

  const requiresAuth = to.matched.some(
    (record) => record.meta.requiresAuth,
  )

  const guestOnly = to.matched.some(
    (record) => record.meta.guestOnly,
  )

  // No autenticado -> login
  if (requiresAuth && !loggedIn) {
    return {
      name: 'login',
    }
  }

  // Ya autenticado -> no permitir volver al login
  if (guestOnly && loggedIn) {
    return {
      name: 'users.index',
    }
  }

  return true
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Inicio'} | SEDALP`

  reinitializeMetronic()
})

export default router