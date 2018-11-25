<template>
<div >

<b-card no-body>
  <b-tabs pills card>
    <b-tab title="Buy A Ticket" active>
      <create-ticket :value="tickets">
   </create-ticket>
    </b-tab>


    <b-tab title="Refund Ticket">
    
      <edit-ticket v-bind:tickets="tickets">
      
        </edit-ticket>
    </b-tab>
  </b-tabs>
</b-card>


  </div>
</template>

<script>
import CreateTicket from './CreateTicket'
import EditTicket from './EditTicket'
export default{
    name : 'main-page',
     components: {
       EditTicket,
       CreateTicket,
    },
    data () {
    return {
      tickets : []

    }
    },
    methods : {
      onChildUpdate(newValue) {
      this.tickets = newValue
    }
  }
}
</script>
<style>

</style>