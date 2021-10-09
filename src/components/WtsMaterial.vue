<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <div class="container mx-auto py-10">
        <router-link to="/" class="text-lg italic text-gray-500 font-extralight underline" >back to the list</router-link>
        <h1 class="font-extralight text-6xl">
            {{ route.params.id }}
        </h1>
    </div>
</template>
