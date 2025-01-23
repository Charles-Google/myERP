<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { forgetRules } from "../utils/rules";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Message from "@iconify-icons/ep/message";

defineOptions({ name: "ForgetForm" });

const props = defineProps<{
  loading?: boolean;
  onForgetPassword: (formEl: FormInstance | undefined) => void;
  onSwitchView: (view: "login" | "register") => void;
}>();

const forgetFormRef = ref<FormInstance>();
const forgetForm = reactive({
  email: ""
});

const handleForgetPassword = () => {
  props.onForgetPassword(forgetFormRef.value);
};
</script>

<template>
  <el-form
    ref="forgetFormRef"
    :model="forgetForm"
    :rules="forgetRules"
    class="w-full"
  >
    <div class="mb-8 text-center text-gray-500">
      请输入您的注册邮箱，我们将向您发送重置密码的链接
    </div>

    <el-form-item prop="email" class="!mb-8">
      <el-input
        v-model="forgetForm.email"
        placeholder="请输入注册邮箱"
        :prefix-icon="useRenderIcon(Message)"
        class="!h-12"
      />
    </el-form-item>

    <div class="w-full flex justify-center">
      <el-button
        type="primary"
        :loading="loading"
        class="!w-1/2 !h-12 !text-base !rounded-full"
        @click="handleForgetPassword"
      >
        发送重置链接
      </el-button>
    </div>

    <div class="flex items-center justify-center mt-6 text-sm">
      <a
        href="javascript:;"
        class="text-[#1890ff] hover:text-[#40a9ff]"
        @click="onSwitchView('login')"
      >
        返回登录
      </a>
    </div>
  </el-form>
</template>
