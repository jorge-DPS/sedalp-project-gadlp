<script setup>
import { ref } from "vue";

const months = [
  "January, 2024",
  "February, 2024",
  "March, 2024",
  "April, 2024",
  "May, 2024",
  "June, 2024",
  "July, 2024",
  "August, 2024",
  "September, 2024",
  "October, 2024",
  "November, 2024",
  "December, 2024",
];

const selectedMonth = ref("September, 2024");

const integrations = ref([
  {
    name: "Jira",
    logo: "/media/brand-logos/jira.svg",
    description:
      "Project management for agile teams, tracking issues and tasks.",
    connected: true,
  },
  {
    name: "Inferno",
    logo: "/media/brand-logos/inferno.svg",
    description: "Ensures healthcare app compatibility with FHIR standards.",
    connected: false,
  },
  {
    name: "Evernote",
    logo: "/media/brand-logos/evernote.svg",
    description: "Organizes personal and professional documents, ideas, tasks.",
    connected: true,
  },
  {
    name: "Gitlab",
    logo: "/media/brand-logos/gitlab.svg",
    description: "DevOps platform for code control, project management, CI/CD.",
    connected: true,
  },
  {
    name: "Google webdev",
    logo: "/media/brand-logos/google-webdev.svg",
    description:
      "Tools for building quality web experiences, focusing on performance.",
    connected: true,
  },
  {
    name: "Invision",
    logo: "/media/brand-logos/invision.svg",
    description: "Digital design platform for prototyping and design workflow.",
    connected: false,
  },
  {
    name: "Duolingo",
    logo: "/media/brand-logos/duolingo.svg",
    description: "Interactive exercises for fun, effective language learning.",
    connected: false,
  },
  {
    name: "Google Analytics",
    logo: "/media/brand-logos/google-analytics-2.svg",
    description: "Insights into website traffic and marketing effectiveness.",
    connected: false,
  },
]);

const faqAnswer =
  "Metronic embraces flexible licensing options that empower you to choose the perfect fit for your project's needs and budget. Understanding the factors influencing each plan's pricing helps you make an informed decision.";

const faqs = [
  {
    question: "How is pricing determined for each plan?",
    answer: faqAnswer,
  },
  {
    question: "What payment methods are accepted for subscriptions?",
    answer: faqAnswer,
  },
  {
    question: "Are there any hidden fees in the pricing?",
    answer: faqAnswer,
  },
  {
    question: "Is there a discount for annual subscriptions?",
    answer: faqAnswer,
  },
  {
    question: "Do you offer refunds on subscription cancellations?",
    answer: faqAnswer,
  },
  {
    question: "Can I add extra features to my current plan?",
    answer: faqAnswer,
  },
];

function toggleIntegration(integration) {
  integration.connected = !integration.connected;
}
</script>

