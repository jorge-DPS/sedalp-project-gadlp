import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initializeTheme, loadMetronicScripts } from './utils/metronic.js'

initializeTheme()

const app = createApp(App)
app.use(router)

router.isReady().then(async () => {
  app.mount('#app')

  try {
    await loadMetronicScripts()
  } catch (error) {
    console.error('No se pudieron inicializar completamente los scripts de Metronic:', error)
  }
})
//
