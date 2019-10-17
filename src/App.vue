<template>
  <div id="app">

    <!-- <croppa v-model="myCroppa"
      :zoom-speed="7"
      :show-loading="true"
      :width="500"
      :height="500"
      :loading-color="'#b54747'">
    </croppa> -->

    <croppa v-model="myCroppa"
         :width="350"
         :height="630"
         :zoom-speed="7"
         placeholder="Subir una imagen"
         placeholder-color="#000"
         :placeholder-font-size="16"
         canvas-color="transparent"
         :show-remove-button="true"
         remove-button-color="black"
         :remove-button-size="50"
         :show-loading="true"
         :loading-size="50"
         :loading-color="'#b02e2e'">
 </croppa>


    <button v-on:click="recognize">recognize</button>

    <!-- <div @click="uploadCroppedImage" class="">
      asdasd
    </div> -->

  </div>
</template>

<script>
import Tesseract from 'tesseract.js';

export default {
  name: 'app',

  data: function () {
    return {
      myCroppa: {
      }
    }
  },

  methods: {
    uploadCroppedImage:function() {
      console.log(this.myCroppa.getMetadata());
      // this.myCroppa.generateBlob((blob) => {
      //   // write code to upload the cropped image file (a file is a blob)
      // }, 'image/jpeg', 0.8) // 80% compressed jpeg file
    },
    recognize: function (){
      Tesseract.recognize(this.myCroppa.canvas,'eng',{ logger: m => console.log(m) })
      .then(({ data: { text } }) => {
        console.log(text);
      })
    }
  },

  mounted(){

  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
