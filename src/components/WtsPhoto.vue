<script setup>
    import { ref } from 'vue'
    import { $fetch } from 'ohmyfetch';
    import { useStore } from 'vuex';

    const direct = ref({'18034': 'Kupfer/Eisen Shredder','18033': 'Chromnickel Shredder','10098': 'Sandwich-Platten','10000': 'Leichteisen / Shreddervormaterial','11110': 'IAS','20006': 'Kupfer Oberleitung','24009': 'Aluminium neu, blank','18051': 'Gummi/Holz/Kunststoff-Gemisch','28002': 'Blei, Auswuchtgewichte','20007': 'Kupfer Granulat 1','14000': 'Eisenspäne','10030': 'Altauto, gepresst','24006': 'Aluminiumprofile, lackiert / farbig','20009': 'Kupfer Granulat Raff.','11120': 'Langschrott, nicht scherbar','15000': 'Guss, unzerkleinert / Maschinenguss','11001': 'P1 / Langschrott, scherbar','25001': 'Abfälle, 18/8','11000': 'Langschrott, scherbar','20102': 'Kupferkabel isol. 32%','20105': 'Kupfer/Blei Kabel armiert','20014': 'Kupfer aus Transformatoren','24015': 'Aluminium-Kupfer-Elemente','24013': 'Aluminium, Felgen mit Anhaftungen','20012': 'Kupfer sammel / Raff 2','10082': 'Trennware 1, >40% Metall','18018': 'Siebtrommel <15mm','24004': 'Aluminiumprofile, blank AIMgSi0.5','13012': 'Blechabfälle, lang 12','28000': 'Blei, weich','20003': 'Kupfer elektrolyt, Millberry','24002': 'Aluminium, Offsetplatten','10005': 'Weissblech / Shredder','18038': 'Kupferkab.Sensortrennung <40mm','25004': 'Späne, V4A','25003': 'Abfälle, V4A','20199': 'Kupferkabel Divers','25010': 'Chromnickel, divers','20101': 'Kupferkabel isol. 63%','20108': 'Kupfererdkabel Fe/Pb-armiert die Öl, Teer oder andere gefährliche Stoffe enthalten','11020': 'Betoneisen','20109': 'Alu/Kupfer-Kabel','12000': 'Träger, Tankblech, Eisenschwellen, Röhren, bis max. 50 cm Steghöhe','20100': 'Kupferkabel isol. 45%','51001': 'SWICO-Material','18013': 'Shredder Alu 100','24018': 'Aluminiumstoren ohne Fe-Kasten','24027': 'Aluminium Abfälle 7000er Legierung','20010': 'Kupfer blank','90528': 'Pneu PKW ohne Felge','24016': 'Aluminium, Getränkedosen sauber','24011': 'Aluminium, Guss mit 2% Fe','10081': 'Trennware 2, <40% Metall','11162': 'Schwerschrott 8s1','24010': 'Alu Abfälle alt/neu gemischt, 2% Tol.','24017': 'Aluminium, Getränkedosen mit Weissblech (ohne Igora Bon)','10010': 'Auto mit Motor und Ausweis','20011': 'Kupfer sammel / Raff 1','24019': 'Aluminiumtrennmaterial','25100': 'Abfälle, Chromstahl'})
    const baseurl = 'https://7snyn04dq9.execute-api.eu-west-1.amazonaws.com/dev/'
    const store = useStore()
    const isLoading = ref(false)
    const fname = ref('')
    const showname = ref('')
    const ic = ref(0)
    const resu = ref({})
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
        resu.value = JSON.parse(body.replaceAll('"', '').replaceAll("'", '"'))
        if (resu.value.length > 0) {
            console.log(resu.value)
            showname.value = direct.value[resu.value[0].Name]
            ic.value = resu.value[0].Confidence.toFixed(2)
            isLoading.value = false
        } else {
            ic.value = -1
            showname.value = "No Results :("
            isLoading.value = false
        }
    }
</script>


<template>
    <div class="px-4 lg:px-0 container mx-auto pt-10">
        <router-link to="/" class="text-lg italic text-gray-500 font-extralight underline" >back to the list</router-link>
        <div class="w-full lg:w-1/2 border-4 border-dotted border-[#31C8C8] my-10 p-10 mx-auto relative">
            <template v-if="isLoading">
                <img alt="Recycling logo" src="../assets/Recycling_Symbol2.svg" class="h-50 w-50 animate-spin" />
            </template>
            <template v-else>
            <img alt="Recycling logo" src="../assets/photoupload.svg" class="h-60 w-60 mx-auto opacity-50" />
            <p class="italic text-red-500 text-center" >To avoid cost, the image processing model is off, please send me an email to romain.pauli@vinum.swiss to turn it on.</p>
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

        <p v-if="ic > 10" class="text-4xl font-extralight text-center" >{{ showname }}</p>
        <p v-if="ic < 10" class="text-4xl font-extralight text-center" >{{ showname }}</p>
        <p v-if="ic > 0" class="text-2xl font-extralight text-center italic my-4" >
            <img v-if="ic < 10" alt="search logo bad" src="../assets/Smiley_Bad.svg" class="h-16 inline" />
            <img v-if="ic >= 10 && ic < 15" alt="search logo bad" src="../assets/Smiley_Bad.svg" class="h-16 inline" />
            <img v-if="ic >= 15 && ic < 22" alt="search logo middle" src="../assets/Smiley_neutre.svg" class="h-16 inline" />
            <img v-if="ic >= 22" alt="search logo happy" src="../assets/Smiley_Happy.svg" class="h-16 inline" />
        </p>
    </div>
</template>