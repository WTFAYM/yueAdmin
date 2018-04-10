<template>
  <div>
    <p class="page-container">404 page not found</p>
    <p class="page-container mt20">{{sec}}秒后跳转到首页 </p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        sec: 3
      }
    },
    created () {
      setInterval(() => {
        if (this.sec < 0) {
          return
        }
        this.sec--
      }, 1000)
      setTimeout(() => {
        this.$router.replace('/index')
      }, 3000)
    }
  }
</script>

<style lang="scss">
  .page-container {
    font-size: 20px;
    text-align: center;
    color: rgb(192, 204, 218);
  }

  .mt20 {
    margin-top: 20px;
  }
</style>
