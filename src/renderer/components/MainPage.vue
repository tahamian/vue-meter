<template>
  <div id="wrapper1">
    <div>

   <b-card no-body style="height : 100vh; width : 100vh;" >
      <b-tabs pills card>
        <b-tab title="Buy A Ticket" active>
          
          <create-ticket :value="this.$parent.tickets">
          </create-ticket>
        </b-tab>
        <b-tab title="Refund Ticket">
      
          <edit-ticket v-bind:tickets="this.$parent.tickets"></edit-ticket>
        </b-tab>
      </b-tabs>
    </b-card>


    </div>



  </div>
</template>

<script>
import CreateTicket from './CreateTicket'
import EditTicket from './EditTicket'
import { format } from 'url';
  export default {
    name: 'landing-page',
    components: { 
      EditTicket, 
      CreateTicket },
    data () {
      return {
        tickets: [],
      }
  },
  methods: {
    onChildUpdate(newValue) {
      this.tickets = newValue
    }
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
  #wrapper1 {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    
  
  height: 100vh;
  width: 100vh;

  }
  html {
    height : 100vh;
    width : 100vh;
  }

</style>
