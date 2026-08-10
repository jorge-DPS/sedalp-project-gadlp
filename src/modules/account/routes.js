export default [
  {
    path: 'account/integrations',
    name: 'account-integrations',
    component: () => import('./pages/IntegrationsView.vue'),
    meta: { title: 'Integraciones' },
  },
]
