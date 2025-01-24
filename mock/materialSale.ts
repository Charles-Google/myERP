// src/mock/material.ts
import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 生成模拟数据
const generateSaleData = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const index = i + 1;
    data.push({
      saleDate: "2025-1-8",
      contractNo: `XSHT202412310000${String(index).padStart(2, "0")}`,
      customerName: "四川省川能峨天供应链管理有限公司",
      materialName: "螺纹钢",
      specModel: "HRB400E∅18"
    });
  }
  return data;
};

export default defineFakeRoute([
  {
    url: "/material/sale/list",
    method: "post",
    response: ({ body }) => {
      const { page = 1, pageSize = 10 } = body;
      const total = 658;
      const list = generateSaleData(pageSize);

      return {
        success: true,
        data: {
          list,
          total,
          page,
          pageSize,
          statistics: {
            totalMaterials: 160000,
            totalAmount: "1,234,567,890"
          }
        }
      };
    }
  },
  {
    url: "/material/sale/statistics",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          todayAmount: "123,456",
          monthAmount: "3,456,789",
          inventory: "45,678",
          pending: "12,345"
        }
      };
    }
  }
]);
