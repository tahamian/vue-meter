<template>
<div>

<div class="d-flex justify-content-center">
    <br>
    <h1>Refund Ticket</h1>
</div>

<div class ="d-flex justify-content-center">
<div class=inputSpace>
 <form class="form-inline">
  <div class="form-group mb-2">
    <label for="ticketId" class="sr-only">Enter Ticket ID</label>
    <input type="text"   readonly class="form-control-plaintext" id="staticEmail2" value="Enter Ticket ID  : ">
  </div>
  <div class="form-group mx-sm-3 mb-2">
    <input v-model="id" type="text" class="form-control" id="inputPassword2" placeholder="Ticket ID">
  </div>
  <button v-on:click="updateTitle(tickets)" class="btn btn-primary mb-2">Confirm identity</button>
</form>
</div>
</div>
<div class ="d-flex justify-content-center">
    <br>
    <h1>Your Refund Is: </h1>
</div>

<div class ="d-flex justify-content-center">
<h4>{{msg}}</h4>
</div>
  
   
 
  
  </div>

  
</template>


<script>
export default {
  name: "edit-ticket",
  props: ["tickets"],
  data () {
    return {
      ticketIdInput: null,
      timeFromNow: null,
      timeLater : null,
      ticketer: null,
      date : [],
      msg: null,
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
      id : 0
    }
  },
   created () {
  
  },
  methods: {

     

      checkIdExist(id){

      },

      getCurrentTime(expireTime){
        console.log("ExpireDate;")
        console.log(expireTime)
        var input = new Date(expireTime);
        console.log("Readable Date")
        console.log(input)        
        var cur_date_vue = new Date();
        var time = cur_date_vue.getTime()
        console.log((expireTime - time)*(1/60000))
        console.log()
        return Number((expireTime - time)*(1/60000) * 0.25).toFixed(2);
        
        

      },


      updateTitle: function(tickets){
        var check = false
        
        
        for (let item in tickets){
           if(tickets[item].id==this.id){
               check = true
               this.msg = "$ " + this.getCurrentTime(tickets[item].EpochDate)
           }
        }
        if(check ==false){
            this.msg = "Error Could Not Find Ticket "
        }

      }
    }
};





</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
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

main > div {
  flex-basis: 50%;
}

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

.inputSpace {
  padding: 50px;
}

.doc button {
  font-size: 0.8em;
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