<template>
<div >
   {{image}}
   Im a bitch!
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