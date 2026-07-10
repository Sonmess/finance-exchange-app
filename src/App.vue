<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import AsOfDate from '@/components/atoms/AsOfDate.vue'
import LoadingSkeleton from '@/components/atoms/LoadingSkeleton.vue'
import LanguageToggle from '@/components/molecules/LanguageToggle.vue'
import ExchangeCalculator from '@/components/organisms/ExchangeCalculator.vue'
import RatesTable from '@/components/organisms/RatesTable.vue'
import { useRates } from '@/composables/useRates'
import { CachedRatesApi } from '@/services/CachedRatesApi'
import { FrankfurterApi } from '@/services/FrankfurterApi'

const { t } = useI18n()

const { status, stale, rows, asOfDate, eurRates, reload } = useRates(
  new CachedRatesApi(new FrankfurterApi()),
)

watchEffect(() => {
  document.title = t('app.title')
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <main class="mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <header class="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold">{{ t('app.title') }}</h1>
          <p class="text-gray-500">{{ t('app.subtitle') }}</p>
        </div>
        <LanguageToggle />
      </header>

      <p
        v-if="stale"
        class="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
      >
        {{ t('rates.stale') }}
      </p>

      <ExchangeCalculator v-if="eurRates" :rates="eurRates" class="mb-6" />

      <section class="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <AsOfDate v-if="asOfDate" :date="asOfDate" class="mb-4" />

        <LoadingSkeleton v-if="status === 'loading'" :rows="10" />

        <div v-else-if="status === 'error'" class="py-8 text-center">
          <p class="mb-3 text-red-600">{{ t('rates.error') }}</p>
          <button
            class="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
            @click="reload"
          >
            {{ t('rates.retry') }}
          </button>
        </div>

        <RatesTable v-else :rows="rows" />
      </section>

      <footer class="mt-6 text-xs text-gray-400">
        <p>{{ t('footer.disclaimer') }}</p>
        <p class="mt-1">
          {{ t('footer.source') }}:
          <a href="https://www.frankfurter.dev" class="underline hover:text-gray-600">Frankfurter</a>
          /
          <a href="https://www.ecb.europa.eu" class="underline hover:text-gray-600">ECB</a>
        </p>
      </footer>
    </main>
  </div>
</template>
