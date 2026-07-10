<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AsOfDate from '@/components/atoms/AsOfDate.vue'
import RatesTable from '@/components/organisms/RatesTable.vue'
import { useRates } from '@/composables/useRates'
import { FrankfurterApi } from '@/services/FrankfurterApi'

const { t } = useI18n()

const { status, rows, asOfDate, reload } = useRates(new FrankfurterApi())
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <main class="mx-auto max-w-2xl px-4 py-10">
      <header class="mb-6">
        <h1 class="text-2xl font-bold">{{ t('app.title') }}</h1>
        <p class="text-gray-500">{{ t('app.subtitle') }}</p>
      </header>

      <section class="rounded-xl bg-white p-6 shadow-sm">
        <AsOfDate v-if="asOfDate" :date="asOfDate" class="mb-4" />

        <p v-if="status === 'loading'" class="py-8 text-center text-gray-500">
          {{ t('rates.loading') }}
        </p>

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
