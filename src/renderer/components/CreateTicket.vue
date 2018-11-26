<template>
  <div align = "center">
    <div class ="d-flex justify-content-center">
      <h1>Welcome to the Parking Meter!</h1>
    </div>
      <br>
    <div>
      <h4>Select Amount Of Time:</h4>
    </div>

    <div class="box2">    
      <b-button class="btn btn-success btn-number"  v-on:click="add_time(60)" >+</b-button> 
      <p class = "textHour">{{hours}}&nbsp;&nbsp;hours </p>  
      <b-button class="btn btn-danger btn-number" style="width:38px" v-on:click="remove_time(60)" :disabled="futureMin <=60">-</b-button>
    </div>

    <div class="box2">
      <div>
        <b-button class="btn btn-success btn-number" v-on:click="add_time(15)" >+</b-button>
        <p class = "textHour">{{mins}}&nbsp;&nbsp;minutes</p> 
        <b-button class="btn btn-danger btn-number" style="width:38px" v-on:click="remove_time(15)" :disabled="futureMin <=15">-</b-button>
      </div>
    </div>
     
    <div class = "d-flex justify-content-center"> 
       <br>
      <h2>Your parking will expire at : </h2>
    </div>

    <div class = "d-flex justify-content-center"> 
      
      <h5>{{todate[0]}}, {{ todate[1] }}, {{todate[2]}}{{todate[3]}}, <span>{{todate[4]}}</span> {{timeLater}}  </h5>&nbsp;
    </div>
<br>
    <div>
      <h4> Total amount is :  ${{amount}}   </h4>
    </div>
<br>
     <b-button variant="primary" v-on:click="sendPayment">
       Print Ticket
     </b-button>
   
  </div> 
</template>

<script>
  import PaymentOptions from './MainPage/PaymentOptions'
  export default {
    name: 'create-ticket',
    components: { PaymentOptions },
    data () {
    return {
      timeFromNow: null,
      timeLater : null,
      date : [],
      futureMin : 15,
      amount : '',
      ampm : true,
      days : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      months : ['January','February','March','April','May','June','July','August','September','October','November','December'],
      nums : ['st','nd','rd','th'],
      formatedMins : '',
      mins : '',
      hours : '',
      todate : [],
      rate : 0.25,
      id : 0,
      paymentSucess : 0,
      currentParking : []
    }
  },
  watch : {
    '$route' : 'checkPayment'
  },
  created () {
    this.getTimeFromNow()
    setInterval(this.getTimeFromNow, 500)
    this.checkPayment()
  },
  destroyed () {
    clearInterval(this.getTimeFromNow)
  },
  methods: {
    checkPayment (){
      // console.log('it happened')
      if(this.$route.params.payment){
        this.reset()
      }
    },
    
    sendPayment (){
      var cur_date_vue = new Date();
       var epoch = cur_date_vue.getTime() + this.futureMin*60000;
      
        let tick = {
            id :  this.value.length + 1 ,
            CurrentTime : this.timeFromNow,
            CurrentDate : this.date[0] + ' ' + this.date[1] + ' ' + this.date[2] +this.date[3]+ ' ' + this.date[4] ,
            ExpiryTime : this.timeLater,
            ExpiryDate : this.todate[0] + ' '+ this.todate[1]+ ' ' + this.todate[2]  + this.todate[3] + ' ' + this.todate[4],
            Duration : this.futureMin,
            EpochDate: epoch,
            time : this.formatedMins,
            amo : this.amount
        }
      // console.log(this.value)
      // console.log(tick)
      this.$emit('update', this.value.push(tick))   
      this.currentParking = [tick]
      // let x = this.$parent.tickets.push(tick)
      // this.$emit('update', this.value.push(tick))
      this.$router.push({name : 'cash', params : tick})


    },
    getTimeFromNow () {
      this.timeFromNow = this.formatTime(new Date())
      this.date = this.formatDate(new Date())
      
      let timeL =  new Date()
      
      timeL.setMinutes(timeL.getMinutes() + this.futureMin );
      this.timeLater = this.formatTime(timeL);
      
      this.todate = this.formatDate(timeL);

      this.formatedMins = this.formatMin()
      this.mins = this.getMin()
      this.hours = this.getHour()
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
      this.formatedMins = this.formatMin()
      this.mins = this.getMin()
      this.hours = this.getHour()
    },
    remove_time (num){
      if( (this.futureMin > num)){
        this.futureMin = this.futureMin - num
        this.formatedMins = this.formatMin()
        this.mins = this.getMin()
        this.hours = this.getHour()
      }
    },
    formatMin() {
      let hours = Math.floor( this.futureMin / 60 )
      let mins = this.futureMin % 60
      return hours + ' Hours and ' + mins + ' Minutes' 
    },
    getMin() {
      let mins = this.futureMin % 60
      return mins 
    },
    getHour() {
      let hours = Math.floor( this.futureMin / 60 )
      return hours 
    },
    show (){
        this.$modal.show('payment')
      },
    close (){
      this.$modal.hide('payment')
    },
    getAmount(){
      this.amount = (this.rate * this.futureMin).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    reset (){
        this.futureMin = 15;
        // this.id++;
        // console.log(adding)
        // console.log(this.$parent)
        // console.log("its resetting")
      // this.$emit('update', this.value.push(adding))        
        // this.$parent.onChildUpdate(adding)
        // this.currentParking = [];

    }
  },
  mounted (){

  },
  props : ['value']
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

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .divider {
    position: relative;
    display: inline-block;
    margin: 0;
    
  }

  .changeHour{
    position: relative;
    padding-top: 20px;
    left: 50px;
    
  }
  
  .box1 {
    display: inline-block;
    
   
  }

  .box2 {
    display: inline-block;
    padding: 30px;
   
  }

  .textHour{
    position: relative;
    padding-top: 10px;
    left: 10px;
    
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }


  .floated {
   float:left;
   margin-right:5px;
}
</style>
