import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 生成模拟数据
const generatePayableData = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const index = i + 1;
    data.push({
      id: String(index),
      date: "2025-1-8",
      orderNo: `CGFKD2024123100${String(count - i).padStart(3, "0")}`,
      businessType: "采购",
      payableAmount: 10000.0,
      paidAmount: 3000.0
    });
  }
  return data;
};

export default defineFakeRoute([
  {
    url: "/payable/evaluation/list",
    method: "post",
    response: ({ body }) => {
      const { page = 1, pageSize = 10 } = body;
      const total = 658;
      const list = generatePayableData(pageSize);

      return {
        success: true,
        data: {
          list,
          total,
          page,
          pageSize,
          statistics: {
            totalPayable: 1234567890,
            totalPaid: 1234567890,
            totalUnpaid: 4567890
          }
        }
      };
    }
  },
  {
    url: "/payable/evaluation/statistics",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          totalPayable: 1234567890,
          totalPaid: 1234567890,
          totalUnpaid: 4567890
        }
      };
    }
  }
]);
