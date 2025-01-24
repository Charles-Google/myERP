import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/basic",
  name: "Basic",
  component: () => import("@/layout/index.vue"),
  redirect: "/basic/material",
  meta: {
    icon: "ri:database-2-line",
    title: "基础资料管理",
    rank: 3,
    showLink: true
  },
  children: [
    {
      path: "/basic/material",
      name: "BasicMaterial",
      component: () => import("@/views/basic/material/index.vue"),
      meta: {
        title: "物料管理",
        showLink: true
      }
    }
  ]
} as RouteRecordRaw;
