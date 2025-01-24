import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/sale",
  name: "Sale",
  component: () => import("@/layout/index.vue"),
  redirect: "/sale/order",
  meta: {
    icon: "ri:money-dollar-circle-line",
    title: "销售管理",
    rank: 5,
    showLink: true
  },
  children: [
    {
      path: "/sale/order",
      name: "SaleOrder",
      component: () => import("@/views/sale/order/index.vue"),
      meta: {
        title: "销售订单",
        showLink: true
      }
    }
  ]
} as RouteRecordRaw;
