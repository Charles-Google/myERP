import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/supplier",
  name: "Supplier",
  component: () => import("@/layout/index.vue"),
  redirect: "/supplier/list",
  meta: {
    icon: "ri:user-settings-line",
    title: "供应商管理",
    rank: 2,
    showLink: true
  },
  children: [
    {
      path: "/supplier/list",
      name: "SupplierList",
      component: () => import("@/views/supplier/list/index.vue"),
      meta: {
        title: "供应商列表",
        showLink: true
      }
    }
  ]
} as RouteRecordRaw;
