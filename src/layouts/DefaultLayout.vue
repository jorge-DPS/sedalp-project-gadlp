<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppMain from '@/components/layout/AppMain.vue'
import AppModals from '@/components/layout/AppModals.vue'
</script>

<template>
  <!-- Base general que se reutiliza en todos los módulos internos -->
  <div class="flex min-h-screen grow">
    <AppHeader />

    <div class="flex flex-col lg:flex-row grow pt-(--header-height) lg:pt-0">
      <AppSidebar />
      <AppMain />
    </div>
  </div>

  <!-- Los modales pertenecen al layout y están disponibles en todos los módulos -->
  <AppModals />
</template>
