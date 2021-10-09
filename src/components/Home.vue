<script setup>
import { ref } from 'vue'
import WtsList from '/src/components/WtsList.vue'
const count = ref(0)
</script>

<template>
    <div class="container mx-auto" >
        <WtsList />
    </div>
</template>