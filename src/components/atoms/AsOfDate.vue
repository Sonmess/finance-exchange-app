<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ date: string }>()

const { t, locale } = useI18n()

const formatted = computed(() =>
  new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(props.date)),
)
</script>

<template>
  <p class="text-sm text-gray-500">{{ t('rates.asOf', { date: formatted }) }}</p>
</template>
