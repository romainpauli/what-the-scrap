<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

defineProps({
  msg: String
})

const count = ref(0)
const store = useStore()
const logout = () => store.dispatch('signout')
</script>

<template>
  <div class="h-16 bg-black">
    <div class="container mx-auto flex justify-between">
      <p class="text-white text-4xl py-3 uppercase font-black">What The Scrap</p>
      <button @click="logout" class="uppercase text-white">logout</button>
    </div>
  </div>
</template>
