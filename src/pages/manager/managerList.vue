<template>
  <div style="padding: 10px">
    管理员列表
    <div class="calu clear">
      <div class="result">
        <!--计算结果：-->
        {{result}}
      </div>
      <div class="enter">
        <!--输入式子-->
        {{enter == "" ? 0 : enter}}
      </div>
      <div class="list">
        <keyboard v-for="item in keys" :val="item"></keyboard>
      </div>
    </div>
  </div>
</template>

<script>
  import Keyboard from '../../components/keyboard.vue'
  export default{
    components: {
      Keyboard
    },
    data () {
      return {
        keys: ['clear', '+', '-', '*', '/', '0', '1', '2', '3',
          '4', '5', '6', '7', '8', '9', '='
        ]
      }
    },
    computed: {
      result () {
        return this.$store.state.result
      },
      enter () {
        return this.$store.state.enter
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common";

  .calu {
    /*border: 1px solid #f6f6f6;*/
    background: #f6f6f6;
    width: 280px;
    box-shadow: 5px 5px 5px #b9b9b9;
    .result {
      text-align: right;
      padding-top: 100px;
      line-height: 40px;
      height: 40px;
      font-size: 30px;
      padding-right: 10px;
    }
    .enter {
      text-align: right;
      line-height: 30px;
      font-size: 20px;
      color: #999;
      padding: 5px 10px;
    }
  }
</style>
