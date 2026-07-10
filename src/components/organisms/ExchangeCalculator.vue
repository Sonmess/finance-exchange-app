<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import AmountInput from '@/components/atoms/AmountInput.vue'
import SwapButton from '@/components/atoms/SwapButton.vue'
import CurrencySelect from '@/components/molecules/CurrencySelect.vue'
import { useCalculator } from '@/composables/useCalculator'
import { BASE_CURRENCY, sortCurrencies } from '@/domain/currency'
import type { EurRates } from '@/domain/exchange'

const props = defineProps<{ rates: EurRates }>()

const { t, locale } = useI18n()

const { amount, from, to, rate, result, swap } = useCalculator(toRef(props, 'rates'))

const codes = computed(() => [BASE_CURRENCY, ...sortCurrencies(Object.keys(props.rates))])

function currencyFormat(currency: string) {
  return new Intl.NumberFormat(locale.value, { style: 'currency', currency })
}

const formattedResult = computed(() => {
  if (result.value === null || amount.value === null) return null
  return `${currencyFormat(from.value).format(amount.value)} = ${currencyFormat(to.value).format(result.value)}`
})

const formattedRate = computed(() => {
  if (rate.value === null) return null
  const value = new Intl.NumberFormat(locale.value, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(rate.value)
  return `1 ${from.value} = ${value} ${to.value}`
})
</script>

<template>
  <section class="rounded-xl bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-lg font-semibold">{{ t('calculator.title') }}</h2>

    <div class="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_1fr_auto_1fr]">
      <AmountInput v-model="amount" :label="t('calculator.amount')" />
      <CurrencySelect v-model="from" :codes="codes" :label="t('calculator.from')" />
      <SwapButton :label="t('calculator.swap')" @click="swap" />
      <CurrencySelect v-model="to" :codes="codes" :label="t('calculator.to')" />
    </div>

    <div class="mt-5 border-t border-gray-100 pt-4">
      <p v-if="formattedResult" class="text-2xl font-semibold tabular-nums">
        {{ formattedResult }}
      </p>
      <p v-else class="text-gray-500">{{ t('calculator.invalidAmount') }}</p>
      <p v-if="formattedRate" class="mt-1 text-sm text-gray-500 tabular-nums">
        {{ formattedRate }}
      </p>
    </div>
  </section>
</template>
