<template>
  <div style="width: 100%;height: 100%;background:#202020;overflow: hidden;">
    <el-form class="login-container demo-ruleForm" ref="loginForm2" :model="loginForm" :rules="loginRules">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" placeholder="账号" :clearable="true" v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" placeholder="密码" clearable v-model="loginForm.checkPass"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="remember" checked>记住账号</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button style="width:100%;" :loading="logining" @click="submitLogin('loginForm2')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        logining: false,
        checked: true,
        loginForm: {
          account: 'admin',
          checkPass: ''
        },
        loginRules: {
          account: {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          checkPass: {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        }
      }
    },
    created () {

    },
    methods: {
      submitLogin (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.logining = true
            let loginParam = {username: this.loginForm.account, password: this.loginForm.checkPass}
            this.$http.post('api/admin/login', loginParam).then(res => {
              this.logining = false
              if (res.data.code == '200') {
                sessionStorage.setItem('admin', res.data.data)
                this.$router.push({
                  name: 'home'
                })
              } else {
                this.$message({
                  message: '用户名或密码错误',
                  type: 'warning'
                })
              }
            }, err => {
              this.$message({
                message: '网络错误',
                type: 'warning'
              })
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #1F2D3D;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #fff;
    }
    .remember {
      margin: 0px 0px 35px 0px;
      color: #fff;
    }
  }
</style>
