<template>
  <div id="app">
    <router-view></router-view>
    
  </div>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
  export default {
    name: 'vue-meter',
    data (){
      return {
        tickets : []
      }
    }
  }
</script>

<style>
  
</style>
