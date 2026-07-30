<script setup>
import AppFooter from '../../components/layout/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col grow lg:rounded-l-xl bg-background border border-input lg:ms-(--sidebar-width)">
    <div
      id="scrollable_content"
      class="flex flex-col grow kt-scrollable-y-auto lg:[--kt-scrollbar-width:auto] pt-5"
    >
      <main class="grow" role="content">
        <RouterView />
      </main>

      <AppFooter />
    </div>
  </div>
</template>
