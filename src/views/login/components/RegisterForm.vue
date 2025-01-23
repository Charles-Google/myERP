<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { registerRules } from "../utils/rules";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import User from "@iconify-icons/ep/user";
import Lock from "@iconify-icons/ep/lock";
import Message from "@iconify-icons/ep/message";

defineOptions({ name: "RegisterForm" });

const props = defineProps<{
  loading?: boolean;
  onRegister: (formEl: FormInstance | undefined) => void;
  onSwitchView: (view: "login" | "forget") => void;
}>();

const registerFormRef = ref<FormInstance>();
const registerForm = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  email: ""
});

const handleRegister = () => {
  props.onRegister(registerFormRef.value);
};
</script>

<template>
  <el-form
    ref="registerFormRef"
    :model="registerForm"
    :rules="registerRules"
    class="w-full"
  >
    <el-form-item prop="username" class="!mb-6">
      <el-input
        v-model="registerForm.username"
        placeholder="请输入用户名"
        :prefix-icon="useRenderIcon(User)"
        class="!h-12"
      />
    </el-form-item>

    <el-form-item prop="password" class="!mb-6">
      <el-input
        v-model="registerForm.password"
        type="password"
        show-password
        placeholder="请输入密码"
        :prefix-icon="useRenderIcon(Lock)"
        class="!h-12"
      />
    </el-form-item>

    <el-form-item prop="confirmPassword" class="!mb-6">
      <el-input
        v-model="registerForm.confirmPassword"
        type="password"
        show-password
        placeholder="请确认密码"
        :prefix-icon="useRenderIcon(Lock)"
        class="!h-12"
      />
    </el-form-item>

    <el-form-item prop="email" class="!mb-8">
      <el-input
        v-model="registerForm.email"
        placeholder="请输入邮箱"
        :prefix-icon="useRenderIcon(Message)"
        class="!h-12"
      />
    </el-form-item>

    <div class="w-full flex justify-center">
      <el-button
        type="primary"
        :loading="loading"
        class="!w-1/2 !h-12 !text-base !rounded-full"
        @click="handleRegister"
      >
        注册
      </el-button>
    </div>

    <div class="flex items-center justify-center mt-6 text-sm">
      <span class="text-gray-500">已有账号?</span>
      <a
        href="javascript:;"
        class="text-[#1890ff] hover:text-[#40a9ff] ml-1"
        @click="onSwitchView('login')"
      >
        返回登录
      </a>
    </div>
  </el-form>
</template>
