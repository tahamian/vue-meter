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
    </div>
  </div>
</template>

<script>
  export default {
    props : ['time', 'from', 'to', 'fromDate', 'toDate', 'length'],
    data () {
      return {
        num_time : this.time,
        from_t : this.from,
        to_t : this.to,
        fromDate_t : this.fromDate,
        toDate_t : this.toDate,
        length_t : this.length

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
