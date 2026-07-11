<script setup lang="ts">
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { currencyDisplayName } from '@/domain/currency'

defineProps<{ modelValue: string; codes: string[]; label: string }>()

const emit = defineEmits<{ 'update:modelValue': [string] }>()

const { locale } = useI18n()

const id = useId()

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div>
    <label :for="id" class="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      @change="onChange"
    >
      <option v-for="code in codes" :key="code" :value="code">
        {{ code }} – {{ currencyDisplayName(code, locale) }}
      </option>
    </select>
  </div>
</template>
