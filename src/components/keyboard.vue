<template>
  <div class="val-cont" @click="getKeyboardValue" :data-value="val">
    {{val}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      val: ''
    },
    methods: {
      getKeyboardValue (event) {
        let value = event.target.dataset.value
        this.$store.commit('calculate', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .val-cont {
    float: left;
    width: 68px;
    text-align: center;
    font-size: 16px;
    line-height: 16px;
    padding: 26px 0;
    background: #fff;
    margin: 1px;
  }
  .val-cont:hover {
    background: orangered;
    color: #fff;
  }
</style>
