<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { $fetch } from 'ohmyfetch';
import WtsChart from './WtsChart.vue';

const route = useRoute()
const laliste = reactive({ l: {}, kpi: {} })
const hydrated = ref(false)
const scrapfilter = ref('')
const filteredList = computed(() => {
    laliste.l.filter(item => item.searchterm.includes(scrapfilter.value.toLowerCase()))
})
onMounted(async () => {
     const res = await $fetch("https://7snyn04dq9.execute-api.eu-west-1.amazonaws.com/dev/sss/" + route.params.id + "_date.txt", { method: 'GET' })
     laliste.l = (JSON.parse(res.data))
    //  .map((elem) => {
    //     return {
    //         name: elem.name,
    //         stock: elem.stock,
    //         sorte: elem.Sorte,
    //         signal: elem.signal,
    //         searchterm: elem.name.toLowerCase()
    //     }
    //  }))
    const reskpi = await $fetch("https://7snyn04dq9.execute-api.eu-west-1.amazonaws.com/dev/sss/" + route.params.id + "_kpi.json", { method: 'GET' })
     laliste.kpi = (JSON.parse(reskpi.data))
     hydrated.value = true
})
</script>

<template>
    <div class="container mx-auto py-10">
        <router-link to="/" class="text-lg italic text-gray-500 font-extralight underline" >back to the list</router-link>
        <h1 class="font-extralight text-6xl">
            {{ route.params.name }}
        </h1>
        <div class="grid grid-cols-4 gap-4 pt-16 text-4xl font-extralight text-right" >
            <div class="" >
                <div class="text-base" >incoming</div>
                <div>{{ laliste.kpi.incoming.toFixed(0) }} KG</div>
            </div>
            <div class="" >
                <div class="text-base" >outgoing</div>
                <div>{{ laliste.kpi.outgoing.toFixed(0) }} KG</div>
            </div>
            <div class="" >
                <div class="text-base" >difference</div>
                <div>{{ laliste.kpi.diff.toFixed(0) }} KG</div>
            </div>
            <div>
                <img v-if="laliste.kpi.signal > 0" alt="search logo magnifier" src="../assets/metal_OK.svg" class="h-16 inline" />
                <img v-if="laliste.kpi.signal < 0" alt="search logo magnifier" src="../assets/metal_NOK.svg" class="h-16 inline" />
                <img v-if="laliste.kpi.signal === 0" alt="search logo magnifier" src="../assets/metal_QUO.svg" class="h-16 inline" />
            </div>
        </div>
        <div v-if="hydrated" class="mb-10 px-4 lg:px-0">
            <!-- <p>{{ laliste.l }}</p> -->
            <WtsChart :obj="laliste.l" class="w-full mt-10" />
        </div>
    </div>
</template>