<template>
  <!-- Toolbar -->
  <div class="pb-5">
    <div
      class="kt-container-fixed flex items-center justify-between flex-wrap gap-3"
    >
      <div class="flex flex-col flex-wrap gap-1">
        <h1 class="font-medium text-lg text-mono">Integrations</h1>

        <div class="flex items-center gap-1 text-sm font-normal">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="text-secondary-foreground hover:text-primary"
          >
            Home
          </RouterLink>

          <span class="text-muted-foreground text-sm">/</span>
          <span class="text-secondary-foreground">My Account</span>
          <span class="text-muted-foreground text-sm">/</span>
          <span class="text-mono">Integrations</span>
        </div>
      </div>

      <div class="flex items-center flex-wrap gap-1.5 lg:gap-2.5">
        <button type="button" class="kt-btn kt-btn-outline">
          <i class="ki-filled ki-exit-down"></i>
          Export
        </button>

        <div class="kt-menu kt-menu-default" data-kt-menu="true">
          <div
            class="kt-menu-item"
            data-kt-menu-item-offset="0, 0"
            data-kt-menu-item-placement="bottom-end"
            data-kt-menu-item-toggle="dropdown"
            data-kt-menu-item-trigger="hover"
          >
            <button
              type="button"
              class="kt-menu-toggle kt-btn kt-btn-outline flex-nowrap"
            >
              <span class="flex items-center me-1">
                <i class="ki-filled ki-calendar text-base!"></i>
              </span>

              <span class="hidden md:inline text-nowrap">
                {{ selectedMonth }}
              </span>

              <span class="inline md:hidden text-nowrap">
                {{ selectedMonth.slice(0, 3) }}, {{ selectedMonth.slice(-4) }}
              </span>

              <span class="flex items-center lg:ms-4">
                <i class="ki-filled ki-down text-xs!"></i>
              </span>
            </button>

            <div
              class="kt-menu-dropdown w-48 py-2 kt-scrollable-y max-h-[250px]"
            >
              <div
                v-for="month in months"
                :key="month"
                class="kt-menu-item"
                :class="{ active: selectedMonth === month }"
              >
                <button
                  type="button"
                  class="kt-menu-link w-full"
                  @click="selectedMonth = month"
                >
                  <span class="kt-menu-title">{{ month }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End toolbar -->

  <div class="kt-container-fixed">
    <div class="grid gap-5 lg:gap-7.5">
      <div id="integrations_cards">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5"
        >
          <div
            v-for="integration in integrations"
            :key="integration.name"
            class="kt-card"
          >
            <div class="kt-card-content p-5 lg:p-7.5">
              <div class="flex items-center justify-between mb-3 lg:mb-5">
                <div class="flex items-center justify-center">
                  <img
                    :alt="integration.name"
                    class="h-11 shrink-0"
                    :src="integration.logo"
                  />
                </div>

                <button
                  type="button"
                  class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                  :aria-label="`Open ${integration.name}`"
                >
                  <i class="ki-filled ki-exit-right-corner"></i>
                </button>
              </div>

              <div class="flex flex-col gap-1 lg:gap-2.5">
                <button
                  type="button"
                  class="text-left text-base font-semibold text-mono hover:text-primary"
                >
                  {{ integration.name }}
                </button>

                <span class="text-sm text-secondary-foreground">
                  {{ integration.description }}
                </span>
              </div>
            </div>

            <div class="kt-card-footer justify-between items-center py-3.5">
              <button
                type="button"
                class="kt-btn kt-btn-outline"
                @click="toggleIntegration(integration)"
              >
                <i class="ki-filled ki-mouse-square"></i>
                {{ integration.connected ? "Disconnect" : "Connect" }}
              </button>

              <div class="flex items-center gap-2.5">
                <input
                  v-model="integration.connected"
                  class="kt-switch"
                  type="checkbox"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="kt-card">
        <div class="kt-card-content flex flex-col items-center gap-2.5 py-7.5">
          <div class="flex justify-center p-7.5 py-9">
            <img
              alt="Add new integration"
              class="dark:hidden max-h-[230px]"
              src="/media/illustrations/28.svg"
            />
            <img
              alt="Add new integration"
              class="light:hidden max-h-[230px]"
              src="/media/illustrations/28-dark.svg"
            />
          </div>

          <div class="flex flex-col gap-5 lg:gap-7.5">
            <div class="flex flex-col gap-3 text-center">
              <h2 class="text-xl font-semibold text-mono">
                Add New Integration
              </h2>
              <p class="text-sm text-foreground">
                Explore new integrations and expand your toolkit with efficient,
                user-friendly solutions.
              </p>
            </div>

            <div class="flex justify-center mb-5">
              <button type="button" class="kt-btn kt-btn-primary">
                Start Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="kt-card">
        <div class="kt-card-header">
          <h3 class="kt-card-title">FAQ</h3>
        </div>

        <div class="kt-card-content py-3">
          <div data-kt-accordion="true" data-kt-accordion-expand-all="true">
            <div
              v-for="(faq, index) in faqs"
              :key="faq.question"
              class="kt-accordion-item not-last:border-b border-b-border"
              data-kt-accordion-item="true"
            >
              <button
                type="button"
                class="kt-accordion-toggle py-4"
                :aria-controls="`faq_${index + 1}_content`"
                :data-kt-accordion-toggle="`#faq_${index + 1}_content`"
              >
                <span class="text-base text-mono">
                  {{ faq.question }}
                </span>

                <span class="kt-accordion-active:hidden inline-flex">
                  <i
                    class="ki-filled ki-plus text-muted-foreground text-sm"
                  ></i>
                </span>

                <span class="kt-accordion-active:inline-flex hidden">
                  <i
                    class="ki-filled ki-minus text-muted-foreground text-sm"
                  ></i>
                </span>
              </button>

              <div
                :id="`faq_${index + 1}_content`"
                class="kt-accordion-content hidden"
              >
                <div class="text-secondary-foreground text-base pb-4">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-5 lg:gap-7.5">
        <div class="kt-card">
          <div class="kt-card-content px-10 py-7.5 lg:pr-12.5">
            <div
              class="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10"
            >
              <div class="flex flex-col items-start gap-3">
                <h2 class="text-xl font-medium text-mono">Questions?</h2>
                <p class="text-sm text-foreground leading-5.5 mb-2.5">
                  Visit our Help Center for detailed assistance on billing,
                  payments, and subscriptions.
                </p>
              </div>

              <img
                alt="Help center"
                class="dark:hidden max-h-[150px]"
                src="/media/illustrations/29.svg"
              />
              <img
                alt="Help center"
                class="light:hidden max-h-[150px]"
                src="/media/illustrations/29-dark.svg"
              />
            </div>
          </div>

          <div class="kt-card-footer justify-center">
            <button
              type="button"
              class="kt-link kt-link-underlined kt-link-dashed"
            >
              Go to Help Center
            </button>
          </div>
        </div>

        <div class="kt-card">
          <div class="kt-card-content px-10 py-7.5 lg:pr-12.5">
            <div
              class="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10"
            >
              <div class="flex flex-col items-start gap-3">
                <h2 class="text-xl font-medium text-mono">Contact Support</h2>
                <p class="text-sm text-foreground leading-5.5 mb-2.5">
                  Need assistance? Contact our support team for prompt,
                  personalized help with your questions and concerns.
                </p>
              </div>

              <img
                alt="Contact support"
                class="dark:hidden max-h-[150px]"
                src="/media/illustrations/31.svg"
              />
              <img
                alt="Contact support"
                class="light:hidden max-h-[150px]"
                src="/media/illustrations/31-dark.svg"
              />
            </div>
          </div>

          <div class="kt-card-footer justify-center">
            <a
              class="kt-link kt-link-underlined kt-link-dashed"
              href="https://devs.keenthemes.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
