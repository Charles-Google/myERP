<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { loginRules } from "../utils/rules";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import User from "@iconify-icons/ep/user";
import Lock from "@iconify-icons/ep/lock";

defineOptions({ name: "LoginForm" });

const props = defineProps<{
  loading?: boolean;
  onLogin: (formEl: FormInstance | undefined) => void;
  onSwitchView: (view: "register" | "forget") => void;
}>();

const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: "admin",
  password: "admin123"
});

const handleLogin = () => {
  props.onLogin(loginFormRef.value);
};
</script>

<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
    class="w-full"
  >
    <el-form-item prop="username" class="!mb-8">
      <el-input
        v-model="loginForm.username"
        placeholder="请输入用户名"
        :prefix-icon="useRenderIcon(User)"
        class="!h-12"
      />
    </el-form-item>

    <el-form-item prop="password" class="!mb-4">
      <el-input
        v-model="loginForm.password"
        type="password"
        show-password
        placeholder="请输入密码"
        :prefix-icon="useRenderIcon(Lock)"
        class="!h-12"
      />
    </el-form-item>

    <div class="flex justify-end mb-8">
      <a
        href="javascript:;"
        class="text-sm text-gray-500 hover:text-gray-700"
        @click="onSwitchView('forget')"
      >
        忘记密码?
      </a>
    </div>

    <div class="w-full flex justify-center">
      <el-button
        type="primary"
        :loading="loading"
        class="!w-1/2 !h-12 !text-base !rounded-full"
        @click="handleLogin"
      >
        登录
      </el-button>
    </div>

    <div class="flex items-center justify-center mt-6 text-sm">
      <span class="text-gray-500">没有账号?</span>
      <a
        href="javascript:;"
        class="text-[#1890ff] hover:text-[#40a9ff] ml-1"
        @click="onSwitchView('register')"
      >
        立即注册
      </a>
    </div>
  </el-form>
</template>
