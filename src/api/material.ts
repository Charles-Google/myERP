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
  materialName: string;
  specModel: string;
  supplierName: string;
};

export type MaterialPurchaseStatistics = {
  todayAmount: string;
  monthAmount: string;
  inventory: number;
  pending: number;
};

// 物料销售相关类型
export type MaterialSaleQuery = {
  page: number;
  pageSize: number;
  contractNo?: string;
  materialName?: string;
  customerName?: string;
  saleDate?: string;
};

export type MaterialSaleData = {
  saleDate: string;
  contractNo: string;
  customerName: string;
  materialName: string;
  specModel: string;
};

export type MaterialSaleStatistics = {
  todayAmount: string;
  monthAmount: string;
  inventory: string;
  pending: string;
};

/** 获取物料采购列表 */
export const getMaterialPurchaseList = (data: MaterialPurchaseQuery) => {
  return http.request<{
    success: boolean;
    data: {
      list: MaterialPurchaseData[];
      total: number;
      statistics: {
        totalMaterials: number;
        totalAmount: string;
      };
    };
  }>("post", "/material/purchase/list", { data });
};

/** 获取物料采购统计数据 */
export const getMaterialPurchaseStatistics = () => {
  return http.request<{
    success: boolean;
    data: MaterialPurchaseStatistics;
  }>("get", "/material/purchase/statistics");
};

/** 获取物料销售列表 */
export const getMaterialSaleList = (data: MaterialSaleQuery) => {
  return http.request<{
    success: boolean;
    data: {
      list: MaterialSaleData[];
      total: number;
      statistics: {
        totalMaterials: number;
        totalAmount: string;
      };
    };
  }>("post", "/material/sale/list", { data });
};

/** 获取物料销售统计数据 */
export const getMaterialSaleStatistics = () => {
  return http.request<{
    success: boolean;
    data: MaterialSaleStatistics;
  }>("get", "/material/sale/statistics");
};
