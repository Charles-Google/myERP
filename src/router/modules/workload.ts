import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/workload",
  name: "Workload",
  component: () => import("@/layout/index.vue"),
  redirect: "/workload/config",
  meta: {
    icon: "ri:settings-3-line",
    title: "工作量配置",
    rank: 7,
    showLink: true
  },
  children: [
    {
      path: "/workload/config",
      name: "WorkloadConfig",
      component: () => import("@/views/workload/config/index.vue"),
      meta: {
        title: "配置管理",
        showLink: true
      }
    }
  ]
} as RouteRecordRaw;
