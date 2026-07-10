<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TrendArrow from '@/components/atoms/TrendArrow.vue'
import type { CurrencyRate } from '@/composables/useRates'
import { currencyDisplayName } from '@/domain/currency'

const props = defineProps<{ row: CurrencyRate }>()

const { locale } = useI18n()

const name = computed(() => currencyDisplayName(props.row.code, locale.value))

const formattedRate = computed(() =>
  new Intl.NumberFormat(locale.value, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(props.row.rate),
)
</script>

<template>
  <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50">
    <td class="py-2 pr-4 font-medium text-gray-900">{{ row.code }}</td>
    <td class="py-2 pr-4 text-gray-600">{{ name }}</td>
    <td class="py-2 pr-2 text-right tabular-nums">{{ formattedRate }}</td>
    <td class="w-10 py-2 text-center">
      <TrendArrow :trend="row.trend" />
    </td>
  </tr>
</template>
