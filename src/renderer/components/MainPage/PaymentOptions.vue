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
        <b-btn block href="#" v-b-toggle.accordion2 variant="info">Accordion 2</b-btn>
      </b-card-header>
      <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
            I am a gordo
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

  export default {
    props : ['time', 'from', 'to', 'fromDate', 'toDate', 'length'],
    components: { Bitcoin, Cash, CreditCard },
    data () {
      return {
        num_time : this.time,
        from_t : this.from,
        to_t : this.to,
        fromDate_t : this.fromDate,
        toDate_t : this.toDate,
        length_t : this.length,
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
