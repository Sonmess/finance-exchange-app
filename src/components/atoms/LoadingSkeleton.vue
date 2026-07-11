<script setup lang="ts">
withDefaults(defineProps<{ rows?: number }>(), { rows: 8 })
</script>

<template>
  <div class="animate-pulse space-y-3 py-2" aria-hidden="true">
    <div v-for="i in rows" :key="i" class="h-6 rounded bg-gray-100"></div>
  </div>
</template>
