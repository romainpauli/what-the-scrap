<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import WtsHeader from './components/WtsHeader.vue'
import WtsFooter from './components/WtsFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen relative">
    <WtsHeader class="sticky top-0" />
    <div class="flex-grow">
      <div class="container mx-auto" >
        <div class="w-80 h-80 border-4 border-dotted border-pink-200 my-10 p-24">
          drop the scrap
        </div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="coucou" />
       </div>
    </div>
    <WtsFooter class="flex-none" />
  </div>
</template>
