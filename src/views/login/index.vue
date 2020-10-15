<template>
  <div class="login-box">
    <img class="login-img" :src="loginImg" alt="">
      <p class="title">宝汇冷链电商配送中心登录平台</p>
      <div class="login-from">
          <p>欢迎登录</p>
          <el-form>
            <el-form-item prop="username">
              <span class="svg-container">
                <!-- <svg-icon icon-class="user" /> -->
                <i class="el-icon-user f30" />
              </span>
              <input class="username" type="text" v-model="loginForm.loginName" placeholder="请输入用户名"> 
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <!-- <svg-icon icon-class="user" /> -->
                <i class="el-icon-lock f30" />
              </span>
              <input class="username" type="password" v-model="loginForm.password" placeholder="请输入密码"> 
            </el-form-item>
            <el-button type="primary" @click="login" :loading="isLoading">登录</el-button>
          </el-form>
      </div>
  </div>
</template>

<script>
const login_img = require('@/assets/login_images/login_bg.jpg')
import { login } from '@/api/user'
import  Tools  from '@/utils/tools'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loginImg:login_img,
      loginForm: {
        loginName: 'jsxa',
        password: 'admin123456'
      },
      isLoading:false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    login(){
      console.log('dainji')
      if(Tools.isEmpty(this.loginForm.loginName)){
        this.$message({
            message: '请输入账号',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(this.loginForm.password)){
        this.$message({
            message: '请输入密码',
            type: 'warning'
        });
        return
      }
      this.isLoading = true
      this.$store.dispatch('user/login',this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-img{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
.login-box{
  width: 100%;
  height: 100%;
  padding-top: 10vh;
}
.title{
  text-align: center;
  color: #ffffff;
  font-size: 48px;
  margin-bottom: 77px;
}
.login-from{
  width: 564px;
  height: 560px;
  border-radius: 10px;
  background: #ffffff;
  padding-top: 67px;
  margin: 0 auto;
  p {
    font-size: 36px;
    text-align: center;
  }
}
.el-form{
  margin-top: 53px;
}
.el-form-item{
  width: 429px;
  margin: 0 auto;
  margin-bottom: 55px;
  border-bottom: 1px solid #333333;
  padding: 0 10px;
}
.username{
  width: 90%;
  height: 50px;
  margin-left: 10px;
  border: none;
  outline: none;
  font-size: 24px;
  color: #333333;
}
.el-button{
  width: 355px;
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  padding: 0;
  margin: 0 auto;
  margin-top: 50px;
  display: block;
}
</style>
