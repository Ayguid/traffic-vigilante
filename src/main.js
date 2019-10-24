import Vue from 'vue'
import App from './App.vue'

import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'
Vue.use(Croppa);

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store/store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
