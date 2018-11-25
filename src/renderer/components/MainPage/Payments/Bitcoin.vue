<template>
<div>
  <img src="/src/renderer/assets/QR.svg" alt="QR Code not avaiable">
 <br>
 <div> 
     Bitcoins : {{bitcoin}}
     <br>
    Wallet : {{wallet}}
</div>
</div>

</template>

<script>
export default{
    name : 'bitcoin',
    props : ['amount'],
    data() {
        return {
            bitcoin: this.amount,
            wallet : '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
        }
    },
    methods : {
        getQR(){
            
        }
    },
}
</script>
<style>

</style>