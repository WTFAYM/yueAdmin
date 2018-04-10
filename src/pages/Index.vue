<template>
  <div class="fillcontain">
    <el-row>
      <header-top @changeCollapse="Collapse"></header-top>
    </el-row>
    <el-row class="container">
      <el-col :span="24" class="menu">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router
                 :collapse="isCollapse">
          <el-menu-item :index="'/home'">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item :index="'/user'">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">活动管理</span>
            </template>
            <el-menu-item index="/Activity">活动列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">动态管理</span>
            </template>
            <el-menu-item index="/Dynamic">动态列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">树洞管理</span>
            </template>
            <el-menu-item index="/Tree">树洞列表</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">标签管理</span>
            </template>
            <el-menu-item index="/Label">标签列表</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">专栏管理</span>
            </template>
            <el-menu-item index="/Gather">专栏列表</el-menu-item>
            <el-menu-item index="/addGather">添加专栏</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">推送管理</span>
            </template>
            <el-menu-item index="/Spread">推送列表</el-menu-item>
            <el-menu-item index="/addSpread">添加推送</el-menu-item>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-warning"></i>
              <span slot="title">管理员</span>
            </template>
            <el-menu-item index="/customService">客服</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="24" class="main">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import HeaderTop from '../components/header.vue'

  export default {
    data () {
      return {
        isCollapse: false
      }
    },
    components: {
      HeaderTop
    },
    methods: {
      Collapse (data) {
        this.isCollapse = data
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/common";

  .container {
    display: flex;
    position: absolute;
    top: 56px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .menu {
      flex: 0 0 60px;
      height: 100%;
      width: 200px;
      .el-menu-vertical-demo {
        height: 100%;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
      }
    }
    .main {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
  }
</style>
