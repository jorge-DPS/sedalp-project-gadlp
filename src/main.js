import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores'
import { useAuthStore } from '@/stores/auth'
import '@/assets/main.css'
import { configureUnauthorizedHandler } from '@/services/api'
import { initializeTheme, loadMetronicScripts } from '@/utils/metronic'

initializeTheme()

const app = createApp(App)
app.use(pinia)

const authStore = useAuthStore(pinia)

configureUnauthorizedHandler(() => {
  const shouldRedirect = authStore.sessionInitialized && authStore.isAuthenticated

  authStore.clearSession()

  if (shouldRedirect && router.currentRoute.value.name !== 'login') {
    void router.replace({ name: 'login' })
  }
})

app.use(router)

router.isReady().then(async () => {
  app.mount('#app')

  try {
    await loadMetronicScripts()
  } catch (error) {
    console.error('No se pudieron inicializar completamente los scripts de Metronic:', error)
  }
})
