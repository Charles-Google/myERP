import { http } from "@/utils/http";

export type MaterialPurchaseQuery = {
  page: number;
  pageSize: number;
  contractNo?: string;
  materialName?: string;
  supplierName?: string;
  purchaseDate?: string;
};

export type MaterialPurchaseData = {
  purchaseDate: string;
  contractNo: string;
  material: string;
  specModel: string;
  supplier: string;
};

export type MaterialStatistics = {
  todayAmount: string;
  monthAmount: string;
  inventory: number;
  pending: number;
};

/** 获取物料采购列表 */
export const getMaterialPurchaseList = (data: MaterialPurchaseQuery) => {
  return http.request<{
    list: MaterialPurchaseData[];
    total: number;
    statistics: {
      totalMaterials: number;
      totalAmount: string;
    };
  }>("post", "/material/purchase/list", { data });
};

/** 获取物料采购统计数据 */
export const getMaterialStatistics = () => {
  return http.request<MaterialStatistics>(
    "get",
    "/material/purchase/statistics"
  );
};
