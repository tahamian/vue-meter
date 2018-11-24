<template>
<div >
   {{image}}
  </div>
</template>

<script>
export default{
    name : 'cash',
    props : ["amount"],
    data (){
        return{
            image : 'just do it',
            amount1 : this.amount
        }
        
    },
    methods : {
        
    },
}
</script>
<style>

</style>