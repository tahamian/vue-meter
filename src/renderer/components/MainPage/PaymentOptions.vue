<template>
  <div>
    <div class="items">
      <!-- {{num_time}}
      {{from_t}}
      {{to_t}}
      {{fromDate_t}}
      {{toDate_t}}
      {{length_t}}
      {{bitcoins}} -->
      <br>
    </div>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion1 variant="info">Cash</b-btn>
      </b-card-header>
      <b-collapse ref="accord1" id="accordion1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
            <cash> </cash>
          </p>
          <p class="card-text">
            Im a flop
          </p>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion2 variant="info">Credit/Debit Card</b-btn>
      </b-card-header>
      <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
            <credit-card></credit-card>
          </p>
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
        <b-modal ref="myModalRef" hide-footer title="Payment Recived">
              <div class="d-block text-center">
                <h3>Thank you!</h3>
                <div>
               
                <h3 style="margin: 0px; padding: 12px 12px 10px; color: rgba(0, 0, 0, 0.87); font-size: 22px; line-height: 32px; font-weight: 400; border-bottom: none; text-align: center;">Ticket</h3>

                <div style="font-size: 16px; color: rgba(0, 0, 0, 0.6); padding: 0px 10px 12px; box-sizing: border-box; overflow-y: hidden; position: relative; margin: auto; text-align: center; max-height: 626px;">

                <div style="border: 2px solid rgb(161, 161, 161); background: white; padding: 10px 40px; border-radius: 25px;">
                  <img src="../../assets/avatar.png" alt="">
                <br> <b>Parking time:</b> {{length_t}} 
                <br> <b> Amount Paid: </b> BTC {{bitcoins}}
                <br> <b> Time of Purchase: </b> {{from_t}}  {{fromDate_t[0]}} {{fromDate_t[1]}} {{fromDate_t[2]}}<sup>{{fromDate_t[3]}}</sup>
                <br> <b> Time Until Expiry: </b> {{to_t}} {{toDate_t[0]}} {{toDate_t[1]}} {{toDate_t[2]}}<sup>{{toDate_t[3]}}</sup>
                <br><img height="50px" width="150px" src="../../assets/barcode.png" alt=""></div>
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

   
  </div>
</template>

<script>
import Bitcoin from './Payments/Bitcoin'
import Cash from './Payments/Cash'
import CreditCard from './Payments/CreditCard'

  export default {
    props : ['time', 'from', 'to', 'fromDate', 'toDate', 'length','id'],
    components: { Bitcoin, Cash, CreditCard },
    data () {
      return {
        num_time : this.time,
        from_t : this.from,
        to_t : this.to,
        fromDate_t : this.fromDate,
        toDate_t : this.toDate,
        length_t : this.length,
        id_t : this.id,
        bitcoins : parseFloat(parseFloat(this.time).toFixed(9) / parseFloat(5670.81).toFixed(9)).toFixed(9)
      }
    },
    methods: {
    nextClicked(currentPage) {
      console.log('next clicked', currentPage)
      return true; 
    },
    backClicked(currentPage) {
      console.log('back clicked', currentPage);
      return true;
    },
    showModal () {
      this.$refs.myModalRef.show()
      this.$parent.reset()
      
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
  }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

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
