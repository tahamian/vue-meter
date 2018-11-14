import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main-Page',
      component: require('@/components/MainPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    // {
    //   path : '/print',
    //   name : "print",
    //   component : require('@/components/print').default
    // }
  ]
})
