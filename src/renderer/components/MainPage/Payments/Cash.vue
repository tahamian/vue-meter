<template>
<div>
	<div
		style="display: flex; justify-content: center; align-items: center; flexDirection: column;"
		v-shortkey="{
			insertPenny: ['ctrl', '1'],
			insertNickel: ['ctrl', '2'],
			insertDime: ['ctrl', '3'],
			insertQuarter: ['ctrl', '4'],
			insertLoonie: ['ctrl', '5'],
			insertToonie: ['ctrl', '6'],
			returnCoins: ['ctrl', '7'] }" 
		@shortkey="keyboardShortcut">

	<h2>Amount due:</h2>
	<p style="font-size: 1.5em;">{{ this.amount }}</p>

	<h2>Current balance:</h2>
	<p style="font-size: 1.5em;">{{ this.balanceDisplay }}</p>

	<button style="margin-top: 10px;" type="button" class="btn btn-success" @click="showModal" :disabled="!paymentReady()">Pay now</button>
	</div>

	<b-modal ref="myModalRef" no-close-on-backdrop no-close-on-esc hide-footer hide-header-close size= "lg">
		<div class="d-block text-center">
			<h3>Printed Receipt</h3>
			<div>
				<div style="font-size: 16px; color: rgba(0, 0, 0, 0.6); padding: 0px 10px 12px; box-sizing: border-box; 
					overflow-y: hidden; position: relative; margin: auto; text-align: center; max-height: 626px;">
					<div style="border: 2px solid rgb(161, 161, 161); background: white; padding: 10px 20px; border-radius: 25px;">
						<img src="../../../assets/avatar.png" alt="">
						<br> <b> Ticket ID: </b>{{$route.params.id}}
						<br> <b>Parking time:</b> {{$route.params.time}}
						<br> <b> Amount:  $</b> {{$route.params.amo}}
						<br> <b> Time of Purchase: </b>  {{$route.params.CurrentDate}} <b>@</b>{{$route.params.CurrentTime}}
						<br> <b> Time Until Expiry: </b> {{$route.params.ExpiryDate}} <b>@</b> {{$route.params.ExpiryTime}}
						<br>
						<br>
						<img height="50px" width="150px" src="../../../assets/barcode.png" alt="">
					</div>
				</div>
			</div>
		</div>
		<b-btn class="mt-3" variant="outline-danger" block @click="hideModal1">Close</b-btn>
	</b-modal>
</div>
</template>

<script>
export default {
  name: "cash",
  props: ["amount"],
  data() {
    return {
			balance: 0
    }
	},
	computed: {
		balanceDisplay: {
			get: function () { return this.formatPrice(this.balance) },
		}
	},
  methods: {
		showModal() {
			this.$refs.myModalRef.show();
		},
		hideModal1() {
			this.$refs.myModalRef.hide();
			this.$router.push({ name: 'Main-Page' })
		},
		paymentReady() {
			return this.balance >= this.amount
		},
    insertCoin (amount) {
      this.balance += amount;
      //this.balanceDisplay = this.formatPrice(this.balance);
      console.log('Insert coin: ', amount);
    },
    returnCoins () {
      this.balance = 0;
      //this.balanceDisplay = this.formatPrice(this.balance);
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
    formatPrice(num) {
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
	}
};
</script>

<style>
</style>