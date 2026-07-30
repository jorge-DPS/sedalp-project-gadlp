<template>
  <!-- Toolbar -->
  <div class="pb-5">
    <!-- Container -->
    <div
      class="kt-container-fixed flex items-center justify-between flex-wrap gap-3"
    >
      <div class="flex flex-col flex-wrap gap-1">
        <h1 class="font-medium text-lg text-mono"></h1>
        <div class="flex items-center gap-1 text-sm font-normal">
          <RouterLink
            class="text-secondary-foreground hover:text-primary"
            to="/"
          >
            Home
          </RouterLink>
        </div>
      </div>
      <div class="flex items-center flex-wrap gap-1.5 lg:gap-2.5">
        <a class="kt-btn kt-btn-outline" href="#" @click.prevent>
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
  <!-- Container -->
  <div class="kt-container-fixed">
    <div class="grid gap-5 lg:gap-7.5">
      <!-- begin: grid -->
      <div class="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div class="lg:col-span-2">
          <div class="kt-card h-full">
            <div
              class="kt-card-content flex flex-col place-content-center gap-5"
            >
              <div class="flex justify-center">
                <img
                  alt="image"
                  class="dark:hidden max-h-[180px]"
                  src="/media/illustrations/32.svg"
                />
                <img
                  alt="image"
                  class="light:hidden max-h-[180px]"
                  src="/media/illustrations/32-dark.svg"
                />
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-3 text-center">
                  <h2 class="text-xl font-semibold text-mono">
                    JORGE
                    Swift Setup for New Teams
                  </h2>
                  <p class="text-sm font-medium text-secondary-foreground">
                    Enhance team formation and management with easy-to-use tools
                    for communication,
                    <br />
                    task organization, and progress tracking, all in one place.
                  </p>
                </div>
                <div class="flex justify-center">
                  <a class="kt-btn kt-btn-primary" href="#" @click.prevent>
                    Create Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="kt-card h-full">
            <div class="kt-card-header">
              <h3 class="kt-card-title">Highlights</h3>
              <div class="kt-menu" data-kt-menu="true">
                <div
                  class="kt-menu-item"
                  data-kt-menu-item-offset="0, 10px"
                  data-kt-menu-item-placement="bottom-start"
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
                      <a class="kt-menu-link" href="#" @click.prevent>
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
                          <a class="kt-menu-link" href="#" @click.prevent>
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-sms"> </i>
                            </span>
                            <span class="kt-menu-title"> Email </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#" @click.prevent>
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-message-notify"> </i>
                            </span>
                            <span class="kt-menu-title"> SMS </span>
                          </a>
                        </div>
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#" @click.prevent>
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
                      <a class="kt-menu-link" href="#" @click.prevent>
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
            <div
              class="kt-card-content flex flex-col gap-4 p-5 lg:p-7.5 lg:pt-4"
            >
              <div class="flex flex-col gap-0.5">
                <span class="text-sm font-normal text-secondary-foreground">
                  All time sales
                </span>
                <div class="flex items-center gap-2.5">
                  <span class="text-3xl font-semibold text-mono">
                    $295.7k
                  </span>
                  <span
                    class="kt-badge kt-badge-outline kt-badge-success kt-badge-sm"
                  >
                    +2.7%
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-1 mb-1.5">
                <div
                  class="bg-green-500 h-2 w-full max-w-[60%] rounded-xs"
                ></div>
                <div
                  class="bg-destructive h-2 w-full max-w-[25%] rounded-xs"
                ></div>
                <div
                  class="bg-violet-500 h-2 w-full max-w-[15%] rounded-xs"
                ></div>
              </div>
              <div class="flex items-center flex-wrap gap-4 mb-1">
                <div class="flex items-center gap-1.5">
                  <span
                    class="rounded-full size-2 kt-badge-success"
                  >
                  </span>
                  <span class="text-sm font-normal text-foreground">
                    Metronic
                  </span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span
                    class="rounded-full size-2 kt-badge-destructive"
                  >
                  </span>
                  <span class="text-sm font-normal text-foreground">
                    Bundle
                  </span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="rounded-full size-2 kt-badge-info">
                  </span>
                  <span class="text-sm font-normal text-foreground">
                    MetronicNest
                  </span>
                </div>
              </div>
              <div class="border-b border-input"></div>
              <div class="grid gap-3">
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div class="flex items-center gap-1.5">
                    <i
                      class="ki-filled ki-shop text-base text-muted-foreground"
                    >
                    </i>
                    <span class="text-sm font-normal text-mono">
                      Online Store
                    </span>
                  </div>
                  <div
                    class="flex items-center text-sm font-medium text-foreground gap-6"
                  >
                    <span class="lg:text-right"> $172k </span>
                    <span class="lg:text-right">
                      <i class="ki-filled ki-arrow-up text-green-500"> </i>
                      3.9%
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div class="flex items-center gap-1.5">
                    <i
                      class="ki-filled ki-facebook text-base text-muted-foreground"
                    >
                    </i>
                    <span class="text-sm font-normal text-mono">
                      Facebook
                    </span>
                  </div>
                  <div
                    class="flex items-center text-sm font-medium text-foreground gap-6"
                  >
                    <span class="lg:text-right"> $85k </span>
                    <span class="lg:text-right">
                      <i class="ki-filled ki-arrow-down text-destructive"> </i>
                      0.7%
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div class="flex items-center gap-1.5">
                    <i
                      class="ki-filled ki-instagram text-base text-muted-foreground"
                    >
                    </i>
                    <span class="text-sm font-normal text-mono">
                      Instagram
                    </span>
                  </div>
                  <div
                    class="flex items-center text-sm font-medium text-foreground gap-6"
                  >
                    <span class="lg:text-right"> $36k </span>
                    <span class="lg:text-right">
                      <i class="ki-filled ki-arrow-up text-green-500"> </i>
                      8.2%
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div class="flex items-center gap-1.5">
                    <i
                      class="ki-filled ki-google text-base text-muted-foreground"
                    >
                    </i>
                    <span class="text-sm font-normal text-mono"> Google </span>
                  </div>
                  <div
                    class="flex items-center text-sm font-medium text-foreground gap-6"
                  >
                    <span class="lg:text-right"> $26k </span>
                    <span class="lg:text-right">
                      <i class="ki-filled ki-arrow-up text-green-500"> </i>
                      8.2%
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div class="flex items-center gap-1.5">
                    <i
                      class="ki-filled ki-shop text-base text-muted-foreground"
                    >
                    </i>
                    <span class="text-sm font-normal text-mono"> Retail </span>
                  </div>
                  <div
                    class="flex items-center text-sm font-medium text-foreground gap-6"
                  >
                    <span class="lg:text-right"> $7k </span>
                    <span class="lg:text-right">
                      <i class="ki-filled ki-arrow-down text-destructive"> </i>
                      0.7%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end: grid -->
      <!-- begin: grid -->
      <div class="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div class="lg:col-span-2">
          <div class="grid">
            <div class="kt-card kt-card-grid h-full min-w-full">
              <div class="kt-card-header">
                <h3 class="kt-card-title">Teams</h3>
                <div class="kt-input max-w-48">
                  <i class="ki-filled ki-magnifier"> </i>
                  <input
                    data-kt-datatable-search="#kt_datatable_1"
                    placeholder="Search Teams"
                    type="text"
                  />
                </div>
              </div>
              <div class="kt-card-table">
                <div
                  class="grid"
                  data-kt-datatable="true"
                  data-kt-datatable-page-size="5"
                  id="teams_datatable"
                >
                  <div class="kt-scrollable-x-auto">
                    <table
                      class="kt-table kt-table-border table-fixed"
                      data-kt-datatable-table="true"
                      id="kt_datatable_1"
                    >
                      <thead>
                        <tr>
                          <th class="w-[50px]">
                            <input
                              class="kt-checkbox kt-checkbox-sm"
                              data-kt-datatable-check="true"
                              type="checkbox"
                            />
                          </th>
                          <th class="w-[280px]">
                            <span class="kt-table-col">
                              <span class="kt-table-col-label"> Team </span>
                              <span class="kt-table-col-sort"> </span>
                            </span>
                          </th>
                          <th class="w-[125px]">
                            <span class="kt-table-col">
                              <span class="kt-table-col-label"> Rating </span>
                              <span class="kt-table-col-sort"> </span>
                            </span>
                          </th>
                          <th class="w-[135px]">
                            <span class="kt-table-col">
                              <span class="kt-table-col-label">
                                Last Modified
                              </span>
                              <span class="kt-table-col-sort"> </span>
                            </span>
                          </th>
                          <th class="w-[125px]">
                            <span class="kt-table-col">
                              <span class="kt-table-col-label"> Members </span>
                              <span class="kt-table-col-sort"> </span>
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              class="kt-checkbox kt-checkbox-sm"
                              data-kt-datatable-row-check="true"
                              type="checkbox"
                              value="1"
                            />
                          </td>
                          <td>
                            <div class="flex flex-col gap-2">
                              <a
                                class="leading-none font-medium text-sm text-mono hover:text-primary"
                                href="#"
                              >
                                Product Management
                              </a>
                              <span
                                class="text-2sm text-secondary-foreground font-normal leading-3"
                              >
                                Product development & lifecycle
                              </span>
                            </div>
                          </td>
                          <td>
                            <div class="kt-rating">
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                            </div>
                          </td>
                          <td>21 Oct, 2024</td>
                          <td>
                            <div class="flex -space-x-2">
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-4.png"
                                />
                              </div>
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-1.png"
                                />
                              </div>
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-2.png"
                                />
                              </div>
                              <div class="flex">
                                <span
                                  class="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-[30px] text-white ring-background bg-green-500"
                                >
                                  +10
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              class="kt-checkbox kt-checkbox-sm"
                              data-kt-datatable-row-check="true"
                              type="checkbox"
                              value="2"
                            />
                          </td>
                          <td>
                            <div class="flex flex-col gap-2">
                              <a
                                class="leading-none font-medium text-sm text-mono hover:text-primary"
                                href="#"
                              >
                                Marketing Team
                              </a>
                              <span
                                class="text-2sm text-secondary-foreground font-normal leading-3"
                              >
                                Campaigns & market analysis
                              </span>
                            </div>
                          </td>
                          <td>
                            <div class="kt-rating">
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label indeterminate">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                  style="width: 50%"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                            </div>
                          </td>
                          <td>15 Oct, 2024</td>
                          <td>
                            <div class="flex -space-x-2">
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-4.png"
                                />
                              </div>
                              <div class="flex">
                                <span
                                  class="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-[30px] uppercase text-white ring-background bg-yellow-500"
                                >
                                  g
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              class="kt-checkbox kt-checkbox-sm"
                              data-kt-datatable-row-check="true"
                              type="checkbox"
                              value="3"
                            />
                          </td>
                          <td>
                            <div class="flex flex-col gap-2">
                              <a
                                class="leading-none font-medium text-sm text-mono hover:text-primary"
                                href="#"
                              >
                                HR Department
                              </a>
                              <span
                                class="text-2sm text-secondary-foreground font-normal leading-3"
                              >
                                Talent acquisition, employee welfare
                              </span>
                            </div>
                          </td>
                          <td>
                            <div class="kt-rating">
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                            </div>
                          </td>
                          <td>10 Oct, 2024</td>
                          <td>
                            <div class="flex -space-x-2">
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-4.png"
                                />
                              </div>
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-1.png"
                                />
                              </div>
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-2.png"
                                />
                              </div>
                              <div class="flex">
                                <span
                                  class="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-[30px] text-white ring-background bg-violet-500"
                                >
                                  +A
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              class="kt-checkbox kt-checkbox-sm"
                              data-kt-datatable-row-check="true"
                              type="checkbox"
                              value="4"
                            />
                          </td>
                          <td>
                            <div class="flex flex-col gap-2">
                              <a
                                class="leading-none font-medium text-sm text-mono hover:text-primary"
                                href="#"
                              >
                                Sales Division
                              </a>
                              <span
                                class="text-2sm text-secondary-foreground font-normal leading-3"
                              >
                                Customer relations, sales strategy
                              </span>
                            </div>
                          </td>
                          <td>
                            <div class="kt-rating">
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                              <div class="kt-rating-label checked">
                                <i
                                  class="kt-rating-on ki-solid ki-star text-base leading-none"
                                >
                                </i>
                                <i
                                  class="kt-rating-off ki-outline ki-star text-base leading-none"
                                >
                                </i>
                              </div>
                            </div>
                          </td>
                          <td>05 Oct, 2024</td>
                          <td>
                            <div class="flex -space-x-2">
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-24.png"
                                />
                              </div>
                              <div class="flex">
                                <img
                                  class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-[30px]"
                                  src="/media/avatars/300-7.png"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="kt-card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-secondary-foreground text-sm font-medium"
                  >
                    <div class="flex items-center gap-2 order-2 md:order-1">
                      Show
                      <select
                        class="kt-select w-16"
                        data-kt-datatable-size="true"
                        data-kt-select=""
                        name="perpage"
                      ></select>
                      per page
                    </div>
                    <div class="flex items-center gap-4 order-1 md:order-2">
                      <span data-kt-datatable-info="true"> </span>
                      <div
                        class="kt-datatable-pagination"
                        data-kt-datatable-pagination="true"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="kt-card h-full">
            <div class="kt-card-header">
              <h3 class="kt-card-title">Block List</h3>
            </div>
            <div class="kt-card-content flex flex-col gap-5">
              <div class="text-sm text-foreground">
                Users on the block list are unable to send chat requests or
                messages to you anymore, ever, or again
              </div>
              <div class="kt-input-group">
                <input
                  class="kt-input"
                  placeholder="Block new user"
                  type="text"
                  value=""
                />
                <span class="kt-btn kt-btn-primary"> Add </span>
              </div>
              <div class="flex flex-col gap-5">
                <div class="flex items-center justify-between gap-2.5">
                  <div class="flex items-center gap-2.5">
                    <div class="">
                      <img
                        class="h-9 rounded-full"
                        src="/media/avatars/gray/1.png"
                      />
                    </div>
                    <div class="flex flex-col gap-0.5">
                      <a
                        class="flex items-center gap-1.5 leading-none font-medium text-sm text-mono hover:text-primary"
                        href="#"
                        @click.prevent
                      >
                        Esther Howard
                      </a>
                      <span class="text-sm text-secondary-foreground">
                        6 commits
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2.5">
                    <a class="kt-btn kt-btn-icon kt-btn-ghost" href="#">
                      <i class="ki-filled ki-trash"> </i>
                    </a>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-2.5">
                  <div class="flex items-center gap-2.5">
                    <div class="">
                      <img
                        class="h-9 rounded-full"
                        src="/media/avatars/gray/2.png"
                      />
                    </div>
                    <div class="flex flex-col gap-0.5">
                      <a
                        class="flex items-center gap-1.5 leading-none font-medium text-sm text-mono hover:text-primary"
                        href="#"
                        @click.prevent
                      >
                        Tyler Hero
                      </a>
                      <span class="text-sm text-secondary-foreground">
                        29 commits
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2.5">
                    <a class="kt-btn kt-btn-icon kt-btn-ghost" href="#">
                      <i class="ki-filled ki-trash"> </i>
                    </a>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-2.5">
                  <div class="flex items-center gap-2.5">
                    <div class="">
                      <img
                        class="h-9 rounded-full"
                        src="/media/avatars/gray/3.png"
                      />
                    </div>
                    <div class="flex flex-col gap-0.5">
                      <a
                        class="flex items-center gap-1.5 leading-none font-medium text-sm text-mono hover:text-primary"
                        href="#"
                        @click.prevent
                      >
                        Arlene McCoy
                      </a>
                      <span class="text-sm text-secondary-foreground">
                        34 commits
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2.5">
                    <a class="kt-btn kt-btn-icon kt-btn-ghost" href="#">
                      <i class="ki-filled ki-trash"> </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end: grid -->
    </div>
  </div>
  <!-- End of Container -->
</template>
