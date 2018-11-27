<template>
  <form
    class="form-horizontal"
    role="form"
    v-shortkey="{
      swipeCard: ['ctrl' + '8']
    }"
    @shortkey="keyboardShortcut"
  >
  <div class="d-flex justify-content-center">
           <h2>Enter Card Information <u><b>Or</b></u> Swipe Credit Card</h2>
        </div>
        <!-- <vr class="divider"> -->
          

    <fieldset>
    <table class="My_Table">
    <tr>
    <td>
      <div class="d-flex justify-content-left" style="margin-left:10px; width: 335px;">
        <div class="boxE">
          <div class="d-flex justify-content-center">
            <label class="control-label" for="card-holder-name" style="margin-left: 0; ">
              <b>Cardholder Name</b>
            </label>
          </div>

          <input
            type="text"
            class="form-control"
            name="card-holder-name"
            style="margin-left: 5px; text-align: center;"
            id="card-holder-name"
            v-model="cardName"
            placeholder="Cardholder Name"
          >

          <div class="d-flex justify-content-center" style="padding-top: 10px;">
            <label class="control-label" for="card-number" style="margin-left: 5px;">
              <b>Card Number</b>
            </label>
          </div>

          <input
            type="text"
            class="form-control"
            name="card-number"
            style="margin-left: 5px; text-align: center;"
            id="card-number"
            placeholder="Card Number"
            v-model="cardNumber"
            maxlength="16"
            v-on:keypress="isNumber()"
          >

          <div class="d-flex justify-content-center" style="padding-top: 10px;">
            <label class="control-label" for="expiry-month">
              <b>Expiration Date</b>
            </label>
          </div>
          <div class="d-flex justify-content-center">
             <div class="row">
              <div style="margin-right:10px">
                <select
                  class="form-control margin-15"
                  name="expiry-month"
                  id="expiry-month"
                  v-model="cardExpiryMonth"
                >
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
            </div>
               <div class="d-flex justify-content-center">
            <h3 style="padding-right: 10px; padding-top: 14px; padding-left: 40px;">/</h3>
          </div>
           <div class="d-flex justify-content-center">
             <div style="padding-right: 16px; margin-right:13px; ">
              <select class="form-control margin-15" name="expiry-year" v-model="cardExpiryYear" 

              >
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

          <div class="d-flex justify-content-center">
          <label class="control-label" for="cvv" style="margin-left: 5px;" alt="testeroo">
            <b>Security Code</b>
          </label>
          </div>
          <div class="d-flex justify-content-center" style = "padding-top: 10px;">
          <input
            type="text"
            class="form-control"
            name="cvv"
            style="margin-left: 5px; text-align: center; width: 100px;"
            id="cvv"
            placeholder="XXX"
            v-model="cvv"
            maxlength="3"
            v-on:keypress="isNumber()"
          >
          
          </div>
          
        

          <div  style = "padding-top: 20px;">
          <button type="button" v-on:click="processCardPayment()" class="btn btn-success">Pay Now</button>
          </div>
        </div>
       
      
      </div>
      </div>
      </td>
        <td>
          <div class="d-flex justify-content-right">
          <img
            src="/src/renderer/assets/swipe.png"
            style="height: 200px; width: 200px;"
            alt="Swipe" 
          >
        </div>
      </td>
    </tr>
    </table>
    </fieldset>
    
  </form>
</template>

<script>
import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted);

export default {
  name: "bitcoin",
  data() {
    return {
      cardType: "",
      cardName: "",
      cardNumber: "",
      cvv: "",
      cardExpiryMonth: "Month",
      cardExpiryYear: "2018"
    };
  },
  methods: {
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    keyboardShortcut(event) {
      switch (event.srcKey) {
        case "swipeCard":
          this.showToast("Processing card swipe...", "info");
          this.$parent.$parent.showModal1();
          break;
      }
    },
    showToast(msg, type) {
      let options = {
        duration: 3000,
        singleton: true
      };

      if (type) options.type = type;

      Vue.toasted.show(msg, options);
    },
    validateCardForm() {
      if (
        this.cardName == "" ||
        this.cardNumber == "" ||
        this.cvv == "" ||
        this.cardExpiryMonth == "" ||
        this.cardExpiryYear == "" ||
        this.cardExpiryMonth == "Month"
      ) {
        return "Please make sure all of the form fields are filled out";
      }

      if (!/^([0-9]{16})$/.test(this.cardNumber))
        return "Credit Card must be 16 digits long";
      if (!/^([0-9]{3})$/.test(this.cvv))
        return "Invalid field: Card Security Code";
    },
    processCardPayment() {
      let errorMsg = this.validateCardForm();

      if (errorMsg) {
        this.showToast(errorMsg, "error");
        return;
      }

      this.$parent.$parent.showModal1();
    },
    selectCardType(event, type) {
      this.cardType = type;

      // Clear all icon colors
      let cardIcons = document.getElementsByClassName("card-type-icon");
      for (let i = 0; i < cardIcons.length; i++) {
        cardIcons[i].classList.remove("color");
        cardIcons[i].classList.add("grayscale");
      }

      // Set current icon color
      let element = event.currentTarget;

      element.classList.remove("grayscale");
      element.classList.add("color");
    }
  }
};
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
/* div.d-flex justify-content-left{
  max-width: 355px;;
} */
/* .boxF {
  width: 40%;
  display: inline-block;
  padding: 10px;
}
.boxE {
  width: 100%;
  display: inline-block;
  padding: 30px;
} */
.icon {
  height: 50px;
  width: 50px;
}

.My_Table{
    /* width: 544px; */
    max-width: 544px;
    height: 400px;
}
.My_Table TD{ text-align: center; }
.My_Table TD:not(:last-child){ padding-right: 30px; }
.My_Table TD:not(:first-child){
	padding-left: 30px;
	background-size: 2px 100%;
	background-repeat: no-repeat;
	background-position: 0 0;		 
	background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,hsla(0,0%,0%,0)), color-stop(50%,hsla(0,0%,0%,.4)), color-stop(100%,hsla(0,0%,0%,0)));
    background-image: -webkit-linear-gradient(top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.4) 50%, hsla(0,0%,0%,0) 100%); 
    background-image: -moz-linear-gradient(top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.4) 50%, hsla(0,0%,0%,0) 100%);
    background-image: -ms-linear-gradient(top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.4) 50%, hsla(0,0%,0%,0) 100%);
    background-image: -o-linear-gradient(top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.4) 50%, hsla(0,0%,0%,0) 100%);
    background-image: linear-gradient(to bottom, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,.4) 50%, hsla(0,0%,0%,0) 100%);
}
</style>