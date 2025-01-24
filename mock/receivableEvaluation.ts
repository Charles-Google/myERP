import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 生成模拟数据
const generateReceivableData = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const index = i + 1;
    data.push({
      id: String(index),
      date: "2025-1-8",
      orderNo: `XSFKD2024123100${String(count - i).padStart(3, "0")}`,
      businessType: "销售",
      receivableAmount: 10000.0,
      receivedAmount: 3000.0
    });
  }
  return data;
};

export default defineFakeRoute([
  {
    url: "/receivable/evaluation/list",
    method: "post",
    response: ({ body }) => {
      const { page = 1, pageSize = 10 } = body;
      const total = 658;
      const list = generateReceivableData(pageSize);

      return {
        success: true,
        data: {
          list,
          total,
          page,
          pageSize,
          statistics: {
            totalReceivable: 1234567890,
            totalReceived: 1234567890,
            totalUnreceived: 4567890
          }
        }
      };
    }
  },
  {
    url: "/receivable/evaluation/statistics",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          totalReceivable: 1234567890,
          totalReceived: 1234567890,
          totalUnreceived: 4567890
        }
      };
    }
  }
]);
