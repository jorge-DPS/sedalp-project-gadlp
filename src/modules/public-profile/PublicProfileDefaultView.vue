<template>
  <!-- Toolbar -->
  <div class="pb-5">
    <!-- Container -->
    <div
      class="kt-container-fixed flex items-center justify-between flex-wrap gap-3"
    >
      <div class="flex flex-col flex-wrap gap-1">
        <h1 class="font-medium text-lg text-mono">Default</h1>
        <div class="flex items-center gap-1 text-sm font-normal">
          <RouterLink
            class="text-secondary-foreground hover:text-primary"
            to="/"
          >
            Home
          </RouterLink>
          <span class="text-muted-foreground text-sm"> / </span>
          <span class="text-secondary-foreground"> Public Profile </span>
          <span class="text-muted-foreground text-sm"> / </span>
          <span class="text-secondary-foreground"> Profiles </span>
          <span class="text-muted-foreground text-sm"> / </span>
          <span class="text-mono"> Default </span>
        </div>
      </div>
      <div class="flex items-center flex-wrap gap-1.5 lg:gap-2.5">
        <a @click.prevent class="kt-btn kt-btn-outline" href="#">
          <i class="ki-filled ki-exit-down"> </i>
          Export
        </a>
        <div class="kt-menu kt-menu-default" data-kt-menu="true">
          <div
            class="kt-menu-item"
            data-kt-menu-item-offset="0, 0"
            data-kt-menu-item-placement="bottom-end"
            data-kt-menu-item-toggle="dropdown"
            data-kt-menu-item-trigger="hover"
          >
            <button class="kt-menu-toggle kt-btn kt-btn-outline flex-nowrap">
              <span class="flex items-center me-1">
                <i class="ki-filled ki-calendar text-base!"> </i>
              </span>
              <span class="hidden md:inline text-nowrap">
                September, 2024
              </span>
              <span class="inline md:hidden text-nowrap"> Sep, 2024 </span>
              <span class="flex items-center lg:ms-4">
                <i class="ki-filled ki-down text-xs!"> </i>
              </span>
            </button>
            <div
              class="kt-menu-dropdown w-48 py-2 kt-scrollable-y max-h-[250px]"
            >
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> January, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> February, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item active">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> March, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> April, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> May, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> June, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> July, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> August, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> September, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> October, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> November, 2024 </span>
                </a>
              </div>
              <div class="kt-menu-item">
                <a class="kt-menu-link" href="#">
                  <span class="kt-menu-title"> December, 2024 </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Container -->
  </div>
  <!-- End of Toolbar -->

  <div class="bg-center bg-cover bg-no-repeat hero-bg">
    <!-- Container -->
    <div class="kt-container-fixed">
      <div
        class="flex flex-col items-center gap-2 lg:gap-3.5 py-4 lg:pt-5 lg:pb-10"
      >
        <img
          class="rounded-full border-3 border-green-500 size-[100px] shrink-0"
          src="/media/avatars/300-1.png"
        />
        <div class="flex items-center gap-1.5">
          <div class="text-lg leading-5 font-semibold text-mono">
            Jenny Klabber
          </div>
          <svg
            class="text-primary"
            fill="none"
            height="16"
            viewbox="0 0 15 16"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5425 6.89749L13.5 5.83999C13.4273 5.76877 13.3699 5.6835 13.3312 5.58937C13.2925 5.49525 13.2734 5.39424 13.275 5.29249V3.79249C13.274 3.58699 13.2324 3.38371 13.1527 3.19432C13.0729 3.00494 12.9565 2.83318 12.8101 2.68892C12.6638 2.54466 12.4904 2.43073 12.2998 2.35369C12.1093 2.27665 11.9055 2.23801 11.7 2.23999H10.2C10.0982 2.24159 9.99722 2.22247 9.9031 2.18378C9.80898 2.1451 9.72371 2.08767 9.65249 2.01499L8.60249 0.957487C8.30998 0.665289 7.91344 0.50116 7.49999 0.50116C7.08654 0.50116 6.68999 0.665289 6.39749 0.957487L5.33999 1.99999C5.26876 2.07267 5.1835 2.1301 5.08937 2.16879C4.99525 2.20747 4.89424 2.22659 4.79249 2.22499H3.29249C3.08699 2.22597 2.88371 2.26754 2.69432 2.34731C2.50494 2.42709 2.33318 2.54349 2.18892 2.68985C2.04466 2.8362 1.93073 3.00961 1.85369 3.20013C1.77665 3.39064 1.73801 3.5945 1.73999 3.79999V5.29999C1.74159 5.40174 1.72247 5.50275 1.68378 5.59687C1.6451 5.691 1.58767 5.77627 1.51499 5.84749L0.457487 6.89749C0.165289 7.19 0.00115967 7.58654 0.00115967 7.99999C0.00115967 8.41344 0.165289 8.80998 0.457487 9.10249L1.49999 10.16C1.57267 10.2312 1.6301 10.3165 1.66878 10.4106C1.70747 10.5047 1.72659 10.6057 1.72499 10.7075V12.2075C1.72597 12.413 1.76754 12.6163 1.84731 12.8056C1.92709 12.995 2.04349 13.1668 2.18985 13.3111C2.3362 13.4553 2.50961 13.5692 2.70013 13.6463C2.89064 13.7233 3.0945 13.762 3.29999 13.76H4.79999C4.90174 13.7584 5.00275 13.7775 5.09687 13.8162C5.191 13.8549 5.27627 13.9123 5.34749 13.985L6.40499 15.0425C6.69749 15.3347 7.09404 15.4988 7.50749 15.4988C7.92094 15.4988 8.31748 15.3347 8.60999 15.0425L9.65999 14C9.73121 13.9273 9.81647 13.8699 9.9106 13.8312C10.0047 13.7925 10.1057 13.7734 10.2075 13.775H11.7075C12.1212 13.775 12.518 13.6106 12.8106 13.3181C13.1031 13.0255 13.2675 12.6287 13.2675 12.215V10.715C13.2659 10.6132 13.285 10.5122 13.3237 10.4181C13.3624 10.324 13.4198 10.2387 13.4925 10.1675L14.55 9.10999C14.6953 8.96452 14.8104 8.79176 14.8887 8.60164C14.9671 8.41152 15.007 8.20779 15.0063 8.00218C15.0056 7.79656 14.9643 7.59311 14.8847 7.40353C14.8051 7.21394 14.6888 7.04197 14.5425 6.89749ZM10.635 6.64999L6.95249 10.25C6.90055 10.3026 6.83864 10.3443 6.77038 10.3726C6.70212 10.4009 6.62889 10.4153 6.55499 10.415C6.48062 10.4139 6.40719 10.3982 6.33896 10.3685C6.27073 10.3389 6.20905 10.2961 6.15749 10.2425L4.37999 8.44249C4.32532 8.39044 4.28169 8.32793 4.25169 8.25867C4.22169 8.18941 4.20593 8.11482 4.20536 8.03934C4.20479 7.96387 4.21941 7.88905 4.24836 7.81934C4.27731 7.74964 4.31999 7.68647 4.37387 7.63361C4.42774 7.58074 4.4917 7.53926 4.56194 7.51163C4.63218 7.484 4.70726 7.47079 4.78271 7.47278C4.85816 7.47478 4.93244 7.49194 5.00112 7.52324C5.0698 7.55454 5.13148 7.59935 5.18249 7.65499L6.56249 9.05749L9.84749 5.84749C9.95296 5.74215 10.0959 5.68298 10.245 5.68298C10.394 5.68298 10.537 5.74215 10.6425 5.84749C10.6953 5.90034 10.737 5.96318 10.7653 6.03234C10.7935 6.1015 10.8077 6.1756 10.807 6.25031C10.8063 6.32502 10.7908 6.39884 10.7612 6.46746C10.7317 6.53608 10.6888 6.59813 10.635 6.64999Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div class="flex flex-wrap justify-center gap-1 lg:gap-4.5 text-sm">
          <div class="flex gap-1.25 items-center">
            <i class="ki-filled ki-abstract-41 text-muted-foreground text-sm">
            </i>
            <span class="text-secondary-foreground font-medium">
              KeenThemes
            </span>
          </div>
          <div class="flex gap-1.25 items-center">
            <i class="ki-filled ki-geolocation text-muted-foreground text-sm">
            </i>
            <span class="text-secondary-foreground font-medium">
              SF, Bay Area
            </span>
          </div>
          <div class="flex gap-1.25 items-center">
            <i class="ki-filled ki-sms text-muted-foreground text-sm"> </i>
            <a
              class="text-secondary-foreground font-medium hover:text-primary"
              href="mailto: jenny@kteam.com"
            >
              jenny@kteam.com
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Container -->
  </div>
  <!-- Container -->
  <div class="kt-container-fixed">
    <div
      class="flex items-center flex-wrap md:flex-nowrap lg:items-end justify-between border-b border-b-border gap-3 lg:gap-6 mb-5 lg:mb-10"
    >
      <div class="grid">
        <div class="kt-scrollable-x-auto">
          <div class="kt-menu gap-3" data-kt-menu="true">
            <div
              class="kt-menu-item border-b-2 border-b-transparent kt-menu-item-active:border-b-primary kt-menu-item-here:border-b-primary here"
              data-kt-menu-item-overflow="true"
              data-kt-menu-item-placement="bottom-start"
              data-kt-menu-item-placement-rtl="bottom-end"
              data-kt-menu-item-toggle="dropdown"
              data-kt-menu-item-trigger="click|lg:hover"
            >
              <div class="kt-menu-link gap-1.5 pb-2 lg:pb-4 px-2">
                <span
                  class="kt-menu-title text-nowrap text-sm text-secondary-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-medium kt-menu-item-here:text-primary kt-menu-item-here:font-medium kt-menu-item-show:text-primary kt-menu-link-hover:text-primary"
                >
                  Profiles
                </span>
                <span class="kt-menu-arrow">
                  <i
                    class="ki-filled ki-down text-xs text-muted-foreground menu-item-active:text-primary kt-menu-item-here:text-primary menu-item-show:text-primary kt-menu-link-hover:text-primary"
                  >
                  </i>
                </span>
              </div>
              <div class="kt-menu-dropdown kt-menu-default py-2 min-w-[200px]">
                <div class="kt-menu-item active">
                  <RouterLink
                    class="kt-menu-link"
                    tabindex="0"
                    to="/public-profile/profiles/default"
                  >
                    <span class="kt-menu-title"> Default </span>
                  </RouterLink>
                </div>
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> Creator </span>
                  </a>
                </div>
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> Company </span>
                  </a>
                </div>
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> NFT </span>
                  </a>
                </div>
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> Blogger </span>
                  </a>
                </div>
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> CRM </span>
                  </a>
                </div>
                <div
                  class="kt-menu-item"
                  data-kt-menu-item-offset="-10px, 0"
                  data-kt-menu-item-placement="right-start"
                  data-kt-menu-item-toggle="dropdown"
                  data-kt-menu-item-trigger="click|lg:hover"
                >
                  <div class="kt-menu-link" tabindex="0">
                    <span class="kt-menu-title"> More </span>
                    <span class="kt-menu-arrow">
                      <i
                        class="ki-filled ki-down text-xs in-[.kt-menu-dropdown]:-rotate-90"
                      >
                      </i>
                    </span>
                  </div>
                  <div
                    class="kt-menu-dropdown kt-menu-default py min-w-[200px]"
                  >
                    <div class="kt-menu-item">
                      <a
                        @click.prevent
                        class="kt-menu-link"
                        href="#"
                        tabindex="0"
                      >
                        <span class="kt-menu-title"> Gamer </span>
                      </a>
                    </div>
                    <div class="kt-menu-item">
                      <a
                        @click.prevent
                        class="kt-menu-link"
                        href="#"
                        tabindex="0"
                      >
                        <span class="kt-menu-title"> Feeds </span>
                      </a>
                    </div>
                    <div class="kt-menu-item">
                      <a
                        @click.prevent
                        class="kt-menu-link"
                        href="#"
                        tabindex="0"
                      >
                        <span class="kt-menu-title"> Plain </span>
                      </a>
                    </div>
                    <div class="kt-menu-item">
                      <a
                        @click.prevent
                        class="kt-menu-link"
                        href="#"
                        tabindex="0"
                      >
                        <span class="kt-menu-title"> Modal </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="kt-menu-item border-b-2 border-b-transparent kt-menu-item-active:border-b-primary kt-menu-item-here:border-b-primary"
              data-kt-menu-item-overflow="true"
              data-kt-menu-item-placement="bottom-start"
              data-kt-menu-item-placement-rtl="bottom-end"
              data-kt-menu-item-toggle="dropdown"
              data-kt-menu-item-trigger="click|lg:hover"
            >
              <div class="kt-menu-link gap-1.5 pb-2 lg:pb-4 px-2">
                <span
                  class="kt-menu-title text-nowrap text-sm text-secondary-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-medium kt-menu-item-here:text-primary kt-menu-item-here:font-medium kt-menu-item-show:text-primary kt-menu-link-hover:text-primary"
                >
                  Projects
                </span>
                <span class="kt-menu-arrow">
                  <i
                    class="ki-filled ki-down text-xs text-muted-foreground menu-item-active:text-primary kt-menu-item-here:text-primary menu-item-show:text-primary kt-menu-link-hover:text-primary"
                  >
                  </i>
                </span>
              </div>
              <div class="kt-menu-dropdown kt-menu-default py-2 min-w-[200px]">
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> 3 Columns </span>
                  </a>
                </div>
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> 2 Columns </span>
                  </a>
                </div>
              </div>
            </div>
            <div
              class="kt-menu-item border-b-2 border-b-transparent kt-menu-item-active:border-b-primary kt-menu-item-here:border-b-primary"
            >
              <a
                @click.prevent
                class="kt-menu-link gap-1.5 pb-2 lg:pb-4 px-2"
                href="#"
              >
                <span
                  class="kt-menu-title text-nowrap font-medium text-sm text-secondary-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-semibold kt-menu-item-here:text-primary kt-menu-item-here:font-semibold kt-menu-item-show:text-primary kt-menu-link-hover:text-primary"
                >
                  Works
                </span>
              </a>
            </div>
            <div
              class="kt-menu-item border-b-2 border-b-transparent kt-menu-item-active:border-b-primary kt-menu-item-here:border-b-primary"
            >
              <a
                @click.prevent
                class="kt-menu-link gap-1.5 pb-2 lg:pb-4 px-2"
                href="#"
              >
                <span
                  class="kt-menu-title text-nowrap font-medium text-sm text-secondary-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-semibold kt-menu-item-here:text-primary kt-menu-item-here:font-semibold kt-menu-item-show:text-primary kt-menu-link-hover:text-primary"
                >
                  Teams
                </span>
              </a>
            </div>
            <div
              class="kt-menu-item border-b-2 border-b-transparent kt-menu-item-active:border-b-primary kt-menu-item-here:border-b-primary"
            >
              <a
                @click.prevent
                class="kt-menu-link gap-1.5 pb-2 lg:pb-4 px-2"
                href="#"
              >
                <span
                  class="kt-menu-title text-nowrap font-medium text-sm text-secondary-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-semibold kt-menu-item-here:text-primary kt-menu-item-here:font-semibold kt-menu-item-show:text-primary kt-menu-link-hover:text-primary"
                >
                  Network
                </span>
              </a>
            </div>
            <div
              class="kt-menu-item border-b-2 border-b-transparent kt-menu-item-active:border-b-primary kt-menu-item-here:border-b-primary"
            >
              <a
                @click.prevent
                class="kt-menu-link gap-1.5 pb-2 lg:pb-4 px-2"
                href="#"
              >
                <span
                  class="kt-menu-title text-nowrap font-medium text-sm text-secondary-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-semibold kt-menu-item-here:text-primary kt-menu-item-here:font-semibold kt-menu-item-show:text-primary kt-menu-link-hover:text-primary"
                >
                  Activity
                </span>
              </a>
            </div>
            <div
              class="kt-menu-item border-b-2 border-b-transparent kt-menu-item-active:border-b-primary kt-menu-item-here:border-b-primary"
              data-kt-menu-item-overflow="true"
              data-kt-menu-item-placement="bottom-start"
              data-kt-menu-item-placement-rtl="bottom-end"
              data-kt-menu-item-toggle="dropdown"
              data-kt-menu-item-trigger="click|lg:hover"
            >
              <div class="kt-menu-link gap-1.5 pb-2 lg:pb-4 px-2">
                <span
                  class="kt-menu-title text-nowrap text-sm text-secondary-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-medium kt-menu-item-here:text-primary kt-menu-item-here:font-medium kt-menu-item-show:text-primary kt-menu-link-hover:text-primary"
                >
                  More
                </span>
                <span class="kt-menu-arrow">
                  <i
                    class="ki-filled ki-down text-xs text-muted-foreground menu-item-active:text-primary kt-menu-item-here:text-primary menu-item-show:text-primary kt-menu-link-hover:text-primary"
                  >
                  </i>
                </span>
              </div>
              <div class="kt-menu-dropdown kt-menu-default py-2 min-w-[200px]">
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> Campaigns - Card </span>
                  </a>
                </div>
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> Campaigns - List </span>
                  </a>
                </div>
                <div class="kt-menu-item">
                  <a @click.prevent class="kt-menu-link" href="#" tabindex="0">
                    <span class="kt-menu-title"> Empty </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-end grow lg:grow-0 lg:pb-4 gap-2.5 mb-3 lg:mb-0"
      >
        <button class="kt-btn kt-btn-primary">
          <i class="ki-filled ki-users"> </i>
          Connect
        </button>
        <button class="kt-btn kt-btn-icon kt-btn-outline">
          <i class="ki-filled ki-messages"> </i>
        </button>
        <div
          data-kt-dropdown="true"
          data-kt-dropdown-placement="bottom-end"
          data-kt-dropdown-placement-rtl="bottom-start"
          data-kt-dropdown-trigger="click"
        >
          <button
            class="kt-dropdown-toggle kt-btn kt-btn-icon kt-btn-outline"
            data-kt-dropdown-toggle="true"
          >
            <i class="ki-filled ki-dots-vertical"> </i>
          </button>
          <div
            class="kt-dropdown-menu w-full max-w-[220px]"
            data-kt-dropdown-menu="true"
          >
            <ul class="kt-dropdown-menu-sub">
              <li>
                <button
                  class="kt-dropdown-menu-link"
                  data-kt-dropdown-dismiss="true"
                  data-kt-modal-toggle="#share_profile_modal"
                >
                  <i class="ki-filled ki-coffee"> </i>
                  Share Profile
                </button>
              </li>
              <li>
                <button
                  class="kt-dropdown-menu-link"
                  data-kt-dropdown-dismiss="true"
                  data-kt-modal-toggle="#give_award_modal"
                >
                  <i class="ki-filled ki-award"> </i>
                  Give Award
                </button>
              </li>
              <li>
                <div class="kt-dropdown-menu-link">
                  <i class="ki-filled ki-coffee"> </i>
                  Stay Updated
                  <input
                    class="ms-auto kt-switch kt-switch-sm"
                    name="check"
                    type="checkbox"
                    value="1"
                  />
                </div>
              </li>
              <li>
                <button
                  class="kt-dropdown-menu-link"
                  data-kt-dropdown-dismiss="true"
                  data-kt-modal-toggle="#report_user_modal"
                >
                  <i class="ki-filled ki-information-2"> </i>
                  Report User
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Container -->
  <!-- Container -->
  <div class="kt-container-fixed">
    <!-- begin: grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div class="col-span-1">
        <div class="grid gap-5 lg:gap-7.5">
          <div class="kt-card">
            <div class="kt-card-header">
              <h3 class="kt-card-title">Community Badges</h3>
            </div>
            <div class="kt-card-content pb-7.5">
              <div class="flex items-center flex-wrap gap-3 lg:gap-4">
                <div class="relative size-[50px] shrink-0">
                  <svg
                    class="w-full h-full stroke-primary/10 fill-primary/5"
                    fill="none"
                    height="48"
                    viewbox="0 0 44 48"
                    width="44"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
			18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
			39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                      fill=""
                    ></path>
                    <path
                      d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
			18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
			39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                      stroke=""
                    ></path>
                  </svg>
                  <div
                    class="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4"
                  >
                    <i
                      class="ki-filled ki-abstract-39 text-xl ps-px text-primary"
                    >
                    </i>
                  </div>
                </div>
                <div class="relative size-[50px] shrink-0">
                  <svg
                    class="w-full h-full stroke-yellow-200 dark:stroke-yellow-950 fill-yellow-100 dark:fill-yellow-950/30"
                    fill="none"
                    height="48"
                    viewbox="0 0 44 48"
                    width="44"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
			18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
			39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                      fill=""
                    ></path>
                    <path
                      d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
			18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
			39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                      stroke=""
                    ></path>
                  </svg>
                  <div
                    class="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4"
                  >
                    <i
                      class="ki-filled ki-abstract-44 text-xl ps-px text-yellow-600"
                    >
                    </i>
                  </div>
                </div>
                <div class="relative size-[50px] shrink-0">
                  <svg
                    class="w-full h-full stroke-green-200 dark:stroke-green-950 fill-green-100 dark:fill-green-950/30"
                    fill="none"
                    height="48"
                    viewbox="0 0 44 48"
                    width="44"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
			18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
			39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                      fill=""
                    ></path>
                    <path
                      d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
			18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
			39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                      stroke=""
                    ></path>
                  </svg>
                  <div
                    class="absolute leading-none inset-s-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4"
                  >
                    <i
                      class="ki-filled ki-abstract-25 text-xl ps-px text-green-600"
                    >
                    </i>
                  </div>
                </div>
                <div class="relative size-[50px] shrink-0">
                  <svg
                    class="w-full h-full stroke-violet-200 dark:stroke-violet-950 fill-violet-100 dark:fill-violet-950/30"
                    fill="none"
                    height="48"
                    viewbox="0 0 44 48"
                    width="44"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
			18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
			39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                      fill=""
                    ></path>
                    <path
                      d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
			18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
			39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                      stroke=""
                    ></path>
                  </svg>
                  <div
                    class="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4"
                  >
                    <i
                      class="ki-filled ki-delivery-24 text-xl ps-px text-violet-600"
                    >
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kt-card">
            <div class="kt-card-header">
              <h3 class="kt-card-title">About</h3>
            </div>
            <div class="kt-card-content pt-4 pb-3">
              <table class="kt-table-auto">
                <tbody>
                  <tr>
                    <td class="text-sm text-secondary-foreground pb-3.5 pe-3">
                      Age
                    </td>
                    <td class="text-sm text-mono pb-3.5">32</td>
                  </tr>
                  <tr>
                    <td class="text-sm text-secondary-foreground pb-3.5 pe-3">
                      City:
                    </td>
                    <td class="text-sm text-mono pb-3.5">Amsterdam</td>
                  </tr>
                  <tr>
                    <td class="text-sm text-secondary-foreground pb-3.5 pe-3">
                      State:
                    </td>
                    <td class="text-sm text-mono pb-3.5">North Holland</td>
                  </tr>
                  <tr>
                    <td class="text-sm text-secondary-foreground pb-3.5 pe-3">
                      Country:
                    </td>
                    <td class="text-sm text-mono pb-3.5">Netherlands</td>
                  </tr>
                  <tr>
                    <td class="text-sm text-secondary-foreground pb-3.5 pe-3">
                      Postcode:
                    </td>
                    <td class="text-sm text-mono pb-3.5">1092 NL</td>
                  </tr>
                  <tr>
                    <td class="text-sm text-secondary-foreground pb-3.5 pe-3">
                      Phone:
                    </td>
                    <td class="text-sm text-mono pb-3.5">+31 6 1234 56 78</td>
                  </tr>
                  <tr>
                    <td class="text-sm text-secondary-foreground pb-3.5 pe-3">
                      Email:
                    </td>
                    <td class="text-sm text-mono pb-3.5">
                      <a class="text-foreground hover:text-primary" href="#">
                        jenny@ktstudio.com
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="kt-card">
            <div class="kt-card-header">
              <h3 class="kt-card-title">Work Experience</h3>
            </div>
            <div class="kt-card-content">
              <div class="grid gap-y-5">
                <div class="flex align-start gap-3.5">
                  <img alt="" class="h-9" src="/media/brand-logos/jira.svg" />
                  <div class="flex flex-col gap-1">
                    <a
                      class="text-sm font-medium text-primary leading-none hover:text-primary"
                      href="#"
                    >
                      Esprito Studios
                    </a>
                    <span class="text-sm font-medium text-mono">
                      Senior Project Manager
                    </span>
                    <span
                      class="text-xs text-secondary-foreground leading-none"
                    >
                      2019 - Present
                    </span>
                  </div>
                </div>
                <div
                  class="text-secondary-foreground font-semibold text-sm leading-none"
                >
                  Previous Jobs
                </div>
                <div class="flex align-start gap-3.5">
                  <img alt="" class="h-9" src="/media/brand-logos/weave.svg" />
                  <div class="flex flex-col gap-1">
                    <a
                      class="text-sm font-medium text-primary leading-none hover:text-primary"
                      href="#"
                    >
                      Pesto Plus
                    </a>
                    <span class="text-sm font-medium text-mono">
                      CRM Product Lead
                    </span>
                    <span
                      class="text-xs text-secondary-foreground leading-none"
                    >
                      2012 - 2019
                    </span>
                  </div>
                </div>
                <div class="flex align-start gap-3.5">
                  <img
                    alt=""
                    class="h-9"
                    src="/media/brand-logos/perrier.svg"
                  />
                  <div class="flex flex-col gap-1">
                    <a
                      class="text-sm font-medium text-primary leading-none hover:text-primary"
                      href="#"
                    >
                      Perrier Technologies
                    </a>
                    <span class="text-sm font-medium text-mono">
                      UX Research
                    </span>
                    <span
                      class="text-xs text-secondary-foreground leading-none"
                    >
                      2010 - 2012
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="kt-card-footer justify-center">
              <a
                @click.prevent
                class="kt-link kt-link-underlined kt-link-dashed"
                href="#"
              >
                Open to Work
              </a>
            </div>
          </div>
          <div class="kt-card">
            <div class="kt-card-header">
              <h3 class="kt-card-title">Skills</h3>
            </div>
            <div class="kt-card-content">
              <div class="flex flex-wrap gap-2.5 mb-2">
                <span class="kt-badge kt-badge-outline"> Web Design </span>
                <span class="kt-badge kt-badge-outline"> Code Review </span>
                <span class="kt-badge kt-badge-outline"> Figma </span>
                <span class="kt-badge kt-badge-outline">
                  Product Development
                </span>
                <span class="kt-badge kt-badge-outline"> Webflow </span>
                <span class="kt-badge kt-badge-outline"> AI </span>
                <span class="kt-badge kt-badge-outline"> noCode </span>
                <span class="kt-badge kt-badge-outline"> Management </span>
              </div>
            </div>
          </div>
          <div class="kt-card">
            <div class="kt-card-header">
              <h3 class="kt-card-title">Recent Uploads</h3>
              <div class="kt-menu" data-kt-menu="true">
                <div
                  class="kt-menu-item"
                  data-kt-menu-item-offset="0, 10px"
                  data-kt-menu-item-placement="bottom-end"
                  data-kt-menu-item-placement-rtl="bottom-start"
                  data-kt-menu-item-toggle="dropdown"
                  data-kt-menu-item-trigger="click"
                >
                  <button
                    class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                  >
                    <i class="ki-filled ki-dots-vertical text-lg"> </i>
                  </button>
                  <div
                    class="kt-menu-dropdown kt-menu-default w-full max-w-[200px]"
                    data-kt-menu-dismiss="true"
                  >
                    <div class="kt-menu-item">
                      <a @click.prevent class="kt-menu-link" href="#">
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-cloud-change"> </i>
                        </span>
                        <span class="kt-menu-title"> Activity </span>
                      </a>
                    </div>
                    <div class="kt-menu-item">
                      <a
                        class="kt-menu-link"
                        data-kt-modal-toggle="#share_profile_modal"
                        href="#"
                      >
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-share"> </i>
                        </span>
                        <span class="kt-menu-title"> Share </span>
                      </a>
                    </div>
                    <div
                      class="kt-menu-item"
                      data-kt-menu-item-offset="-15px, 0"
                      data-kt-menu-item-placement="right-start"
                      data-kt-menu-item-toggle="dropdown"
                      data-kt-menu-item-trigger="click|lg:hover"
                    >
                      <div class="kt-menu-link">
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-notification-status"> </i>
                        </span>
                        <span class="kt-menu-title"> Notifications </span>
                        <span class="kt-menu-arrow">
                          <i
                            class="ki-filled ki-right text-xs rtl:transform rtl:rotate-180"
                          >
                          </i>
                        </span>
                      </div>
                      <div
                        class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                      >
                        <div class="kt-menu-item">
                          <a @click.prevent class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-sms"> </i>
                            </span>
                            <span class="kt-menu-title"> Email </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a @click.prevent class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-message-notify"> </i>
                            </span>
                            <span class="kt-menu-title"> SMS </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a @click.prevent class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-notification-status"> </i>
                            </span>
                            <span class="kt-menu-title"> Push </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="kt-menu-item">
                      <a
                        class="kt-menu-link"
                        data-kt-modal-toggle="#report_user_modal"
                        href="#"
                      >
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-dislike"> </i>
                        </span>
                        <span class="kt-menu-title"> Report </span>
                      </a>
                    </div>
                    <div class="kt-menu-separator"></div>
                    <div class="kt-menu-item">
                      <a @click.prevent class="kt-menu-link" href="#">
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-setting-3"> </i>
                        </span>
                        <span class="kt-menu-title"> Settings </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kt-card-content">
              <div class="grid gap-2.5 lg:gap-5">
                <div class="flex items-center gap-3">
                  <div class="flex items-center grow gap-2.5">
                    <img src="/media/file-types/pdf.svg" />
                    <div class="flex flex-col">
                      <span
                        class="text-sm font-medium text-mono cursor-pointer hover:text-primary mb-px"
                      >
                        Project-pitch.pdf
                      </span>
                      <span class="text-xs text-secondary-foreground">
                        4.7 MB 26 Sep 2024 3:20 PM
                      </span>
                    </div>
                  </div>
                  <div class="kt-menu" data-kt-menu="true">
                    <div
                      class="kt-menu-item"
                      data-kt-menu-item-offset="0, 10px"
                      data-kt-menu-item-placement="bottom-end"
                      data-kt-menu-item-placement-rtl="bottom-start"
                      data-kt-menu-item-toggle="dropdown"
                      data-kt-menu-item-trigger="click"
                    >
                      <button
                        class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                      >
                        <i class="ki-filled ki-dots-vertical text-lg"> </i>
                      </button>
                      <div
                        class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                        data-kt-menu-dismiss="true"
                      >
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-document"> </i>
                            </span>
                            <span class="kt-menu-title"> Details </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a
                            class="kt-menu-link"
                            data-kt-modal-toggle="#share_profile_modal"
                            href="#"
                          >
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-share"> </i>
                            </span>
                            <span class="kt-menu-title"> Share </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-file-up"> </i>
                            </span>
                            <span class="kt-menu-title"> Export </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex items-center grow gap-2.5">
                    <img src="/media/file-types/doc.svg" />
                    <div class="flex flex-col">
                      <span
                        class="text-sm font-medium text-mono cursor-pointer hover:text-primary mb-px"
                      >
                        Report-v1.docx
                      </span>
                      <span class="text-xs text-secondary-foreground">
                        2.3 MB 1 Oct 2024 12:00 PM
                      </span>
                    </div>
                  </div>
                  <div class="kt-menu" data-kt-menu="true">
                    <div
                      class="kt-menu-item"
                      data-kt-menu-item-offset="0, 10px"
                      data-kt-menu-item-placement="bottom-end"
                      data-kt-menu-item-placement-rtl="bottom-start"
                      data-kt-menu-item-toggle="dropdown"
                      data-kt-menu-item-trigger="click"
                    >
                      <button
                        class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                      >
                        <i class="ki-filled ki-dots-vertical text-lg"> </i>
                      </button>
                      <div
                        class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                        data-kt-menu-dismiss="true"
                      >
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-document"> </i>
                            </span>
                            <span class="kt-menu-title"> Details </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a
                            class="kt-menu-link"
                            data-kt-modal-toggle="#share_profile_modal"
                            href="#"
                          >
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-share"> </i>
                            </span>
                            <span class="kt-menu-title"> Share </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-file-up"> </i>
                            </span>
                            <span class="kt-menu-title"> Export </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex items-center grow gap-2.5">
                    <img src="/media/file-types/ai.svg" />
                    <div class="flex flex-col">
                      <span
                        class="text-sm font-medium text-mono cursor-pointer hover:text-primary mb-px"
                      >
                        Framework-App.js
                      </span>
                      <span class="text-xs text-secondary-foreground">
                        0.8 MB 17 Oct 2024 6:46 PM
                      </span>
                    </div>
                  </div>
                  <div class="kt-menu" data-kt-menu="true">
                    <div
                      class="kt-menu-item"
                      data-kt-menu-item-offset="0, 10px"
                      data-kt-menu-item-placement="bottom-end"
                      data-kt-menu-item-placement-rtl="bottom-start"
                      data-kt-menu-item-toggle="dropdown"
                      data-kt-menu-item-trigger="click"
                    >
                      <button
                        class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                      >
                        <i class="ki-filled ki-dots-vertical text-lg"> </i>
                      </button>
                      <div
                        class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                        data-kt-menu-dismiss="true"
                      >
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-document"> </i>
                            </span>
                            <span class="kt-menu-title"> Details </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a
                            class="kt-menu-link"
                            data-kt-modal-toggle="#share_profile_modal"
                            href="#"
                          >
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-share"> </i>
                            </span>
                            <span class="kt-menu-title"> Share </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-file-up"> </i>
                            </span>
                            <span class="kt-menu-title"> Export </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex items-center grow gap-2.5">
                    <img src="/media/file-types/js.svg" />
                    <div class="flex flex-col">
                      <span
                        class="text-sm font-medium text-mono cursor-pointer hover:text-primary mb-px"
                      >
                        Mobile-logo.ai
                      </span>
                      <span class="text-xs text-secondary-foreground">
                        0.2 MB 4 Nov 2024 11:30 AM
                      </span>
                    </div>
                  </div>
                  <div class="kt-menu" data-kt-menu="true">
                    <div
                      class="kt-menu-item"
                      data-kt-menu-item-offset="0, 10px"
                      data-kt-menu-item-placement="bottom-end"
                      data-kt-menu-item-placement-rtl="bottom-start"
                      data-kt-menu-item-toggle="dropdown"
                      data-kt-menu-item-trigger="click"
                    >
                      <button
                        class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                      >
                        <i class="ki-filled ki-dots-vertical text-lg"> </i>
                      </button>
                      <div
                        class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                        data-kt-menu-dismiss="true"
                      >
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-document"> </i>
                            </span>
                            <span class="kt-menu-title"> Details </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a
                            class="kt-menu-link"
                            data-kt-modal-toggle="#share_profile_modal"
                            href="#"
                          >
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-share"> </i>
                            </span>
                            <span class="kt-menu-title"> Share </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#">
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-file-up"> </i>
                            </span>
                            <span class="kt-menu-title"> Export </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kt-card-footer justify-center">
              <a
                @click.prevent
                class="kt-link kt-link-underlined kt-link-dashed"
                href="#"
              >
                All Files
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="flex flex-col gap-5 lg:gap-7.5">
          <div class="flex flex-col gap-5 lg:gap-7.5">
            <div class="kt-card">
              <div class="kt-card-content px-10 py-7.5 lg:pe-12.5">
                <div
                  class="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10"
                >
                  <div class="flex flex-col gap-3">
                    <h2 class="text-xl font-semibold text-mono">
                      Unlock Creative
                      <br />
                      Partnerships on Our Blog
                    </h2>
                    <p class="text-sm text-secondary-foreground leading-5.5">
                      Explore exciting collaboration opportunities with our
                      blog. We're open to partnerships, guest posts, and more.
                      Join us to share your insights and grow your audience.
                    </p>
                  </div>
                  <img
                    alt="image"
                    class="dark:hidden max-h-[160px]"
                    src="/media/illustrations/1.svg"
                  />
                  <img
                    alt="image"
                    class="light:hidden max-h-[160px]"
                    src="/media/illustrations/1-dark.svg"
                  />
                </div>
              </div>
              <div class="kt-card-footer justify-center">
                <a
                  @click.prevent
                  class="kt-link kt-link-underlined kt-link-dashed"
                  href="#"
                >
                  Get Started
                </a>
              </div>
            </div>
            <div class="kt-card">
              <div class="kt-card-header">
                <h3 class="kt-card-title">Media Uploads</h3>
                <div class="kt-menu" data-kt-menu="true">
                  <div
                    class="kt-menu-item"
                    data-kt-menu-item-offset="0, 10px"
                    data-kt-menu-item-placement="bottom-end"
                    data-kt-menu-item-placement-rtl="bottom-start"
                    data-kt-menu-item-toggle="dropdown"
                    data-kt-menu-item-trigger="click"
                  >
                    <button
                      class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                    >
                      <i class="ki-filled ki-dots-vertical text-lg"> </i>
                    </button>
                    <div
                      class="kt-menu-dropdown kt-menu-default w-full max-w-[200px]"
                      data-kt-menu-dismiss="true"
                    >
                      <div class="kt-menu-item">
                        <a @click.prevent class="kt-menu-link" href="#">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-setting-3"> </i>
                          </span>
                          <span class="kt-menu-title"> Settings </span>
                        </a>
                      </div>
                      <div class="kt-menu-item">
                        <a @click.prevent class="kt-menu-link" href="#">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-some-files"> </i>
                          </span>
                          <span class="kt-menu-title"> Import </span>
                        </a>
                      </div>
                      <div class="kt-menu-item">
                        <a @click.prevent class="kt-menu-link" href="#">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-cloud-change"> </i>
                          </span>
                          <span class="kt-menu-title"> Activity </span>
                        </a>
                      </div>
                      <div class="kt-menu-item">
                        <a
                          class="kt-menu-link"
                          data-kt-modal-toggle="#report_user_modal"
                          href="#"
                        >
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-dislike"> </i>
                          </span>
                          <span class="kt-menu-title"> Report </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-3 py-1">
                <div id="media_uploads_chart"></div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            <div class="kt-card">
              <div class="kt-card-header gap-2">
                <h3 class="kt-card-title">Contributors</h3>
                <div class="kt-menu" data-kt-menu="true">
                  <div
                    class="kt-menu-item"
                    data-kt-menu-item-offset="0, 10px"
                    data-kt-menu-item-placement="bottom-end"
                    data-kt-menu-item-placement-rtl="bottom-start"
                    data-kt-menu-item-toggle="dropdown"
                    data-kt-menu-item-trigger="click"
                  >
                    <button
                      class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                    >
                      <i class="ki-filled ki-dots-vertical text-lg"> </i>
                    </button>
                    <div
                      class="kt-menu-dropdown kt-menu-default w-full max-w-[200px]"
                      data-kt-menu-dismiss="true"
                    >
                      <div class="kt-menu-item">
                        <a @click.prevent class="kt-menu-link" href="#">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-cloud-change"> </i>
                          </span>
                          <span class="kt-menu-title"> Activity </span>
                        </a>
                      </div>
                      <div class="kt-menu-item">
                        <a
                          class="kt-menu-link"
                          data-kt-modal-toggle="#share_profile_modal"
                          href="#"
                        >
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-share"> </i>
                          </span>
                          <span class="kt-menu-title"> Share </span>
                        </a>
                      </div>
                      <div
                        class="kt-menu-item"
                        data-kt-menu-item-offset="-15px, 0"
                        data-kt-menu-item-placement="right-start"
                        data-kt-menu-item-toggle="dropdown"
                        data-kt-menu-item-trigger="click|lg:hover"
                      >
                        <div class="kt-menu-link">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-notification-status"> </i>
                          </span>
                          <span class="kt-menu-title"> Notifications </span>
                          <span class="kt-menu-arrow">
                            <i
                              class="ki-filled ki-right text-xs rtl:transform rtl:rotate-180"
                            >
                            </i>
                          </span>
                        </div>
                        <div
                          class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                        >
                          <div class="kt-menu-item">
                            <a @click.prevent class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-sms"> </i>
                              </span>
                              <span class="kt-menu-title"> Email </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a @click.prevent class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-message-notify"> </i>
                              </span>
                              <span class="kt-menu-title"> SMS </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a @click.prevent class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-notification-status">
                                </i>
                              </span>
                              <span class="kt-menu-title"> Push </span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="kt-menu-item">
                        <a
                          class="kt-menu-link"
                          data-kt-modal-toggle="#report_user_modal"
                          href="#"
                        >
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-dislike"> </i>
                          </span>
                          <span class="kt-menu-title"> Report </span>
                        </a>
                      </div>
                      <div class="kt-menu-separator"></div>
                      <div class="kt-menu-item">
                        <a @click.prevent class="kt-menu-link" href="#">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-setting-3"> </i>
                          </span>
                          <span class="kt-menu-title"> Settings </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="kt-card-content">
                <div class="flex flex-col gap-2 lg:gap-5">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center grow gap-2.5">
                      <img
                        alt=""
                        class="rounded-full size-9 shrink-0"
                        src="/media/avatars/300-3.png"
                      />
                      <div class="flex flex-col">
                        <a
                          class="text-sm font-semibold text-mono hover:text-primary mb-px"
                          href="#"
                        >
                          Tyler Hero
                        </a>
                        <span
                          class="text-xs font-semibold text-secondary-foreground"
                        >
                          6 contributors
                        </span>
                      </div>
                    </div>
                    <div class="kt-menu" data-kt-menu="true">
                      <div
                        class="kt-menu-item"
                        data-kt-menu-item-offset="0, 10px"
                        data-kt-menu-item-placement="bottom-end"
                        data-kt-menu-item-placement-rtl="bottom-start"
                        data-kt-menu-item-toggle="dropdown"
                        data-kt-menu-item-trigger="click"
                      >
                        <button
                          class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                        >
                          <i class="ki-filled ki-dots-vertical text-lg"> </i>
                        </button>
                        <div
                          class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                          data-kt-menu-dismiss="true"
                        >
                          <div class="kt-menu-item">
                            <a class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-document"> </i>
                              </span>
                              <span class="kt-menu-title"> Details </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a
                              class="kt-menu-link"
                              data-kt-modal-toggle="#share_profile_modal"
                              href="#"
                            >
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-share"> </i>
                              </span>
                              <span class="kt-menu-title"> Share </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-file-up"> </i>
                              </span>
                              <span class="kt-menu-title"> Export </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center grow gap-2.5">
                      <img
                        alt=""
                        class="rounded-full size-9 shrink-0"
                        src="/media/avatars/300-1.png"
                      />
                      <div class="flex flex-col">
                        <a
                          class="text-sm font-semibold text-mono hover:text-primary mb-px"
                          href="#"
                        >
                          Esther Howard
                        </a>
                        <span
                          class="text-xs font-semibold text-secondary-foreground"
                        >
                          29 contributors
                        </span>
                      </div>
                    </div>
                    <div class="kt-menu" data-kt-menu="true">
                      <div
                        class="kt-menu-item"
                        data-kt-menu-item-offset="0, 10px"
                        data-kt-menu-item-placement="bottom-end"
                        data-kt-menu-item-placement-rtl="bottom-start"
                        data-kt-menu-item-toggle="dropdown"
                        data-kt-menu-item-trigger="click"
                      >
                        <button
                          class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                        >
                          <i class="ki-filled ki-dots-vertical text-lg"> </i>
                        </button>
                        <div
                          class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                          data-kt-menu-dismiss="true"
                        >
                          <div class="kt-menu-item">
                            <a class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-document"> </i>
                              </span>
                              <span class="kt-menu-title"> Details </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a
                              class="kt-menu-link"
                              data-kt-modal-toggle="#share_profile_modal"
                              href="#"
                            >
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-share"> </i>
                              </span>
                              <span class="kt-menu-title"> Share </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-file-up"> </i>
                              </span>
                              <span class="kt-menu-title"> Export </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center grow gap-2.5">
                      <img
                        alt=""
                        class="rounded-full size-9 shrink-0"
                        src="/media/avatars/300-14.png"
                      />
                      <div class="flex flex-col">
                        <a
                          class="text-sm font-semibold text-mono hover:text-primary mb-px"
                          href="#"
                        >
                          Cody Fisher
                        </a>
                        <span
                          class="text-xs font-semibold text-secondary-foreground"
                        >
                          34 contributors
                        </span>
                      </div>
                    </div>
                    <div class="kt-menu" data-kt-menu="true">
                      <div
                        class="kt-menu-item"
                        data-kt-menu-item-offset="0, 10px"
                        data-kt-menu-item-placement="bottom-end"
                        data-kt-menu-item-placement-rtl="bottom-start"
                        data-kt-menu-item-toggle="dropdown"
                        data-kt-menu-item-trigger="click"
                      >
                        <button
                          class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                        >
                          <i class="ki-filled ki-dots-vertical text-lg"> </i>
                        </button>
                        <div
                          class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                          data-kt-menu-dismiss="true"
                        >
                          <div class="kt-menu-item">
                            <a class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-document"> </i>
                              </span>
                              <span class="kt-menu-title"> Details </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a
                              class="kt-menu-link"
                              data-kt-modal-toggle="#share_profile_modal"
                              href="#"
                            >
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-share"> </i>
                              </span>
                              <span class="kt-menu-title"> Share </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-file-up"> </i>
                              </span>
                              <span class="kt-menu-title"> Export </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center grow gap-2.5">
                      <img
                        alt=""
                        class="rounded-full size-9 shrink-0"
                        src="/media/avatars/300-7.png"
                      />
                      <div class="flex flex-col">
                        <a
                          class="text-sm font-semibold text-mono hover:text-primary mb-px"
                          href="#"
                        >
                          Arlene McCoy
                        </a>
                        <span
                          class="text-xs font-semibold text-secondary-foreground"
                        >
                          1 contributors
                        </span>
                      </div>
                    </div>
                    <div class="kt-menu" data-kt-menu="true">
                      <div
                        class="kt-menu-item"
                        data-kt-menu-item-offset="0, 10px"
                        data-kt-menu-item-placement="bottom-end"
                        data-kt-menu-item-placement-rtl="bottom-start"
                        data-kt-menu-item-toggle="dropdown"
                        data-kt-menu-item-trigger="click"
                      >
                        <button
                          class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                        >
                          <i class="ki-filled ki-dots-vertical text-lg"> </i>
                        </button>
                        <div
                          class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                          data-kt-menu-dismiss="true"
                        >
                          <div class="kt-menu-item">
                            <a class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-document"> </i>
                              </span>
                              <span class="kt-menu-title"> Details </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a
                              class="kt-menu-link"
                              data-kt-modal-toggle="#share_profile_modal"
                              href="#"
                            >
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-share"> </i>
                              </span>
                              <span class="kt-menu-title"> Share </span>
                            </a>
                          </div>
                          <div class="kt-menu-item">
                            <a class="kt-menu-link" href="#">
                              <span class="kt-menu-icon">
                                <i class="ki-filled ki-file-up"> </i>
                              </span>
                              <span class="kt-menu-title"> Export </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="kt-card-footer justify-center">
                <a
                  @click.prevent
                  class="kt-link kt-link-underlined kt-link-dashed"
                  href="#"
                >
                  All Contributors
                </a>
              </div>
            </div>
            <div class="kt-card">
              <div class="kt-card-header">
                <h3 class="kt-card-title">Assistance</h3>
                <div class="kt-menu" data-kt-menu="true">
                  <div
                    class="kt-menu-item"
                    data-kt-menu-item-offset="0, 10px"
                    data-kt-menu-item-placement="bottom-end"
                    data-kt-menu-item-placement-rtl="bottom-start"
                    data-kt-menu-item-toggle="dropdown"
                    data-kt-menu-item-trigger="click"
                  >
                    <button
                      class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                    >
                      <i class="ki-filled ki-dots-vertical text-lg"> </i>
                    </button>
                    <div
                      class="kt-menu-dropdown kt-menu-default w-full max-w-[200px]"
                      data-kt-menu-dismiss="true"
                    >
                      <div class="kt-menu-item">
                        <a @click.prevent class="kt-menu-link" href="#">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-setting-3"> </i>
                          </span>
                          <span class="kt-menu-title"> Settings </span>
                        </a>
                      </div>
                      <div class="kt-menu-item">
                        <a @click.prevent class="kt-menu-link" href="#">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-some-files"> </i>
                          </span>
                          <span class="kt-menu-title"> Import </span>
                        </a>
                      </div>
                      <div class="kt-menu-item">
                        <a @click.prevent class="kt-menu-link" href="#">
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-cloud-change"> </i>
                          </span>
                          <span class="kt-menu-title"> Activity </span>
                        </a>
                      </div>
                      <div class="kt-menu-item">
                        <a
                          class="kt-menu-link"
                          data-kt-modal-toggle="#report_user_modal"
                          href="#"
                        >
                          <span class="kt-menu-icon">
                            <i class="ki-filled ki-dislike"> </i>
                          </span>
                          <span class="kt-menu-title"> Report </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="kt-card-content flex justify-center items-center px-3 py-1"
              >
                <div id="contributions_chart"></div>
              </div>
            </div>
          </div>
          <!-- Projects Table -->
          <div class="kt-card">
            <div class="kt-card-header">
              <h3 class="kt-card-title">Projects</h3>
              <div class="kt-menu" data-kt-menu="true">
                <div
                  class="kt-menu-item"
                  data-kt-menu-item-offset="0, 10px"
                  data-kt-menu-item-placement="bottom-end"
                  data-kt-menu-item-placement-rtl="bottom-start"
                  data-kt-menu-item-toggle="dropdown"
                  data-kt-menu-item-trigger="click"
                >
                  <button
                    class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                  >
                    <i class="ki-filled ki-dots-vertical text-lg"> </i>
                  </button>
                  <div
                    class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                    data-kt-menu-dismiss="true"
                  >
                    <div class="kt-menu-item">
                      <a @click.prevent class="kt-menu-link" href="#">
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-add-files"> </i>
                        </span>
                        <span class="kt-menu-title"> Add </span>
                      </a>
                    </div>
                    <div class="kt-menu-item">
                      <a @click.prevent class="kt-menu-link" href="#">
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-file-down"> </i>
                        </span>
                        <span class="kt-menu-title"> Import </span>
                      </a>
                    </div>
                    <div
                      class="kt-menu-item"
                      data-kt-menu-item-offset="-15px, 0"
                      data-kt-menu-item-placement="right-start"
                      data-kt-menu-item-toggle="dropdown"
                      data-kt-menu-item-trigger="click|lg:hover"
                    >
                      <div class="kt-menu-link">
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-file-up"> </i>
                        </span>
                        <span class="kt-menu-title"> Export </span>
                        <span class="kt-menu-arrow">
                          <i
                            class="ki-filled ki-right text-xs rtl:transform rtl:rotate-180"
                          >
                          </i>
                        </span>
                      </div>
                      <div
                        class="kt-menu-dropdown kt-menu-default w-full max-w-[125px]"
                      >
                        <div class="kt-menu-item">
                          <a @click.prevent class="kt-menu-link" href="#">
                            <span class="kt-menu-title"> PDF </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a @click.prevent class="kt-menu-link" href="#">
                            <span class="kt-menu-title"> CVS </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a @click.prevent class="kt-menu-link" href="#">
                            <span class="kt-menu-title"> Excel </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="kt-menu-item">
                      <a @click.prevent class="kt-menu-link" href="#">
                        <span class="kt-menu-icon">
                          <i class="ki-filled ki-setting-3"> </i>
                        </span>
                        <span class="kt-menu-title"> Settings </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kt-card-table kt-scrollable-x-auto">
              <table class="kt-table table-fixed">
                <thead>
                  <tr>
                    <th class="text-start w-52">Project Name</th>
                    <th class="w-56 text-end">Progress</th>
                    <th class="w-36 text-end">People</th>
                    <th class="w-36 text-end">Due Date</th>
                    <th class="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-start">
                      <a
                        class="text-sm font-medium text-mono hover:text-primary"
                        href="#"
                      >
                        Acme software development
                      </a>
                    </td>
                    <td>
                      <div class="kt-progress kt-progress-primary h-[4px]">
                        <div
                          class="kt-progress-indicator"
                          style="width: 60%"
                        ></div>
                      </div>
                    </td>
                    <td>
                      <div class="flex justify-end rtl:justify-start shrink-0">
                        <div class="flex -space-x-2">
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-4.png"
                            />
                          </div>
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-1.png"
                            />
                          </div>
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-2.png"
                            />
                          </div>
                          <div class="flex">
                            <span
                              class="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-6 text-white ring-background bg-green-500"
                            >
                              +3
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="text-sm font-medium text-secondary-foreground text-end"
                    >
                      24 Aug, 2024
                    </td>
                    <td class="text-start">
                      <div class="kt-menu" data-kt-menu="true">
                        <div
                          class="kt-menu-item"
                          data-kt-menu-item-offset="0, 10px"
                          data-kt-menu-item-placement="bottom-end"
                          data-kt-menu-item-placement-rtl="bottom-start"
                          data-kt-menu-item-toggle="dropdown"
                          data-kt-menu-item-trigger="click"
                        >
                          <button
                            class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                          >
                            <i class="ki-filled ki-dots-vertical text-lg"> </i>
                          </button>
                          <div
                            class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                            data-kt-menu-dismiss="true"
                          >
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-search-list"> </i>
                                </span>
                                <span class="kt-menu-title"> View </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-file-up"> </i>
                                </span>
                                <span class="kt-menu-title"> Export </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-pencil"> </i>
                                </span>
                                <span class="kt-menu-title"> Edit </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-copy"> </i>
                                </span>
                                <span class="kt-menu-title"> Make a copy </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-trash"> </i>
                                </span>
                                <span class="kt-menu-title"> Remove </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">
                      <a
                        class="text-sm font-medium text-mono hover:text-primary"
                        href="#"
                      >
                        Strategic Partnership Deal
                      </a>
                    </td>
                    <td>
                      <div class="kt-progress h-[4px]">
                        <div
                          class="kt-progress-indicator"
                          style="width: 100%"
                        ></div>
                      </div>
                    </td>
                    <td>
                      <div class="flex justify-end rtl:justify-start shrink-0">
                        <div class="flex -space-x-2">
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-1.png"
                            />
                          </div>
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-2.png"
                            />
                          </div>
                          <div class="flex">
                            <span
                              class="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-6 text-white ring-background bg-destructive"
                            >
                              M
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="text-sm font-medium text-secondary-foreground text-end"
                    >
                      10 Sep, 2024
                    </td>
                    <td class="text-start">
                      <div class="kt-menu" data-kt-menu="true">
                        <div
                          class="kt-menu-item"
                          data-kt-menu-item-offset="0, 10px"
                          data-kt-menu-item-placement="bottom-end"
                          data-kt-menu-item-placement-rtl="bottom-start"
                          data-kt-menu-item-toggle="dropdown"
                          data-kt-menu-item-trigger="click"
                        >
                          <button
                            class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                          >
                            <i class="ki-filled ki-dots-vertical text-lg"> </i>
                          </button>
                          <div
                            class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                            data-kt-menu-dismiss="true"
                          >
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-search-list"> </i>
                                </span>
                                <span class="kt-menu-title"> View </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-file-up"> </i>
                                </span>
                                <span class="kt-menu-title"> Export </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-pencil"> </i>
                                </span>
                                <span class="kt-menu-title"> Edit </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-copy"> </i>
                                </span>
                                <span class="kt-menu-title"> Make a copy </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-trash"> </i>
                                </span>
                                <span class="kt-menu-title"> Remove </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">
                      <a
                        class="text-sm font-medium text-mono hover:text-primary"
                        href="#"
                      >
                        Client Onboarding
                      </a>
                    </td>
                    <td>
                      <div class="kt-progress kt-progress-primary h-[4px]">
                        <div
                          class="kt-progress-indicator"
                          style="width: 20%"
                        ></div>
                      </div>
                    </td>
                    <td>
                      <div class="flex justify-end rtl:justify-start shrink-0">
                        <div class="flex -space-x-2">
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-20.png"
                            />
                          </div>
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-7.png"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="text-sm font-medium text-secondary-foreground text-end"
                    >
                      19 Sep, 2024
                    </td>
                    <td class="text-start">
                      <div class="kt-menu" data-kt-menu="true">
                        <div
                          class="kt-menu-item"
                          data-kt-menu-item-offset="0, 10px"
                          data-kt-menu-item-placement="bottom-end"
                          data-kt-menu-item-placement-rtl="bottom-start"
                          data-kt-menu-item-toggle="dropdown"
                          data-kt-menu-item-trigger="click"
                        >
                          <button
                            class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                          >
                            <i class="ki-filled ki-dots-vertical text-lg"> </i>
                          </button>
                          <div
                            class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                            data-kt-menu-dismiss="true"
                          >
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-search-list"> </i>
                                </span>
                                <span class="kt-menu-title"> View </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-file-up"> </i>
                                </span>
                                <span class="kt-menu-title"> Export </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-pencil"> </i>
                                </span>
                                <span class="kt-menu-title"> Edit </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-copy"> </i>
                                </span>
                                <span class="kt-menu-title"> Make a copy </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-trash"> </i>
                                </span>
                                <span class="kt-menu-title"> Remove </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">
                      <a
                        class="text-sm font-medium text-mono hover:text-primary"
                        href="#"
                      >
                        Widget Supply Agreement
                      </a>
                    </td>
                    <td>
                      <div class="kt-progress kt-progress-success h-[4px]">
                        <div
                          class="kt-progress-indicator"
                          style="width: 100%"
                        ></div>
                      </div>
                    </td>
                    <td>
                      <div class="flex justify-end rtl:justify-start shrink-0">
                        <div class="flex -space-x-2">
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-6.png"
                            />
                          </div>
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-23.png"
                            />
                          </div>
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-12.png"
                            />
                          </div>
                          <div class="flex">
                            <span
                              class="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-6 text-primary-foreground ring-background bg-primary"
                            >
                              +1
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="text-sm font-medium text-secondary-foreground text-end"
                    >
                      5 May, 2024
                    </td>
                    <td class="text-start">
                      <div class="kt-menu" data-kt-menu="true">
                        <div
                          class="kt-menu-item"
                          data-kt-menu-item-offset="0, 10px"
                          data-kt-menu-item-placement="bottom-end"
                          data-kt-menu-item-placement-rtl="bottom-start"
                          data-kt-menu-item-toggle="dropdown"
                          data-kt-menu-item-trigger="click"
                        >
                          <button
                            class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                          >
                            <i class="ki-filled ki-dots-vertical text-lg"> </i>
                          </button>
                          <div
                            class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                            data-kt-menu-dismiss="true"
                          >
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-search-list"> </i>
                                </span>
                                <span class="kt-menu-title"> View </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-file-up"> </i>
                                </span>
                                <span class="kt-menu-title"> Export </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-pencil"> </i>
                                </span>
                                <span class="kt-menu-title"> Edit </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-copy"> </i>
                                </span>
                                <span class="kt-menu-title"> Make a copy </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-trash"> </i>
                                </span>
                                <span class="kt-menu-title"> Remove </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">
                      <a
                        class="text-sm font-medium text-mono hover:text-primary"
                        href="#"
                      >
                        Project X Redesign
                      </a>
                    </td>
                    <td>
                      <div class="kt-progress kt-progress-primary h-[4px]">
                        <div
                          class="kt-progress-indicator"
                          style="width: 80%"
                        ></div>
                      </div>
                    </td>
                    <td>
                      <div class="flex justify-end rtl:justify-start shrink-0">
                        <div class="flex -space-x-2">
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-2.png"
                            />
                          </div>
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-15.png"
                            />
                          </div>
                          <div class="flex">
                            <img
                              class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                              src="/media/avatars/300-18.png"
                            />
                          </div>
                          <div class="flex">
                            <span
                              class="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-6 text-white ring-background bg-green-500"
                            >
                              +2
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="text-sm font-medium text-secondary-foreground text-end"
                    >
                      1 Feb, 2025
                    </td>
                    <td class="text-start">
                      <div class="kt-menu" data-kt-menu="true">
                        <div
                          class="kt-menu-item"
                          data-kt-menu-item-offset="0, 10px"
                          data-kt-menu-item-placement="bottom-end"
                          data-kt-menu-item-placement-rtl="bottom-start"
                          data-kt-menu-item-toggle="dropdown"
                          data-kt-menu-item-trigger="click"
                        >
                          <button
                            class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                          >
                            <i class="ki-filled ki-dots-vertical text-lg"> </i>
                          </button>
                          <div
                            class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                            data-kt-menu-dismiss="true"
                          >
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-search-list"> </i>
                                </span>
                                <span class="kt-menu-title"> View </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-file-up"> </i>
                                </span>
                                <span class="kt-menu-title"> Export </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-pencil"> </i>
                                </span>
                                <span class="kt-menu-title"> Edit </span>
                              </a>
                            </div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-copy"> </i>
                                </span>
                                <span class="kt-menu-title"> Make a copy </span>
                              </a>
                            </div>
                            <div class="kt-menu-separator"></div>
                            <div class="kt-menu-item">
                              <a class="kt-menu-link" href="#">
                                <span class="kt-menu-icon">
                                  <i class="ki-filled ki-trash"> </i>
                                </span>
                                <span class="kt-menu-title"> Remove </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="kt-card-footer justify-center">
              <a
                @click.prevent
                class="kt-link kt-link-underlined kt-link-dashed"
                href="#"
              >
                All Projects
              </a>
            </div>
          </div>
          <!-- End of Projects Table -->
        </div>
      </div>
    </div>
    <!-- end: grid -->
  </div>
  <!-- End of Container -->
</template>

<style scoped>
.hero-bg {
  background-image: url("/media/images/2600x1200/bg-1.png");
}
.dark .hero-bg {
  background-image: url("/media/images/2600x1200/bg-1-dark.png");
}
</style>
