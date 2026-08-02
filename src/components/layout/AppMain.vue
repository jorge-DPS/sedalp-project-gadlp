<script setup>
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
<!-- Main -->
<div class="flex flex-col grow lg:rounded-l-xl bg-background border border-input lg:ms-(--sidebar-width)">
     <div class="flex flex-col grow kt-scrollable-y-auto lg:[--kt-scrollbar-width:auto] pt-5" id="scrollable_content">
      <main class="grow" role="main">
        <RouterView />
      </main>

      <AppFooter />
    </div>
  </div>
</template>