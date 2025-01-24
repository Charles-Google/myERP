import type { RouteRecordRaw } from "vue-router";



export default {
  path: "/report",
  name: "Report",
  component: () => import("@/layout/index.vue"),
  redirect: "/report/material-purchase",
  meta: {
    icon: "ri:file-chart-line",
    title: "报表管理",
    rank: 1,
    showLink: true
  },
  children: [
    {
      path: "/report/material-purchase",
      name: "MaterialPurchase",
      component: () => import("@/views/report/material-purchase/index.vue"),
      meta: {
        title: "物料采购台账",
        showLink: true
      }
    },
    {
      path: "/report/material-sale",
      name: "MaterialSale",
      component: () => import("@/views/report/material-sale/index.vue"),
      meta: {
        title: "物料销售台账",
        showLink: true
      }
    },
    {
      path: "/report/payable-evaluation",
      name: "PayableEvaluation",
      component: () => import("@/views/report/payable-evaluation/index.vue"),
      meta: {
        title: "应付评估表",
        showLink: true
      }
    },
    {
      path: "/report/receivable-evaluation",
      name: "ReceivableEvaluation",
      component: () => import("@/views/report/receivable-evaluation/index.vue"),
      meta: {
        title: "应收评估表",
        showLink: true
      }
    }
  ]
} as RouteRecordRaw;
