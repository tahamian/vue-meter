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
          <create-ticket :value="tickets"></create-ticket>
        </b-tab>
        <b-tab title="Refund Ticket">
          <edit-ticket v-bind:tickets="tickets"></edit-ticket>
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
    },
    formatPrice(num) {
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    insertCoin (amount) {
      this.balance += amount;
      this.balanceDisplay = this.formatPrice(this.balance);
      console.log('Insert coin: ', amount);
    },
    returnCoins () {
      this.balance = 0;
      this.balanceDisplay = this.formatPrice(this.balance);
      console.log('Returning coins');
    },
    keyboardShortcut (event) {
      switch (event.srcKey) {
        case 'insertPenny':
          this.insertCoin(0.01);
          break;
        case 'insertNickel':
          this.insertCoin(0.05);
          break;
        case 'insertDime':
          this.insertCoin(0.1);
          break;
        case 'insertQuarter':
          this.insertCoin(0.25);
          break;
        case 'insertLoonie':
          this.insertCoin(1);
          break;
        case 'insertToonie':
          this.insertCoin(2);
          break;
        case 'returnCoins':
          this.returnCoins();
          break;
      }
    },
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
