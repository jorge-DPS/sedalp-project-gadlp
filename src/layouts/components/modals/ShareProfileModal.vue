<template>
  <div class="kt-modal" data-kt-modal="true" id="share_profile_modal">
   <div class="kt-modal-content max-w-[500px] top-5 lg:top-[15%]">
    <div class="kt-modal-header">
     <h3 class="kt-modal-title">
      Share Profile
     </h3>
     <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0" data-kt-modal-dismiss="true">
      <i class="ki-filled ki-cross">
      </i>
     </button>
    </div>
    <div class="kt-modal-body grid gap-5 px-0 py-5">
     <div class="flex flex-col px-5 gap-2.5">
      <div class="flex flex-center gap-1">
       <label class="text-mono font-semibold text-sm">
        Share read-only link
       </label>
       <i class="ki-filled ki-information-2 text-muted-foreground text-sm">
       </i>
      </div>
      <label class="kt-input">
       <input type="text" value="https://metronic.com/profiles/x7g2vA3kZ5"/>
       <button class="kt-btn kt-btn-icon kt-btn-sm kt-btn-ghost -me-2">
        <i class="ki-filled ki-copy">
        </i>
       </button>
      </label>
     </div>
     <div class="border-b border-b-border">
     </div>
     <div class="flex flex-col px-5 gap-2.5">
      <div class="flex flex-center gap-1">
       <label class="text-mono font-semibold text-sm">
        Share via email
       </label>
       <i class="ki-filled ki-information-2 text-muted-foreground text-sm">
       </i>
      </div>
      <div class="flex flex-center gap-2.5">
       <label class="kt-input">
        <input type="text" value="miles.turner@gmail.com"/>
       </label>
       <button class="kt-btn kt-btn-primary">
        Share
       </button>
      </div>
     </div>
     <div class="kt-scrollable-y-auto max-h-[300px]">
      <div class="flex flex-col px-5 gap-3">
       <div class="flex items-center flex-wrap gap-2">
        <div class="flex items-center grow gap-2.5">
         <img alt="" class="rounded-full size-9 shrink-0" src="/media/avatars/300-3.png"/>
         <div class="flex flex-col">
          <a class="text-sm font-semibold text-mono hover:text-primary mb-px" href="#">
           Tyler Hero
          </a>
          <a class="hover:text-primary text-2sm text-secondary-foreground" href="#">
           tyler.hero@gmail.com
          </a>
         </div>
        </div>
        <select class="kt-select max-w-24" data-kt-select="true">
         <option :selected="true">
          Owner
         </option>
         <option>
          Editor
         </option>
         <option>
          Viewer
         </option>
        </select>
       </div>
       <div class="flex items-center flex-wrap gap-2">
        <div class="flex items-center grow gap-2.5">
         <img alt="" class="rounded-full size-9 shrink-0" src="/media/avatars/300-1.png"/>
         <div class="flex flex-col">
          <a class="text-sm font-semibold text-mono hover:text-primary mb-px" href="#">
           Esther Howard
          </a>
          <a class="hover:text-primary text-2sm text-secondary-foreground" href="#">
           esther.howard@gmail.com
          </a>
         </div>
        </div>
        <select class="kt-select max-w-24" data-kt-select="true">
         <option>
          Owner
         </option>
         <option :selected="true">
          Editor
         </option>
         <option>
          Viewer
         </option>
        </select>
       </div>
       <div class="flex items-center flex-wrap gap-2">
        <div class="flex items-center grow gap-2.5">
         <img alt="" class="rounded-full size-9 shrink-0" src="/media/avatars/300-11.png"/>
         <div class="flex flex-col">
          <a class="text-sm font-semibold text-mono hover:text-primary mb-px" href="#">
           Jacob Jones
          </a>
          <a class="hover:text-primary text-2sm text-secondary-foreground" href="#">
           jacob.jones@gmail.com
          </a>
         </div>
        </div>
        <select class="kt-select max-w-24" data-kt-select="true">
         <option>
          Owner
         </option>
         <option>
          Editor
         </option>
         <option :selected="true">
          Viewer
         </option>
        </select>
       </div>
      </div>
     </div>
     <div class="border-b border-b-border">
     </div>
     <div class="flex flex-col px-5 gap-4">
      <label class="text-mono font-semibold text-sm">
       Settings
      </label>
      <div class="flex flex-center justify-between flex-wrap gap-2">
       <div class="flex flex-center gap-1.5">
        <i class="ki-filled ki-user text-muted-foreground">
        </i>
        <div class="flex flex-center text-secondary-foreground font-medium text-xs">
         Anyone at
         <a class="text-xs font-medium link mx-1" href="#">
          KeenThemes
         </a>
         can view
        </div>
       </div>
       <button class="kt-link kt-link-sm kt-link-underlined kt-link-dashed">
        Change Access
       </button>
      </div>
      <div class="flex flex-center justify-between flex-wrap gap-2 mb-2.5">
       <div class="flex flex-center gap-1.5">
        <i class="ki-filled ki-icon text-muted-foreground">
        </i>
        <div class="flex flex-center text-secondary-foreground font-medium text-xs">
         Anyone with link can edit
        </div>
       </div>
       <button class="kt-link kt-link-sm kt-link-underlined kt-link-dashed">
        Set Password
       </button>
      </div>
      <button class="kt-btn kt-btn-primary justify-center">
       Done
      </button>
     </div>
    </div>
   </div>
  </div>
  <!-- End of Share Profile Modal -->
</template>
