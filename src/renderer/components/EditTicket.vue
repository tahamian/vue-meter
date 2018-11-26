<template>
<div>

<div class="d-flex justify-content-center">
    <br>
    <h2>Refund Ticket:</h2>
</div>

<div class ="d-flex justify-content-center">
<div class=inputSpace>
 <b-form class="form-inline">
  <div class="form-group mb-2">
    <label for="ticketId" class="sr-only">Enter Ticket ID</label>
    <input type="text"   readonly class="form-control-plaintext" 
    id="staticEmail2" value="Enter Ticket ID :">
  </div>
  <div class="form-group mx-sm-3 mb-0">
    <input v-model="id" type="text" class="form-control" id="TicketID" 
    placeholder="Ticket ID">
  </div>
  <b-button v-on:click="updateTitle(tickets)" variant="primary" 
  :disabled="id == null || id == ''"  >
    Return Ticket</b-button>
</b-form>
</div>
</div>

<b-modal ref="myModalRef" hide-footer title="Please Collect Your change">
      <div class="d-block text-center">
        <h3>Refund Sucessful</h3>
        <img src="../assets/checkmark.png">
        <div class ="d-flex justify-content-center">
            <br>
            <h3>Your Refund Is: </h3>
        </div>

      <div class ="d-flex justify-content-center">
      <h4>{{msg}}</h4>
      </div>
  
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
    </b-modal>


   
 
  
  </div>

  
</template>


<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

export default {
  name: "edit-ticket",
  props: ["tickets"],
  data () {
    return {
      msg: null,
      id : null
    }
  },
  destroyed () {
  //  console.log("hello")
  },
  methods: {

      showToast(msg, type) {
      let options = {
        duration: 3000,
        singleton: true
      }

      if (type) options.type = type;

      Vue.toasted.show(msg, options);
    },
      getCurrentTime(expireTime){
      
        var input = new Date(expireTime);
             
        var cur_date_vue = new Date();
        var time = cur_date_vue.getTime()
        if(Number((expireTime - time)*(1/60000) * 0.25).toFixed(2)<0){
            return 0;
        }
        return Number((expireTime - time)*(1/60000) * 0.25).toFixed(2);
        
        

      },


      updateTitle: function(tickets){

        let find = tickets.filter( (x) =>{
          return x.id === Number(this.id)
        })
        console.log(find)
        if (find.length === 0){
            this.showToast('Please enter Valid ID','error')
        }
        else{
          let msg = this.getCurrentTime(find[0].EpochDate)
          if(msg == 0){
            this.showToast('This Ticket Has expired','error')
          }
          else{
            this.$refs.myModalRef.show()        
            this.msg = "$ " + msg
            let index = tickets.indexOf(find[0])
            // console.log(index)
            if(index > -1 ){
              console.log("remove element")
            }
          }
          
        }
      },
        hideModal () {
          this.id = null;
          this.msg = null;
          this.$refs.myModalRef.hide()
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

.wrapper1 {
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