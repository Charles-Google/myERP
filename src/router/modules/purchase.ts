import { RouteRecordRaw } from "vue-router";

export default {
  path: "/purchase",
  name: "Purchase",
  component: () => import("@/layout/index.vue"),
  redirect: "/purchase/order",
  meta: {
    icon: "ri:shopping-cart-line",
    title: "采购管理",
    rank: 4,
    showLink: true
  },
  children: [
    {
      path: "/purchase/order",
      name: "PurchaseOrder",
      component: () => import("@/views/purchase/order/index.vue"),
      meta: {
        title: "采购订单",
        showLink: true
      }
    }
  ]
} as RouteRecordRaw;
