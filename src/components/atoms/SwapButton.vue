<script setup lang="ts">
defineProps<{ label: string }>()

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:border-gray-900 hover:text-gray-900 focus:border-gray-900 focus:outline-none"
    @click="emit('click')"
  >
    ⇄
  </button>
</template>
