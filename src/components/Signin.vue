<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

defineProps({
  msg: String
})

const store = useStore()
const count = ref(0)
const usr = ref('')
const pswrd = ref('')
const login = () => store.dispatch('login', { email: usr.value, password: pswrd.value })
onMounted(() => store.dispatch('retrieveUser'))
</script>

<template>
  <div class="h-screen w-full bg-[#31C8C8] py-24" >
      <div class="flex flex-col shadow p-10 max-w-[500px] bg-white mx-6 md:mx-auto">
        <img alt="what the scrap logo" src="../assets/what-the-scrap.svg" class="h-60 w-60 mx-auto" />
        <label>E-mail</label>
        <input type="text" class="border-2 text-xl p-2 my-2" v-model="usr" />
        <label>Mot de passe</label>
        <input type="password" class="border-2 text-xl p-2 my-2" v-model="pswrd" />
        <p v-if="store.state.erreur !== ''" class="text-red-500 text-lg italic text-center">User or password is not valid :(</p>
        <button class="bg-gray-600 text-white py-2 border-gray-800 border-b-4 mt-4 hover:bg-gray-800 duration-150 ease-in-out" @click="login" >Let's scrap</button>
      </div>
    </div>
</template>

