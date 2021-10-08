<script setup>
import { ref } from 'vue'
import WtsList from '/src/components/WtsList.vue'
const count = ref(0)
</script>

<template>
    <div class="container mx-auto" >
        <WtsList />
        <div class="w-80 h-80 border-4 border-dotted border-pink-200 my-10 p-24">
          drop the scrap
        </div>
        <img alt="what the scrap logo" src="../assets/what-the-scrap.svg" />
        <img alt="recycling logo" src="../assets/recycling.svg" class="h-16 w-16" />
    </div>
</template>