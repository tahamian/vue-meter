<template>
<div>
-------------------------

<div class="accordion" >
     <div class="header"  v-on:click="change_state">Open Collapsible</div>
     <transition>
     <div class="body" v-bind:style="{display : display1, maxHeight : height}">
    <p class="body-inner">Lorem ipsum...</p>
    </div>
    </transition>
     
</div>

</div>
</template>

<script>
export default{
    name : 'cash',
    data () {
        return {
            display1 : 'none',
            height : null,
        }
    },
    methods : {
        change_state (){
            this.display1 = this.display1 == 'block' ? this.display1 = 'none' : this.display1 = 'block'
        }  
    }
}
</script>
<style>
/* @import url('https://fonts.googleapis.com/css?family=Lato'); */

.accordion {
  max-width: 400px;
  font-family: Lato;
  margin-bottom: 20px;

  background-color: #ec5366;
  border-radius: 6px;
}

.accordion .header {
  height: 40px;
  line-height: 40px;
  padding: 0 40px 0 8px;
  position: relative;
  color: #fff;
  cursor: pointer;
}

.accordion .header-icon {
  position: absolute;
  top: 5px;
  right: 8px;
  transform: rotate(0deg);
  transition-duration: 0.3s;
}

.accordion .body {
/*   display: none; */
  overflow: hidden;
  background-color: #fff;
  border: 10px solid #ec5366;
  border-top: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  transition: 300ms ease-out;
  transition-timing-function: linear;


}

.accordion .body-inner {
  padding: 8px;
  overflow-wrap: break-word;
/*   white-space: pre-wrap; */
}

.accordion .header-icon.rotate {
  transform: rotate(180deg);
  transition-duration: 0.3s;
}

.accordion.purple {
  background-color: #8c618d;
}

.accordion.purple .body {
  border-color: #8c618d;
}
</style>