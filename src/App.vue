<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import HelloWorld from './components/HelloWorld.vue'
import Signin from './components/Signin.vue'
import WtsHeader from './components/WtsHeader.vue'
import WtsFooter from './components/WtsFooter.vue'

defineProps({
  msg: String
})

const count = ref(0)
const store = useStore()
</script>

<template>
  <div class="w-full">
    <signin v-if="store.state.token === ''" class="h-full w-full" />
    <div class="flex flex-col min-h-screen relative" v-else >
      <WtsHeader class="sticky top-0" />
      <div class="flex-grow">
      <router-view />
      </div>
      <WtsFooter class="flex-none" />
      <div class="fixed bg-pink-400 rounded-full w-16 h-16 bottom-10 right-10 border-pink-800 border-b-4 shadow"></div>
    </div>
  </div>
</template>
