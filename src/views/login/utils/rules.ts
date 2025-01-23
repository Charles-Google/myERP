import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { $t, transformI18n } from "@/plugins/i18n";

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

/** 登录校验 */
export const loginRules = reactive(<FormRules>{
  username: [
    {
      required: true,
      message: () => transformI18n($t("login.pureUsernameReg")),
      trigger: "blur"
    }
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error(transformI18n($t("login.purePassWordReg"))));
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error(transformI18n($t("login.purePassWordRuleReg"))));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});

/** 注册校验 */
export const registerRules = reactive(<FormRules>{
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    },
    {
      min: 4,
      max: 20,
      message: "长度在 4 到 20 个字符",
      trigger: "blur"
    }
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!REGEXP_PWD.test(value)) {
          callback(
            new Error("密码格式应为8-18位数字、字母、符号的任意两种组合")
          );
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: "请确认密码",
      trigger: "blur"
    },
    {
      validator: (rule, value, callback, source) => {
        if (value !== source.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "blur"
    },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: "blur"
    }
  ]
});

/** 忘记密码校验 */
export const forgetRules = reactive(<FormRules>{
  email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "blur"
    },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: "blur"
    }
  ]
});
