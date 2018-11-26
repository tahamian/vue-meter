<template>
  <div
  
    id="wrapper1"
    v-shortkey="{
      insertPenny: ['ctrl', '1'],
      insertNickel: ['ctrl', '2'],
      insertDime: ['ctrl', '3'],
      insertQuarter: ['ctrl', '4'],
      insertLoonie: ['ctrl', '5'],
      insertToonie: ['ctrl', '6'],
      returnCoins: ['ctrl', '7'] }" 
    @shortkey="keyboardShortcut">
    <div>

   <b-card no-body>
      <b-tabs pills card>
        <b-tab title="Buy A Ticket" active>
          {{this.$parent.tickets}}
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
  max-width: 960px; /* 20px smaller, to fit the paddings on the sides */

  padding-right: 10px;
  padding-left: 10px;

  }
</style>
