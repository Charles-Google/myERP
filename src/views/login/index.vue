<script setup lang="ts">
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rules";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { illustration } from "./utils/static";
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from "vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import ForgetForm from "./components/ForgetForm.vue";

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

// 新增状态管理
const currentView = ref<"login" | "register" | "forget">("login");

// 表单数据
const loginForm = reactive({
  username: "admin",
  password: "admin123"
});

const registerForm = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  email: ""
});

const forgetForm = reactive({
  email: ""
});

// 表单规则
const registerRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
  ]
});

const forgetRules = reactive({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
  ]
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .loginByUsername({ username: loginForm.username, password: "admin123" })
        .then(res => {
          if (res.success) {
            // 获取后端路由
            return initRouter().then(() => {
              router.push(getTopMenu(true).path).then(() => {
                message("登录成功", { type: "success" });
              });
            });
          } else {
            message("登录失败", { type: "error" });
          }
        })
        .finally(() => (loading.value = false));
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});

// 处理函数
const handleRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 实现注册逻辑
      console.log("注册信息:", registerForm);
    }
  });
};

const handleForgetPassword = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 实现忘记密码逻辑
      console.log("重置密码邮箱:", forgetForm.email);
    }
  });
};

// 视图切换函数
const switchView = (view: "login" | "register" | "forget") => {
  currentView.value = view;
};
</script>

<template>
  <div
    class="relative min-h-screen w-full bg-[#1890ff] flex items-center justify-center"
  >
    <!-- 登录卡片 - 调整为更大的相对尺寸 -->
    <div
      class="w-[65%] h-[68vh] bg-white rounded-lg shadow-lg flex overflow-hidden"
    >
      <!-- 左侧插画区域 - 使用相对尺寸 -->
      <div class="w-50% bg-white p-12 flex items-center justify-center">
        <component :is="toRaw(illustration)" class="w-4/5 h-auto" />
      </div>

      <!-- 右侧表单区域 - 使用相对尺寸 -->
      <div class="w-50% px-[8%] py-[5%] flex flex-col">
        <!-- 固定标题部分 -->
        <h2 class="text-2xl font-normal text-center mt-8 mb-6 flex-none">
          四川交建材料公司信息化管控平台
        </h2>

        <!-- 表单切换容器 -->
        <div class="relative flex-1 flex items-center">
          <transition name="form-switch" mode="out-in">
            <component
              :is="
                currentView === 'login'
                  ? LoginForm
                  : currentView === 'register'
                    ? RegisterForm
                    : ForgetForm
              "
              :loading="loading"
              :onLogin="onLogin"
              :onRegister="handleRegister"
              :onForgetPassword="handleForgetPassword"
              :onSwitchView="switchView"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
:deep(.el-input__wrapper) {
  @apply !bg-transparent !shadow-none !border-b !border-gray-200 !rounded-none !px-0;

  &:hover,
  &.is-focus {
    @apply !border-b-2 !border-[#1890ff] !shadow-none;
    box-shadow: none !important;
  }

  .el-input__inner {
    @apply !text-base !text-gray-700;

    &::placeholder {
      @apply !text-gray-400;
    }
  }
}

:deep(.el-button--primary) {
  @apply !bg-[#ff4d7f] !border-none;
  background: #ff4d7f !important;

  &:hover {
    @apply !opacity-90;
  }
}

/* 输入框图标颜色 */
:deep(.el-input__prefix-inner svg) {
  @apply !text-gray-400;
}

/* 响应式处理 */
@screen lg {
  .login-container {
    @apply px-8;
  }
}

@screen md {
  .login-box {
    @apply w-[95%] flex-col;
  }

  .illustration-container {
    @apply w-full h-1/3;
  }

  .form-container {
    @apply w-full h-2/3 px-8;
  }
}

@screen sm {
  .login-box {
    @apply h-screen;
  }
}

/* 优化切换动画 */
.form-switch-enter-active,
.form-switch-leave-active {
  transition: all 0.3s ease;
  position: absolute;
  width: 100%;
}

.form-switch-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.form-switch-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 确保表单容器始终居中 */
.form-container {
  @apply flex items-center justify-center;
  min-height: 400px; /* 设置最小高度确保表单始终有足够空间 */
}
</style>
