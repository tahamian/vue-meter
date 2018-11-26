<template>
  <div
    id="wrapper">
    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="Buy A Ticket" active>
          {{this.$parent.tickets}}
          <create-ticket :value="this.$parent.tickets">
          </create-ticket>
        </b-tab>
        <b-tab title="Refund Ticket">
      
          <edit-ticket v-bind:tickets="this.$parent.tickets"></edit-ticket>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import CreateTicket from './CreateTicket'
import EditTicket from './EditTicket'
import { format } from 'url';
  export default {
    name: 'landing-page',
    components: { 
      EditTicket, 
      CreateTicket },
    data () {
      return {
        tickets: [],
      }
  },
  methods: {
    onChildUpdate(newValue) {
      this.tickets = newValue
    }
  }
}
</script>
<style>

</style>
