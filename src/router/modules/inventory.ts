import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/inventory",
  name: "Inventory",
  component: () => import("@/layout/index.vue"),
  redirect: "/inventory/stock",
  meta: {
    icon: "ri:stack-line",
    title: "库存管理",
    rank: 6,
    showLink: true
  },
  children: [
    {
      path: "/inventory/stock",
      name: "Stock",
      component: () => import("@/views/inventory/stock/index.vue"),
      meta: {
        title: "库存查询",
        showLink: true
      }
    }
  ]
} as RouteRecordRaw;
