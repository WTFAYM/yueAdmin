<template>
  <el-col :span="24" class="header_container clear">
    <el-col :span="10" class="logo" v-show="!Collapse">
      ShareCard
    </el-col>
    <el-col :span="10" class="clear">
      <div class="grid-content tools" @click="isCollapse">
        <i class="el-icon-more"></i>
      </div>
    </el-col>
    <el-col :span="4" class="clear userInfo">

      <el-dropdown trigger="hover">
        <div class="el-dropdown-link userInfo-inner">
          <div>
            <span>Admin</span>
            <img src="http://139.199.188.40/img/01.jpg"/>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="padding: 0 5px">我的消息</el-dropdown-item>
          <el-dropdown-item style="padding: 0 5px" @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>

</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        Collapse: false
      }
    },
    methods: {
      isCollapse () {
        this.Collapse = !this.Collapse
//        console.log(this.Collapse)
        this.$emit('changeCollapse', this.Collapse)
      },
//      退出登录
      logout: function () {
        let _this = this
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          _this.$router.push('/')
        }).catch(() => {

        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/common";

  .header_container {
    width: 100%;
    height: 56px;
    max-height: 56px;
    background: #1F2D3D;
    .logo {
      color: #fff;
      text-align: center;
      font: 600 30px/56px "微软雅黑";
      width: 200px;
      float: left;
    }
    .tools {
      color: #fff;
      padding-left: 23px;
      float: left;
      cursor: pointer;
      font: 600 20px/56px "微软雅黑";
    }
    .userInfo {
      text-align: right;
      padding-right: 10px;
      float: right;
      height: 56px;
      line-height: 56px;
      .userInfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 8px 0px 8px 4px;
          float: right;
        }
        span {
          font-size: 18px;
        }
      }
    }
    .el-menu-vertical-demo {
      height: 100%;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      height: 100%;
    }
  }
</style>
