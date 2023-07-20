<template>
  <el-container class="container" style="background-color:pink;">
    <el-row class="row">
      <el-col :span="24" class="col" >
        <h2 class="title">登录</h2>
        <p class="description">balabala</p>
        <el-form ref="form" :model="formData" :rules="loginRules" label-width="150px" class="login-form">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" @input="clearError"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password" @input="clearError"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" :loading="isLoading">登录</el-button>
          </el-form-item>
          <el-link type="primary" @click="forgotPassword">忘记密码？</el-link>
          <el-link type="primary" @click="register">注册</el-link>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup lang="ts">
import { User } from '@/api/type';
import { ref, reactive, computed } from 'vue';
import RoutePath  from "@/config/route-path";

//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref();
const userStore = useUserStore();
const isLoading = ref(false); //登录按钮是否被禁止

const formData = reactive<User.LoginFormData>({
  username: '',
  password: '',
})
// 校验的规则
const loginRules = computed(() => ({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '密码长度必须在8-16位之间', trigger: 'blur' },
    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, message: '密码必须包含至少一位字母和一位数字', trigger: 'blur' }
  ]
}));

// 登录方法
const login = async () => {
  // 登录过程禁用登录按钮，防止用户二次点击
  isLoading.value = true;
  //校验表单
  const valid = await new Promise<boolean>((resolve) => {
    form.value.validate((valid: boolean) => {
      resolve(valid);
    });
  });
  // 校验失败返回
  if (!valid) {
    isLoading.value = false;
    return;
  }
  // 调用仓库执行登录
  let result = await userStore.userLogin(formData);
  if (result) {
    // 跳转到首页
    router.push(RoutePath.HOME);
  }
  isLoading.value = false;
}
// 清除之前的表单验证错误信息
const clearError = () => {
  form.value.clearValidate();
}
const forgotPassword = () => {
  router.push("/forgot-password"); // 假设这是你的忘记密码页面路由
}

// 注册处理
const register = () => {
  router.push(RoutePath.REGISTER); // 假设这是你的注册页面路由
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
