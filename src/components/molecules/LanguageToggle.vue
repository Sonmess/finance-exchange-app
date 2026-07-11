<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { persistLocale } from '@/i18n'
import { messages, type AppLocale } from '@/i18n/messages'

const { locale } = useI18n()

const locales = Object.keys(messages) as AppLocale[]

function select(value: AppLocale) {
  locale.value = value
  persistLocale(value)
  document.documentElement.lang = value
}
</script>

<template>
  <div class="flex overflow-hidden rounded-lg border border-gray-300" role="group">
    <button
      v-for="value in locales"
      :key="value"
      type="button"
      :aria-pressed="value === locale"
      :class="
        value === locale
          ? 'bg-gray-900 text-white'
          : 'bg-white text-gray-500 hover:text-gray-900'
      "
      class="px-3 py-1.5 text-xs font-medium uppercase"
      @click="select(value)"
    >
      {{ value }}
    </button>
  </div>
</template>
