<template>
  <div
    id="wrapper"
    v-shortkey="{
      insertPenny: ['ctrl', '1'],
      insertNickel: ['ctrl', '2'],
      insertDime: ['ctrl', '3'],
      insertQuarter: ['ctrl', '4'],
      insertLoonie: ['ctrl', '5'],
      insertToonie: ['ctrl', '6'],
      returnCoins: ['ctrl', '7'] }" 
    @shortkey="keyboardShortcut">
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

</style>
