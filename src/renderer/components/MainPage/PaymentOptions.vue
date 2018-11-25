<template>
  <div>
    <div class="title">Information</div>
    <div class="items">
      <div class="item">
        <div class="name">Current Time</div>
        <div class="value"></div>
      </div>
      <div class="item">
        From to
      </div>
      {{num_time}}
      {{from_t}}
      {{to_t}}
      {{fromDate_t}}
      {{toDate_t}}
      {{length_t}}
      {{bitcoins}}
      <br>
    </div>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion1 variant="info">Accordion 1</b-btn>
      </b-card-header>
      <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
            I start opened because <code>visible</code> is <code>true</code>
          </p>
          <p class="card-text">
            Im a flop
          </p>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion2 variant="info">Credit Card</b-btn>
      </b-card-header>
      <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <form class="form-horizontal" role="form">
            <fieldset>
              <div class="form-group" style="display: flex; flexDirection: column; align-items: center;">
                <label class="control-label" for="card-type">Select a credit card type</label>
                <div>
                  <img class="icon margin-15 grayscale card-type-icon" v-on:click="selectCardType($event, 'VISA')" src="./../../../../static/icons/visa-logo.svg">
                  <img class="icon margin-15 grayscale card-type-icon" v-on:click="selectCardType($event, 'MASTERCARD')" src="./../../../../static/icons/mastercard-logo.svg">
                  <img class="icon margin-15 grayscale card-type-icon" v-on:click="selectCardType($event, 'AMEX')" src="./../../../../static/icons/amex-logo.svg">
                </div>
              </div>
              <div class="form-group" style="display: flex; flexDirection: column; align-items: center;">
                  <label class="control-label" for="card-holder-name" style="margin-left: 5px;"><b>Cardholder Name</b></label>
                  <div>
                    <input type="text" class="form-control" name="card-holder-name" style="margin-left: 5px; text-align: center;" id="card-holder-name" v-model="cardName" placeholder="Cardholder Name">
                  </div>
              </div>
              <div class="form-group" style="display: flex; flexDirection: column; align-items: center;">
                <label class="control-label" for="card-number" style="margin-left: 5px;"><b>Card Number</b></label>
                <div>
                  <input type="text" class="form-control" name="card-number" style="margin-left: 5px; text-align: center;" id="card-number" placeholder="Card Number" v-model="cardNumber" maxlength="19">
                </div>
              </div>
              <div class="form-group" style="display: flex; flexDirection: column; align-items: center;">
                <label class="control-label" for="expiry-month"><b>Expiration Date</b></label>
                <div class="row">
                  <div>
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
                  <div style="margin-left: 20px;">
                    <select class="form-control margin-15" name="expiry-year" v-model="cardExpiryYear">
                      <option value="13">2013</option>
                      <option value="14">2014</option>
                      <option value="15">2015</option>
                      <option value="16">2016</option>
                      <option value="17">2017</option>
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
                <input type="text" class="form-control" name="cvv" style="margin-left: 5px; text-align: center; width: 100px;" id="cvv" placeholder="XXX" v-model="cvv" maxlength="3">
              </div>
              <div class="form-group">
                <div style="display: flex; flexDirection: column; align-items: center;" class="margin-15">
                  <button type="button" v-on:click="processCardPayment()" class="btn btn-success">Pay Now</button>
                </div>
              </div>
            </fieldset>
          </form>
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
            <bitcoin v-bind:amount="bitcoins"> </bitcoin>
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

import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

  export default {
    props : ['time', 'from', 'to', 'fromDate', 'toDate', 'length'],
    components: { Bitcoin, Cash, CreditCard },
    data () {
      return {
        cardType : '',
        cardName: '',
        cardNumber: '',
        num_time : this.time,
        from_t : this.from,
        to_t : this.to,
        fromDate_t : this.fromDate,
        toDate_t : this.toDate,
        length_t : this.length,
        bitcoins : parseFloat(parseFloat(this.time).toFixed(9) / parseFloat(5670.81).toFixed(9)).toFixed(9),
        cvv: '',
        cardExpiryMonth: 'Month',
        cardExpiryYear: '2013'
      }
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
      validateCardForm() {
        if (
          this.cardName == '' || this.cardNumber == '' || this.cvv == '' ||
          this.cardExpiryMonth == '' || this.cardExpiryYear == '' || this.cardExpiryMonth == 'Month'
        ) {
          return 'Please make sure all of the form fields are filled out'
        }

        if (this.cardType == '') return 'Please select a Card Type'

        if (!(/^([0-9]{19})$/.test(this.cardNumber))) return 'Invalid field: Card Number'
        if (!(/^([0-9]{3})$/.test(this.cvv)))  return 'Invalid field: Card Security Code'
      },
      processCardPayment() {
        let errorMsg = this.validateCardForm();

        if (errorMsg) {
          this.showToast(errorMsg, 'error');
          return;
        }

        this.showToast('Payment successful', 'success');
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
      nextClicked(currentPage) {
        console.log('next clicked', currentPage);
        return true; 
      },
      backClicked(currentPage) {
        console.log('back clicked', currentPage);
        return true;
      }
    }
  }
</script>

<style scoped>
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
