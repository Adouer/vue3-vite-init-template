<template>
  <el-container class="container">
    <el-row class="row" :gutter="20">
      <el-col :span="24" class="col">
        <h2 class="title">欢迎回来！</h2>
        <p class="description">We're so excited to see you again!</p>
        <el-form
          ref="form"
          :model="formData"
          :rules="loginRules"
          label-width="120px"
          class="login-form"
        >
          <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup lang="ts">
import { User } from '@/api/type'
import { ref, reactive } from 'vue'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
const form = ref()

const formData = reactive<User.LoginFormData>({
  username: '',
  password: '',
})
// 校验的规则
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
// 登录方法
const login = async () => {
  // 校验
  await form.value.validate((valid: boolean) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
  try {
    // 调用仓库执行登录
  } catch (error) {
    //登录失败处理
  }
}
</script>

<style scoped>
.container {
  width: 400px;
  margin: 0 auto;
  padding: 100px 0;
}

.row {
  background: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.col {
  text-align: center;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  color: #999;
  margin-bottom: 30px;
}

.login-form {
  text-align: left;
}
</style>
