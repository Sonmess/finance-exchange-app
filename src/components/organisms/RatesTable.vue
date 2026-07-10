<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import RateRow from '@/components/molecules/RateRow.vue'
import type { CurrencyRate } from '@/composables/useRates'

defineProps<{ rows: CurrencyRate[] }>()

const { t } = useI18n()
</script>

<template>
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
        <th class="py-2 pr-4 font-medium">{{ t('rates.code') }}</th>
        <th class="py-2 pr-4 font-medium">{{ t('rates.currency') }}</th>
        <th class="py-2 pr-2 text-right font-medium">{{ t('rates.rate') }}</th>
        <th class="w-10 py-2"></th>
      </tr>
    </thead>
    <tbody>
      <RateRow v-for="row in rows" :key="row.code" :row="row" />
    </tbody>
  </table>
</template>
