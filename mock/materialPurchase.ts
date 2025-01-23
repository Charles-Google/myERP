import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 生成模拟数据
const generatePurchaseData = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      purchaseDate: "2025-1-8",
      contractNo: `CGHT${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      material: "螺纹钢",
      specModel: "HRB400E∅18",
      supplier: "四川省川能峰天供应链管理有限公司"
    });
  }
  return data;
};

export default defineFakeRoute([
  {
    url: "/material/purchase/list",
    method: "post",
    response: ({ body }) => {
      const { page = 1, pageSize = 10 } = body;
      const total = 658;
      const list = generatePurchaseData(pageSize);

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
    url: "/material/purchase/statistics",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          todayAmount: "126,560",
          monthAmount: "2,256,890",
          inventory: 12,
          pending: 25
        }
      };
    }
  }
]);
