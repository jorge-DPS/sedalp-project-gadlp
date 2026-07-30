import { nextTick } from 'vue'

const METRONIC_SCRIPTS = [
  '/js/core.bundle.js',
  '/vendors/ktui/ktui.min.js',
  '/vendors/apexcharts/apexcharts.min.js',
  '/js/widgets/general.js',
]

let scriptsPromise = null

export function initializeTheme() {
  const defaultThemeMode = 'light'

  const configuredMode =
    localStorage.getItem('kt-theme') ||
    document.documentElement.getAttribute('data-kt-theme-mode') ||
    defaultThemeMode

  const themeMode =
    configuredMode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : configuredMode

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(themeMode)
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-metronic-src="${src}"]`)

    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve()
        return
      }

      existing.addEventListener('load', resolve, { once: true })

      existing.addEventListener('error', () => reject(new Error(`No se pudo cargar ${src}`)), {
        once: true,
      })

      return
    }

    const script = document.createElement('script')

    script.src = src
    script.dataset.metronicSrc = src

    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }

    script.onerror = () => {
      reject(new Error(`No se pudo cargar ${src}`))
    }

    document.body.appendChild(script)
  })
}

export function loadMetronicScripts() {
  if (scriptsPromise) {
    return scriptsPromise
  }

  scriptsPromise = (async () => {
    for (const src of METRONIC_SCRIPTS) {
      await loadScript(src)
    }

    /*
     * No ejecutar KTMenu.init().
     * core.bundle.js ya inicializa automáticamente el menú.
     */
  })()

  return scriptsPromise
}

export async function reinitializeMetronic() {
  await nextTick()

  /*
   * Solo crear instancias nuevas.
   * No volver a registrar eventos globales.
   */
  const components = [
    window.KTMenu,
    window.KTDropdown,
    window.KTDrawer,
    window.KTModal,
    window.KTTabs,
    window.KTScrollable,
  ]

  components.forEach((component) => {
    if (component && typeof component.createInstances === 'function') {
      component.createInstances()
    }
  })
}
