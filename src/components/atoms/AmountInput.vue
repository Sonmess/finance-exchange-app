<script setup lang="ts">
import { useId } from 'vue'

defineProps<{ modelValue: number | null; label: string }>()

const emit = defineEmits<{ 'update:modelValue': [number | null] }>()

const id = useId()

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  const parsed = Number(value)
  emit('update:modelValue', value === '' || Number.isNaN(parsed) ? null : parsed)
}
</script>

<template>
  <div>
    <label :for="id" class="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
      {{ label }}
    </label>
    <input
      :id="id"
      type="number"
      min="0"
      step="0.01"
      inputmode="decimal"
      :value="modelValue ?? ''"
      class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm tabular-nums focus:border-gray-900 focus:outline-none"
      @input="onInput"
    />
  </div>
</template>
