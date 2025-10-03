<template>
  <el-container>
    <el-main>
      <el-card class="login-card">

        <div class="card-title">
          <div class="logo-wrapper">
            <img src="../images/base/logo-DMS.png" class="logo">
          </div>

          <div class="room-name">{{ room_name }}</div>
        </div>

        <div class="login-form-wrapper">

          <el-alert :title="loginError" type="error" v-if="loginError" class="login-alert" show-icon inline-message="true"></el-alert>

          <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" status-icon>

            <el-form-item prop="studentid">
              <el-input v-model="loginData.studentid" placeholder="请输入学号" prefix-icon="User"></el-input>
            </el-form-item>

            <el-form-item prop="password" style="margin-bottom: 8px;">
              <el-input v-model="loginData.password" type="password" placeholder="请输入密码" prefix-icon="Lock"></el-input>
            </el-form-item>

            <div class="login-edit">
              <div @click="handleRegister">注册</div>
              <div @click="handleForgotPassword">忘记密码?</div>
            </div>

            <el-form-item>
              <el-button type="primary" class="login-btn" @click="handleLogin">立即登录</el-button>
            </el-form-item>

          </el-form>

        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router' // 引入路由钩子

    const router = useRouter() // 创建路由实例

  const room_name = ref("杏园一舍603男生寝室")
  const loginData = ref({
    studentid: '',
    password: ''
  })
  const loginFormRef = ref(null)
  const loginError = ref('')

  const loginRules = ref({
    studentid: [
      {required: true, message: '请输入学号', trigger: 'blur'},
      {min: 15, max: 15, message: '学号长度为15位', trigger: 'change'},
      {min: 15, max: 15, message: '学号长度为15位', trigger: 'blur'}
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur'}]
  })

  function handleLogin() {
    loginFormRef.value.validate(valid => {
      if (valid) {
        // 模拟登录请求
        setTimeout(() => {
          if (loginData.value.studentid === '012345678912345' && loginData.value.password === '012345678912345') {
            alert('登录成功')
            router.push('/index')
          } else {
            loginError.value = '学号或密码错误'
          }
        }, 1000)
      }
    })
  }

  function handleRegister() { alert('注册') }

  function handleForgotPassword() { alert('忘记密码') }
</script>

<style scoped>
  @import url("../styles/login/structure.css");
  @import url("../styles/login/card-title.css");
  @import url("../styles/login/login-form-wrapper.css");
</style>