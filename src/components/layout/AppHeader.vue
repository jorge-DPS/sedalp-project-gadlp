<template>
   <header class="flex lg:hidden items-center fixed z-10 top-0 inset-s-0 inset-e-0 shrink-0 bg-mono dark:bg-background h-(--header-height)" id="header">
    <!-- Container -->
    <div class="kt-container-fixed flex items-center justify-between flex-wrap gap-3">
     <RouterLink to="/">
      <img class="size-[34px]" src="/media/app/mini-logo-circle-success.svg"/>
     </RouterLink>
     <button class="kt-btn kt-btn-icon kt-btn-dim hover:text-white -me-2" data-kt-drawer-toggle="#sidebar">
      <i class="ki-filled ki-menu">
      </i>
     </button>
    </div>
    <!-- End of Container -->
   </header>
</template>
