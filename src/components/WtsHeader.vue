<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="h-16 bg-black">
    <div class="container mx-auto">
      <p class="text-white text-4xl py-3 uppercase font-black">What The Scrap</p>
    </div>
  </div>
</template>
