<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="py-3 w-full bg-black">
    <div class="container mx-auto text-white flex items-end">
      <img alt="What the scrap logo" src="../assets/what-the-scrap.svg" class="w-24 bg-white" />
      <p class="mx-4" >© la viande hackée 2021</p>
    </div>
  </div>
</template>
