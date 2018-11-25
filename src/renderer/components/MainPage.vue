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
          <create-ticket :value="tickets"></create-ticket>
        </b-tab>
        <b-tab title="Refund Ticket">
          <edit-ticket v-bind:tickets="tickets"></edit-ticket>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Payments from './MainPage/PaymentOptions'
import Cash from './MainPage/Payments/Cash'
import CreateTicket from './CreateTicket'
import EditTicket from './EditTicket'
// import moment from 'moment'
import { format } from 'url';
  export default {
    name: 'landing-page',
    components: { Payments, Cash, EditTicket, CreateTicket },
    data () {
      return {
        tickets: [],
        timeFromNow: null,
        timeLater : null,
        date : [],
        futureMin : 30,
        amount : 0.0,
        amountDisplay : '',
        balance : 0.0,
        balanceDisplay : '0.00',
        ampm : true,
        days : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        months : ['January','February','March','April','May','June','July','August','September','October','November','December'],
        nums : ['st','nd','rd','th'],
        formattedMins : '',
        todate : [],
        rate : 0.25
      }
  },
  created () {
    this.getTimeFromNow()
    setInterval(this.getTimeFromNow, 500)
  },
  destroyed () {
    clearInterval(this.getTimeFromNow)
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
    getTimeFromNow () {
      this.timeFromNow = this.formatTime(new Date())
      this.date = this.formatDate(new Date())
      
      let timeL =  new Date()
      
      timeL.setMinutes(timeL.getMinutes() + this.futureMin );
      this.timeLater = this.formatTime(timeL);
      
      this.todate = this.formatDate(timeL);

      this.formattedMins = this.formatMin()
      this.getAmount()
    },
    formatDate(date){
      let superscript = date.getDate()
      if(superscript == 1 || superscript == 21 || superscript == 31){
        superscript = this.nums[0];
      }
      else if (superscript == 2 || superscript == 22){
          superscript = this.nums[1];
      }
      else if(superscript == 3 || superscript == 23){
          superscript = this.nums[2];
      }
      else{
          superscript = this.nums[3];
      }
      return [this.days[date.getDay()],this.months[date.getMonth()],  date.getDate() , superscript, date.getFullYear()]
    },
    formatTime(time){
      let min = time.getMinutes();
      min = this.zeroPadding(min);
      let sec = time.getSeconds();
      sec = this.zeroPadding(sec);
      if (this.ampm){
        let hour = time.getHours();
        let ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        return hour + ':' + min + ':' + sec + ' ' + ampm;
      }
      else{
        return time.getHours() + ':' + min + ':' + sec; 
      }
    },
    zeroPadding (number) {
      return number < 10 ? '0' + number : number
    },
    toggle_ampm() {
      this.ampm = !this.ampm
    },
    add_time (num) {
      this.futureMin += num
      this.formattedMins = this.formatMin()
    },
    remove_time (num){
      if( (this.futureMin > num)){
        this.futureMin = this.futureMin - num
        this.formattedMins = this.formatMin()
      }
    },
    formatMin() {
      let hours = Math.floor( this.futureMin / 60 )
      let mins = this.futureMin % 60
      return hours + ' Hours and ' + mins + ' Minutes' 
    },
    show (){
        this.$modal.show('payment')
      },
    close (){
      this.$modal.hide('payment')
    },
    getAmount(){
      this.amount = this.rate * this.futureMin
      this.amountDisplay = this.formatPrice(this.amount);
    },
    reset (){
      this.futureMin = 30;
    }
  }
}
</script>
<style>

</style>
