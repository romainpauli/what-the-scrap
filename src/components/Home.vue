<script setup>
import { ref } from 'vue'
import WtsList from '/src/components/WtsList.vue'
const count = ref(0)
</script>

<template>
    <div class="container mx-auto" >
        <WtsList />
        <img alt="What the scrap logo" src="../assets/what-the-scrap.svg" />
        <img alt="Recycling logo" src="../assets/recycling.svg" class="h-16 w-16" />
    </div>
</template>