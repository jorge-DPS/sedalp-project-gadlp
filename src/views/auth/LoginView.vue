<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticating: loading } = storeToRefs(authStore)

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const error = ref('')

const login = async () => {
  if (loading.value) return

  error.value = ''
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    // Después del login vamos al Dashboard
    await router.replace({
      name: 'dashboard',
    })
  } catch (err) {
    if (err.response?.status === 401) {
      error.value = 'Correo electrónico o contraseña incorrectos.'
      return
    }

    if (err.response?.status === 422) {
      error.value = 'Revise los datos ingresados.'
      return
    }

    if (err.code === 'ECONNABORTED') {
      error.value = 'El servidor tardó demasiado en responder.'
      return
    }

    if (err.code === 'ERR_NETWORK') {
      error.value = 'No se pudo conectar con el servidor.'
      return
    }

    error.value = 'Ocurrió un error al iniciar sesión.'
  }
}
</script>

<template>
  <div
    class="page-bg flex min-h-screen w-full items-center justify-center bg-center bg-no-repeat px-4"
  >
    <div class="kt-card w-full max-w-[370px]">
      <form class="kt-card-content flex flex-col gap-5 p-10" @submit.prevent="login">
        <!-- Encabezado -->
        <div class="mb-2.5 text-center">
          <h1 class="text-mono mb-2 text-xl font-semibold">Iniciar sesión</h1>

          <p class="text-secondary-foreground text-sm">Sistema de Información SEDALP</p>
        </div>

        <!-- Mensaje de error -->
        <div
          v-if="error"
          class="rounded-lg border border-danger/20 bg-danger/10 p-3 text-sm text-danger"
        >
          {{ error }}
        </div>

        <!-- Correo electrónico -->
        <div class="flex flex-col gap-1.5">
          <label for="email" class="kt-form-label text-mono font-normal">
            Correo electrónico
          </label>

          <input
            id="email"
            v-model.trim="email"
            class="kt-input"
            type="email"
            placeholder="correo@sedalp.gob.bo"
            autocomplete="email"
            :disabled="loading"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="flex flex-col gap-1.5">
          <label for="password" class="kt-form-label text-mono font-normal"> Contraseña </label>

          <div class="kt-input">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Ingrese su contraseña"
              autocomplete="current-password"
              :disabled="loading"
              required
            />

            <button
              class="kt-btn kt-btn-sm kt-btn-ghost kt-btn-icon -me-1.5 bg-transparent!"
              type="button"
              :disabled="loading"
              aria-label="Mostrar u ocultar contraseña"
              @click="showPassword = !showPassword"
            >
              <i
                :class="
                  showPassword
                    ? 'ki-filled ki-eye-slash text-muted-foreground'
                    : 'ki-filled ki-eye text-muted-foreground'
                "
              ></i>
            </button>
          </div>
        </div>

        <!-- Botón iniciar sesión -->
        <button
          class="kt-btn kt-btn-primary flex grow justify-center"
          type="submit"
          :disabled="loading"
        >
          <template v-if="loading">
            <span
              class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            ></span>

            Ingresando...
          </template>

          <template v-else> Iniciar sesión </template>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-bg {
  background-image: url('/media/images/2600x1200/bg-10.png');
}

:global(.dark) .page-bg {
  background-image: url('/media/images/2600x1200/bg-10-dark.png');
}
</style>
