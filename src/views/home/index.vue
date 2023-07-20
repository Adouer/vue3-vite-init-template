<template>
  <el-container>
    <!-- <el-button @click="out">注销</el-button> -->
    <el-aside width="250px">
      <Sidebar />
      <UserInfo />
    </el-aside>
    <el-container>
      <ChatArea />
      <el-aside width="200px">
        <UserList />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar/index.vue'
import UserInfo from './UserInfo/index.vue'
import ChatArea from './ChatArea/index.vue'
import UserList from './UserList/index.vue'
import { ref } from "vue";

import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import RoutePath from "@/config/route-path";
// 拿小仓库
const userStore = useUserStore();
const router = useRouter();


// 退出
const out = async () => {
  let result = await userStore.userLogout();
  if (result) {
    //退出成功
    router.push(RoutePath.LOGIN);
  }else{
    ElMessage({
      message:'退出失败！',
      type:'error'
    })
  }
}

</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-aside {
  padding: 20px;
  background-color: #2f3136;
  color: white;
}
</style>
