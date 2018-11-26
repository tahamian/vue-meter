<template>
  <div style="width: 80%; margin-left: 10%;">
    <div class="items">
      <br>
    </div>
    <h3>Select Payment Option:</h3>
    <br>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion1 variant="info">Cash</b-btn>
      </b-card-header>
      <b-collapse ref="accord1" id="accordion1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <Cash v-bind:amount="$route.params.amo"></Cash>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion2 variant="info">Credit Card</b-btn>
      </b-card-header>
      <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <CreditCard></CreditCard>
          <b-modal ref="myModalRef1" hide-footer title="Ticket Print" size="lg">
            <div class="d-block text-center">
              <h3>Thank you!</h3>
              <div>
                <div style="font-size: 16px; color: rgba(0, 0, 0, 0.6); padding: 0px 10px 12px; box-sizing: border-box; 
                  overflow-y: hidden; position: relative; margin: auto; text-align: center; max-height: 626px;">
                  <div style="border: 2px solid rgb(161, 161, 161); background: white; padding: 10px 20px; border-radius: 25px;">
                    <img src="../../assets/avatar.png" alt="">
                    <br> <b> Ticket ID: </b>{{$route.params.id}}
                    <br> <b>Parking time:</b> {{$route.params.time}}
                    <br> <b> Amount:  $</b> {{$route.params.amo}}
                    <br> <b> Time of Purchase: </b>  {{$route.params.CurrentDate}} <b>@</b>{{$route.params.CurrentTime}}
                    <br> <b> Time Until Expiry: </b> {{$route.params.ExpiryDate}} <b>@</b> {{$route.params.ExpiryTime}}
                    <br>
                    <br>
                    <img height="50px" width="150px" src="../../assets/barcode.png" alt="">
                  </div>
                </div>
              </div>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideModal1">Close</b-btn>
          </b-modal>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion3 variant="info">Bitcoin</b-btn>
      </b-card-header>
      <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
            <bitcoin v-bind:amount="bitcoins"> 
            </bitcoin>
          <div>
            <b-button @click="showModal">
              Pay to Wallet
            </b-button>
            <b-modal ref="myModalRef" hide-footer size="lg" hide-header-close>
              <div class="d-block text-center">
                <h3>Printed Receipt</h3>
                <div>
                  <div style="font-size: 16px; color: rgba(0, 0, 0, 0.6); padding: 0px 10px 12px; box-sizing: border-box; overflow-y: hidden; position: relative; margin: auto; text-align: center; max-height: 626px;">
                    <div style="border: 2px solid rgb(161, 161, 161); background: white; padding: 10px 20px; border-radius: 25px;">
                      <img src="../../assets/avatar.png" alt="">
                      <br> <b> Ticket ID: </b>{{$route.params.id}}
                      <br> <b>Parking time:</b> {{$route.params.time}}
                      <br> <b> Amount Paid: </b> BTC {{bitcoins}}
                      <br> <b> Time of Purchase: </b>  {{$route.params.CurrentDate}} <b>@</b>{{$route.params.CurrentTime}}
                      <br> <b> Time Until Expiry: </b> {{$route.params.ExpiryDate}} <b>@</b> {{$route.params.ExpiryTime}}
                      <br>
                      <br>
                      <img height="50px" width="150px" src="../../assets/barcode.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-btn>
            </b-modal>
          </div>
          </p>
        </b-card-body>
      </b-collapse>
    </b-card>
    <br>
    <b-btn class="mt-3" variant="outline-danger" block @click="goback">Cancel</b-btn>
  </div>
</template>

<script>
import Bitcoin from "./Payments/Bitcoin";
import Cash from "./Payments/Cash";
import CreditCard from "./Payments/CreditCard";

  export default {
    props : ['tickets'],
    components: { Bitcoin, Cash, CreditCard },
    data () {
      return {
        bitcoins : parseFloat(parseFloat(3).toFixed(9) / parseFloat(5670.81).toFixed(9)).toFixed(9)
      }
    },
    methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
      this.$router.push({name : 'Main-Page', params : {payment : 1 , info: this.$route.params}})
    },
    showModal1 (){
      this.$refs.myModalRef1.show()
    },
    hideModal1 () {
      this.$refs.myModalRef1.hide()
      this.$router.push({name : 'Main-Page', params : {payment : 1 , info: this.$route.params}})
    },
    goback (){
      this.$router.push({name : 'Main-Page'})
    }
  }
};
</script>

<style scoped>
.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}
</style>