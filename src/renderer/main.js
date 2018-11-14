import Vue from 'vue'
// import axios from 'axios'

import App from './App'
import router from './router'
import VModal from 'vue-js-modal'

Vue.use(VModal)

// import {default as Vuedals, Component as Vuedal, Bus as VuedalsBus} from 'vuedals';

// import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  // store,
  el : "#app",
    // data: {
  	// timeCreated: Date.now()
    // },
  template: '<App/>'
}).$mount('#app')