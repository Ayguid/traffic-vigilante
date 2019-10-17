import Vue from 'vue'
import App from './App.vue'

import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'
Vue.use(Croppa);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
