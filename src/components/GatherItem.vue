<template>
  <div class="gatherItem" v-if="item">
    <div class="gatherItem-top">
      <p class="gatherItem-box"><span class="gatherItem-title">{{item.title}}</span>
      </p>
      <p class="gatherItem-time"><span>{{item.ctime}}</span></p>
    </div>
    <div class="gatherItem-content">
      <p>{{item.content}}</p>
    </div>
    <div class='gatherItem-img'>
      <img :src="item.img">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: ['item']
  }
</script>

<style lang="scss">
  .gatherItem {
    .gatherItem-top {

    }
    .gatherItem-box {
      text-align: center;
    }
    .gatherItem-title {
      letter-spacing: 1px;
      margin-left: 10px;
      font-weight: bold;
      font-size: 20px;
    }
    .gatherItem-time {
      color: #ccc;
      text-align: right;
    }
    .gatherItem-content {
      p {
        text-indent: 2em;
        letter-spacing: 1px;
      }
    }
    .gatherItem-img {
      text-align: center;
      img {
        width: 400px;
        height: 150px;
      }
    }
  }
</style>
