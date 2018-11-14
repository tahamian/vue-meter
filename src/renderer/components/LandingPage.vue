<template>
  <div id="wrapper">
    
    <main>
      <div>
        <span class="title">
          Welcome to the Parking Meter!
        </span>
        <system-information></system-information>
      </div>
      </main>
      <div>
        <button v-on:click="add_time">+</button>
        <button v-on:click="remove_time" :disabled="futureMin <=30">-</button>
       </div>
      <br>
      <!-- {{time}} -->
      {{timeFromNow}}
      <br>
      {{timeLater}}
      <br/>
      {{formatedMins}}
      <br>
      
    
    <button v-on:click="toggle_ampm">Toggle AM/PM</button>
    
    <br>
      <span>{{date[0]}} </span>&nbsp;
      <span> {{ date[1] }} </span>&nbsp;
      <span>{{date[2]}}</span> 
      <span><sup> {{date[3]}} </sup></span>&nbsp; 
      <span>{{date[4]}}</span> 

  <router-link :to="{ name: 'print'}">User</router-link>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  // import moment from 'moment'
import { format } from 'url';
  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data () {
    return {
      timeFromNow: null,
      timeLater : null,
      date : [],
      futureMin : 30,
      ampm : 0,
      days : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      months : ['January','February','March','April','May','June','July','August','September','October','November','December'],
      nums : ['st','nd','rd','th'],
      formatedMins : ''
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
    getTimeFromNow () {
      this.timeFromNow = this.formatTime(new Date())
      let timeL =  new Date()
      timeL.setMinutes(timeL.getMinutes() + this.futureMin )
      this.timeLater = this.formatTime(timeL);
      this.date = this.formatDate(new Date())
      this.formatedMins = this.formatMin()
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
    add_time () {
      this.futureMin += 30
      this.formatedMins = this.formatMin()
    },
    remove_time (){
      if( ! (this.futureMin <= 30)){
        this.futureMin -= 30
        this.formatedMins = this.formatMin()
      }
    },
    formatMin() {
      let hours = Math.floor( this.futureMin / 60 )
      let mins = this.futureMin % 60
      return hours + ' Hours and ' + mins + ' Minutes' 
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
</style>
