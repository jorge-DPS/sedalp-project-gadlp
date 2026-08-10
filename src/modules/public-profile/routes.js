export default [
  {
    path: 'public-profile/profiles/default',
    name: 'public-profile-default',
    component: () => import('./pages/PublicProfileDefaultView.vue'),
    meta: { title: 'Perfil público' },
  },
]
