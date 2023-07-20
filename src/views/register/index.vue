<template>
    <el-container class="container">
        <el-row class="row">
            <el-col :span="24" class="col">
                <h2 class="title">注册</h2>
                <p class="description">balabala</p>
                <el-form ref="form" :model="formData" :rules="registerRules" label-width="150px" class="login-form">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formData.username" @input="clearError"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" >
                        <el-input type="password" v-model="formData.password" @input="clearError"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input type="password" v-model="formData.confirmPassword" @input="clearError"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register" :loading="isLoading">注册</el-button>
                    </el-form-item>
                    <el-link type="primary" @click="login">已有账号？去登录</el-link>
                </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>
  
<script setup lang="ts">
import { User } from '@/api/type';
import { ref, reactive, computed } from 'vue';
import useUserStore from '@/store/modules/user'
import { useRouter } from "vue-router";
import RoutePath  from "@/config/route-path";
import { ElMessage } from 'element-plus';


const router = useRouter();
const form = ref();
const userStore = useUserStore();
const isLoading = ref(false);

const formData = reactive<User.RegisterFormData>({
    username: '',
    password: '',
    confirmPassword: '',
})
// 校验规则
const registerRules = computed(() => ({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 16, message: '密码长度必须在8-16位之间', trigger: 'blur' },
        { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, message: '密码必须包含至少一位字母和一位数字', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
    ]
}));

const validateConfirmPassword = (rule: any, value: string, callback: any) => {
    if (value !== formData.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

const register = async () => {
    isLoading.value = true;
    const valid = await new Promise<boolean>((resolve) => {
        form.value.validate((valid: boolean) => {
            resolve(valid);
        });
    });

    if (!valid) {
        isLoading.value = false;
        return;
    }

    let result = await userStore.userRegister(formData);
    if (result) {
        //提示错误信息
        ElMessage({
            type: 'success',
            message: '注册成功！跳转登录页..'
        })
        router.push(RoutePath.LOGIN)
    }
    isLoading.value = false;
}

const clearError = () => {
    form.value.clearValidate();
}

const login = () => {
    router.push(RoutePath.LOGIN);
}
</script>
  
<style lang="scss" scoped>
@import "../login/index.scss";
</style>
  