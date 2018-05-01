<template>
  <div class="DynamicItem" v-if="List!=null">
    <div class="DynamicItem-top">
      <h5>动态内容：</h5>
      <p>{{List.content}}</p>
    </div>
    <h5>动态图片</h5>
    <div class="DynamicItem-bottom">
      <img v-lazy="item" v-for="(item,index) in imgs" :key="index">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DynamicItem',
    data () {
      return {
        imgs: []
      }
    },
    props: ['List'],
    created () {
      this.imgs = this.List.img.split('|')
      console.log(this.imgs)
    }
  }
</script>

<style lang="scss">
  .DynamicItem {
    .DynamicItem-top {
      p {
        text-indent: 2em;
        letter-spacing: 1px;
        padding: 10px;
      }
    }
    .DynamicItem-bottom {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      img {
        width: 18%;
        height: 100px;
        margin: 10px;
      }
    }
    h5 {
      margin: 5px 0;
    }
  }
</style>
