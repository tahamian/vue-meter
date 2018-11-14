<template>
  <div id="app">
     
    <router-view>
      <!-- <vuedal></vuedal> -->

    </router-view>
    <modal name="hello-world"></modal>
  <button v-on:click="show">click me</button>
  </div>

</template>

<script>
  export default {
    name: 'vue-meter',
    methods : {
      show (){
        this.$modal.show('hello-world')
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
