<template>
<div >
   Hello
   <img v-bind:src="image">
   {{hello}}
  </div>
</template>

<script>
import QRCode from 'qrcode'
// let hello = '';
export default{
    name : 'bitcoin',
    data (){
        return{
            image : ''
        }
        
    },
    methods : {
        getQR(){
            
        QRCode.toDataURL('I am a pony!', function (err, url) {
        console.log(url)
        })

        }
    },
    beforeMount (){
        this.getQR()
    }
}
</script>
<style>

</style>