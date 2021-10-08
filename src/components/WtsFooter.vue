<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="h-12 py-3 w-full bg-black">
    <div class="container mx-auto text-white">
    © la viande hackée 2021
    </div>
  </div>
</template>
