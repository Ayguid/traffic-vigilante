<template>
  <div id="app">
    <b-progress :value="progVal" :max="1" show-progress animated></b-progress>

    <croppa v-model="myCroppa" class="c1"
    auto-sizing
    :image-border-radius="10"
    prevent-white-space
    :zoom-speed="7"
    placeholder="Subir una imagen"
    placeholder-color="#000"
    :placeholder-font-size="16"
    canvas-color="transparent"
    :show-remove-button="true"
    remove-button-color="black"
    :remove-button-size="30"
    @image-remove="resetImageInput"
    @draw="updateCoords"
    :show-loading="true"
    :loading-size="50"
    :loading-color="'#b02e2e'">
  </croppa>

  <button v-on:click="recognize">recognize</button>

  <div>


    <div>
      <b-table :busy="isBusy" :fields="['index', 'text', 'confidence']" :items="filterByConfidence(responseData.words, confidenceMin)">
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <!-- A virtual column -->
        <template v-slot:cell(index)="data">
          {{ data.index + 1 }}
        </template>


        <!-- Optional default data cell scoped slot -->
        <template v-slot:cell(text)="data">
          <i @click="selectWord(data.item)">{{ data.item.text }}</i>
        </template>
        <template v-slot:cell(confidence)="data">
          <i>{{ data.item.confidence }}</i>
        </template>
      </b-table>
    </div>
  </div>


  <!-- <div @click="uploadCroppedImage" class="">
  asdasd
</div> -->

</div>
</template>

<script>
import { createWorker, PSM, OEM } from 'tesseract.js';
export default {
  name: 'app',

  data: function () {
    return {
      myCroppa: {

      },
      responseData:[],
      isBusy:false,
      confidenceMin:80,
      progVal:0,
    }
  },

  methods: {
    uploadCroppedImage:function() {
      console.log(this.myCroppa.getMetadata());
    },
    recognize: async function (){
      const worker = createWorker({
        logger: (m) => {
          console.log(m)
          this.progVal=m.progress
        },
      });
      this.isBusy=true;
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng', OEM.LSTM_ONLY);
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
      const { data } = await worker.recognize(this.myCroppa.canvas);
      this.isBusy=!this.isBusy;
      this.responseData = data;
    },
    selectWord:function(obj){
      if (obj) {
        obj.isClicked=!obj.isClicked;
        this.drawBox();
      }

    },
    updateCoords: function() {
      // console.log(event);
      // var meta = this.myCroppa.imgData
      // var wrds = this.responseData.words;
      // if (wrds) {
      //   for (var i = 0; i <  wrds.length; i++) {
      //     wrds[i].bbox.x0 = (wrds[i].bbox.x0)-(meta.startX);
      //     wrds[i].bbox.x1 = (wrds[i].bbox.x1)-(meta.startX);
      //     wrds[i].bbox.y0 = (wrds[i].bbox.y0)-(meta.startY);
      //     wrds[i].bbox.y1 =  (wrds[i].bbox.y1)-(meta.startY);
      //     console.log(wrds[i].bbox.x0);
      //     console.log(meta.startX);
      //   }
      //   console.log(wrds);
      // }
    },
    drawBox:function(){
      var original = this.myCroppa;
      var ctx = this.myCroppa.ctx;
      ctx.clearRect(0, 0, original.canvas.width, original.canvas.height);
      this.myCroppa.ctx.drawImage(original.img, original.imgData.startX,original.imgData.startY,original.imgData.width, original.imgData.height);
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 4;
      var words = this.responseData.words;
      for (var i = 0; i < words.length; i++) {
        if (words[i].isClicked) {
          ctx.beginPath();
          ctx.moveTo(words[i].bbox.x0 , words[i].bbox.y0 );
          ctx.lineTo(words[i].bbox.x1 , words[i].bbox.y0 );
          ctx.lineTo(words[i].bbox.x1 , words[i].bbox.y1 );
          ctx.lineTo(words[i].bbox.x0 , words[i].bbox.y1 );
          ctx.closePath();
          ctx.stroke();
        }
      }
    },
    filterByConfidence:function(data, tolerance){
      if (data) {
        return  data.filter(word => word.confidence > tolerance);
      }
    },
    resetImageInput: function(){
      this.progVal=0;
      this.responseData=[];
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
.croppa-container.c1 {
  width: 50%;
  height: 300px;
  margin: 50px auto;
  display: block;
}
</style>
