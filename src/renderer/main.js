import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'

Vue.use(VModal)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  // store,
  el : "#app",
  template: '<App/>'
}).$mount('#app')