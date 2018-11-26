<template>
  <form
    class="form-horizontal"
    role="form"
    v-shortkey="{
      swipeCard: ['ctrl' + '8']
    }"
    @shortkey="keyboardShortcut">
    <fieldset>
      <div class="form-group" style="display: flex; flexDirection: column; align-items: center;">
        <label class="control-label" for="card-type">Select a credit card type</label>
        <div>
          <img
            class="icon margin-15 grayscale card-type-icon"
            v-on:click="selectCardType($event, 'VISA')"
            src="./../../../../../static/icons/visa-logo.svg">
          <img
            class="icon margin-15 grayscale card-type-icon"
            v-on:click="selectCardType($event, 'MASTERCARD')"
            src="./../../../../../static/icons/mastercard-logo.svg">
          <img
            class="icon margin-15 grayscale card-type-icon"
            v-on:click="selectCardType($event, 'AMEX')"
            src="./../../../../../static/icons/amex-logo.svg">
        </div>
      </div>
      <div class="form-group" style="display: flex; flexDirection: column; align-items: center;">
        <label class="control-label" for="card-holder-name" style="margin-left: 5px;"><b>Cardholder Name</b></label>
        <div>
          <input type="text" class="form-control" name="card-holder-name" style="margin-left: 5px; text-align: center;"
            id="card-holder-name" v-model="cardName" placeholder="Cardholder Name">
        </div>
      </div>
      <div class="form-group" style="display: flex; flexDirection: column; align-items: center;">
        <label class="control-label" for="card-number" style="margin-left: 5px;"><b>Card Number</b></label>
        <div>
          <input type="text" class="form-control" name="card-number" style="margin-left: 5px; text-align: center;" id="card-number"
            placeholder="Card Number" v-model="cardNumber" maxlength="19" v-on:keypress="isNumber()">
        </div>
      </div>
      <div class="form-group" style="display: flex; flexDirection: column; align-items: center;">
        <label class="control-label" for="expiry-month"><b>Expiration Date</b></label>
        <div class="row">
          <div style="margin-right:15px">
            <select class="form-control margin-15" name="expiry-month" id="expiry-month" v-model="cardExpiryMonth">
              <option>Month</option>
              <option value="01">Jan (01)</option>
              <option value="02">Feb (02)</option>
              <option value="03">Mar (03)</option>
              <option value="04">Apr (04)</option>
              <option value="05">May (05)</option>
              <option value="06">June (06)</option>
              <option value="07">July (07)</option>
              <option value="08">Aug (08)</option>
              <option value="09">Sep (09)</option>
              <option value="10">Oct (10)</option>
              <option value="11">Nov (11)</option>
              <option value="12">Dec (12)</option>
            </select>
          </div>
          <div >
            <h3 style="padding-right: 10px; padding-top: 14px; padding-left: 20px;" >/</h3>
          </div>
          <div style="padding-right: 16px; margin-right:13px">
            <select class="form-control margin-15" name="expiry-year" v-model="cardExpiryYear">
              <option value="18">2018</option>
              <option value="19">2019</option>
              <option value="20">2020</option>
              <option value="21">2021</option>
              <option value="22">2022</option>
              <option value="23">2023</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-=group" style="display: flex; flexDirection: column; align-items: center;">
        <label class="control-label" for="cvv" style="margin-left: 5px;" alt="testeroo"><b>Security Code</b></label>
        <input type="text" class="form-control" name="cvv" style="margin-left: 5px; text-align: center; width: 100px;"
          id="cvv" placeholder="XXX" v-model="cvv" maxlength="3" v-on:keypress="isNumber()">
      </div>
      <div class="form-group">
        <div style="display: flex; flexDirection: column; align-items: center;" class="margin-15">
          <button type="button" v-on:click="processCardPayment()" class="btn btn-success">Pay Now</button>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

export default {
  name: 'bitcoin',
  data() {
    return {
      cardType: '',
      cardName: '',
      cardNumber: '',
      cvv: '',
      cardExpiryMonth: 'Month',
      cardExpiryYear: '2018'
    }

  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) ) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    keyboardShortcut (event) {
      switch(event.srcKey) {
        case 'swipeCard':
          this.showToast('Processing card swipe...', 'info')
          this.$parent.$parent.showModal1()
          break;
      }
    },
    showToast(msg, type) {
      let options = {
        duration: 3000,
        singleton: true
      }

      if (type) options.type = type;

      Vue.toasted.show(msg, options);
    },
    validateCardForm() {
      if (
        this.cardName == '' || this.cardNumber == '' || this.cvv == '' ||
        this.cardExpiryMonth == '' || this.cardExpiryYear == '' || this.cardExpiryMonth == 'Month'
      ) {
        return 'Please make sure all of the form fields are filled out'
      }

      if (this.cardType == '') return 'Please select a Card Type'

      if (!(/^([0-9]{19})$/.test(this.cardNumber))) return 'Invalid field: Card Number'
      if (!(/^([0-9]{3})$/.test(this.cvv))) return 'Invalid field: Card Security Code'
    },
    processCardPayment() {
      let errorMsg = this.validateCardForm();

      if (errorMsg) {
        this.showToast(errorMsg, 'error');
        return;
      }

      this.$parent.$parent.showModal1()
    },
    selectCardType(event, type) {
      this.cardType = type;

      // Clear all icon colors
      let cardIcons = document.getElementsByClassName('card-type-icon');
      for (let i = 0; i < cardIcons.length; i++) {
        cardIcons[i].classList.remove("color");
        cardIcons[i].classList.add("grayscale");
      }

      // Set current icon color
      let element = event.currentTarget;

      element.classList.remove("grayscale");
      element.classList.add("color");
    },
  },
}
</script>
<style>
  .grayscale {
    filter: grayScale(1);
  }

  .color {
    filter: grayScale(0);
  }

  .margin-15 {
    margin: 15px 15px 15px 15px;
  }

  .icon {
    height: 50px;
    width: 50px;
  }
</style>