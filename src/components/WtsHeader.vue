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
    <div class="container mx-auto flex justify-between px-4 lg:px-0">
      <p class="text-white text-2xl lg:text-4xl py-4 lg:py-3 uppercase font-black">
        <img alt="Recycling logo" src="../assets/recycling.svg" class="h-8 w-8 inline -mt-1" />
        What The Scrap
      </p>
      <button @click="logout" class="uppercase text-white text-xs lg:text-lg">logout</button>
    </div>
  </div>
</template>
