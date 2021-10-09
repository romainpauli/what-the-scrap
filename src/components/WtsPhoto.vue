<script setup>
import { $fetch } from 'ohmyfetch';
import { useStore } from 'vuex';
const baseurl = 'https://7snyn04dq9.execute-api.eu-west-1.amazonaws.com/dev/'

const store = useStore()
const addDroppedFile = async (e, fname) => {
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      var lastfile = droppedFiles[0];
      var filename = 'wts-' + Math.floor(Date.now() / 1000) + ".jpeg";
      if (fname !== "") {
        filename = 'wts-' + fname;
      }
      uploadFile(lastfile).then(
        (res) => {
          console.log(res)
          this.imageslist.push({
            Key: filename,
          });
        }
      );
    }
const uploadFile = (f) => {
    return $fetch(baseurl + "image/scrap-images/" + 'test-romain-test.jpg', { method: 'PUT', headers: { Authorization: store.state.token, "Content-Type": "image/jpeg" }, body: f });
}

</script>


<template>
    <div>
        <div class="w-1/2 border-4 border-dotted border-pink-200 my-10 p-10 mx-auto">
            <img alt="Recycling logo" src="../assets/photoupload.svg" class="h-60 w-60 mx-auto opacity-50" />
            <input type="file"
            id="avatar" name="avatar"
            accept="image/png, image/jpeg" class="mx-auto block" @change="uploadFile">
            <input
                      type="file"
                      id="file"
                      ref="file"
                      accept="image/*"
                      @change="addSelectedFiles($event, 'testromain')"
                      @drop.prevent="addDroppedFile($event, 'testromain')"
                      @dragover.prevent
                      class="h-32 w-full border-dashed border p-12"
                    />
        </div>
    </div>
</template>