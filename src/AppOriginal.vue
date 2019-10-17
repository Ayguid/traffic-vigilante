<template>
  <div id="app">
    <croppa v-model="myCroppa"></croppa>
    <img id="text-img" alt="Vue logo" src="./assets/patente.jpg" hidden>
    <canvas id="myCanvas" width="1000" height="500"></canvas>
    <button v-on:click="recognize">recognize</button>

  </div>
</template>

<script>
/* eslint-disable */
import { createWorker, PSM, OEM } from 'tesseract.js';
import {img_Funcs} from "./myFuncs/imageFuncs.js"

const worker = createWorker({
  logger: m => console.log(m),
});

export default {
  name: 'app',
  methods: {

    recognize: async () => {
      // const rectangles = [
      //   { left: 0, top: 160, width: 500, height: 200 },
      // ];//para solo parte de la img
      const img = document.getElementById('myCanvas');
      console.log(img);
      await worker.load();
      await worker.loadLanguage('spa');
      await worker.initialize('spa', OEM.LSTM_ONLY);
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
      // const { data: { text } } = await worker.recognize(img,  { rectangles });//para solo parte de la img
      const { data: { text } } = await worker.recognize(img);
      console.log(text);
      await worker.terminate();
    }
  },
  mounted(){
    window.onload = function() {
      var imgs = document.getElementById("text-img");
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      // ctx.fillStyle = "#7c4d4d";
      // ctx.fillRect(0, 160, 500, 200);
      ctx.drawImage(imgs, 10, 10);
      img_Funcs.grayScale(ctx, canvas);
      // img_Funcs.contrastImage(ctx, canvas);
    }
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
