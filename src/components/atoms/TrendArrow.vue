<script setup lang="ts">
import type { Trend } from '@/domain/trend'

const props = defineProps<{ trend: Trend }>()

const glyph: Record<Trend, string> = { up: '▲', down: '▼', flat: '–' }
const color: Record<Trend, string> = {
  up: 'text-emerald-600',
  down: 'text-red-600',
  flat: 'text-gray-400',
}
</script>

<template>
  <span :class="color[props.trend]" class="text-xs">{{ glyph[props.trend] }}</span>
</template>
