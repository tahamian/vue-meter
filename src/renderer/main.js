import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'


Vue.use(BootstrapVue);


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

new Vue({
  components: { App,  },
  router,
  el : "#app",
  template: '<App/>'
}).$mount('#app')