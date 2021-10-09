<script setup>
    import { ref } from 'vue'
    import { $fetch } from 'ohmyfetch';
    import { useStore } from 'vuex';

    const baseurl = 'https://7snyn04dq9.execute-api.eu-west-1.amazonaws.com/dev/'
    const store = useStore()
    const isLoading = ref(false)
    const fname = ref('')
    const resu = ref('')
    const addDroppedFile = async (e) => {
        isLoading.value = true
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      var lastfile = droppedFiles[0];
      uploadFile(lastfile).then(() => {
          rekognize()
      })
    }
    const addSelectedFiles = async (e) => {
        isLoading.value = true
      let droppedFiles = e.target.files;
      if (!droppedFiles) return;
      var lastfile = droppedFiles[0];
      uploadFile(lastfile).then(() => {
          rekognize()
      })
    }
    const uploadFile = (f) => {
        fname.value = Math.floor(Math.random() * 100000) + Math.floor(Date.now() / 1000) + '.jpeg'
        return $fetch(baseurl + "what-the-scrap/" + fname.value, { method: 'PUT', headers: { Authorization: 'Bearer ' + store.state.token, "Content-Type": "image/jpeg" }, body: f });
    }
    const rekognize = async () => {
        const { body } = await $fetch(baseurl + "reko/" + fname.value, { method: 'GET' });
        resu.value = body
        isLoading.value = false
        return body
    }
</script>


<template>
    <div>
        <div class="w-1/2 border-4 border-dotted border-[#31C8C8] my-10 p-10 mx-auto relative">
            <template v-if="isLoading">
                <img alt="Recycling logo" src="../assets/Recycling_Symbol.svg" class="h-50 w-50 animate-spin" />
            </template>
            <template v-else>
            <img alt="Recycling logo" src="../assets/photoupload.svg" class="h-60 w-60 mx-auto opacity-50" />
            <p class="italic text-gray-500 text-center" >Click or drop an image here</p>
            <input
                      type="file"
                      id="file"
                      ref="file"
                      accept="image/*"
                      @change="addSelectedFiles($event)"
                      @drop.prevent="addDroppedFile($event)"
                      @dragover.prevent
                      class="h-full w-full border-dashed border absolute top-0 left-0 text-center opacity-0"
                    />
            </template>
        </div>
        <p>{{ resu }}</p>
    </div>
</template>