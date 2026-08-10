export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/LoginView.vue'),
    meta: {
      title: 'Iniciar sesión',
      guestOnly: true,
    },
  },
]