import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import DashboardView from '../views/DashboardView.vue'

import PublicProfileDefaultView from '../modules/public-profile/PublicProfileDefaultView.vue'
import IntegrationsView from '../modules/account/IntegrationsView.vue'

import { reinitializeMetronic } from '../utils/metronic'

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
          component: DashboardView,
          meta: { title: 'Dashboard' },
        },
        {
          path: 'public-profile/profiles/default',
          name: 'public-profile-default',
          component: PublicProfileDefaultView,
          meta: {
            title: 'Default',
          },
        },
        {
          path: 'account/integrations',
          name: 'account-integrations',
          component: IntegrationsView,
          meta: {
            title: 'Integrations',
          },
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
//
