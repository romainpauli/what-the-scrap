<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { $fetch } from 'ohmyfetch';

const laliste = reactive({ l: [] })
const hydrated = ref(false)
const scrapfilter = ref('')
const filteredList = computed(() => {
    laliste.l.filter(item => item.searchterm.includes(scrapfilter.value.toLowerCase()))
})
onMounted(async () => {
     const res = await $fetch("https://7snyn04dq9.execute-api.eu-west-1.amazonaws.com/dev/sss/categories.json", { method: 'GET' })
     laliste.l = (JSON.parse(res.data).map((elem) => {
        return {
            name: elem.name,
            stock: elem.stock,
            sorte: elem.Sorte,
            signal: elem.signal,
            searchterm: elem.name.toLowerCase()
        }
     }))
     hydrated.value = true
})
</script>

<template>
    <div class="">
        <div class="">
            <div class="relative group px-4 lg:px-0">
                <img alt="search logo magnifier" src="../assets/Meatsearch.svg" class="h-12 absolute left-0 top-0 mt-4 ml-6 lg:ml-2 opacity-50 group-focus:opacity-100" />
                <input type="text" class="p-4 text-xl border w-full my-2 pl-24 focus:border-[#31C8C8] focus:outline-none" v-model="scrapfilter" />
            </div>
        </div>
        <ul v-if="hydrated" class="mb-10 px-4 lg:px-0">
            <router-link as="li" v-for="item in laliste.l.filter(item => item.searchterm.includes(scrapfilter.toLowerCase()))" :key="item.name" :to="'/material/' + item.sorte + '/' + item.name.replace('/', '%2F')"  class="shadow text-xl p-4 my-2 grid grid-cols-6 border border-white hover:bg-gray-200 hover:border-[#31C8C8] transition duration-75 ease-in-out">
                <p class="col-span-5 lg:col-span-1" >
                    {{ item.sorte }}
                </p>
                <p class="col-span-5 lg:col-span-4">
                    {{ item.name }}
                </p>
                <p class="text-right row-span-2 lg:row-span-1">
                    <img v-if="item.signal > 0" alt="search logo magnifier" src="../assets/metal_OK.svg" class="h-10 inline" />
                    <img v-if="item.signal < 0" alt="search logo magnifier" src="../assets/metal_NOK.svg" class="h-10 inline" />
                    <img v-if="item.signal === 0" alt="search logo magnifier" src="../assets/metal_QUO.svg" class="h-10 inline" />
                </p>
            </router-link>
        </ul>
    </div>
</template>
