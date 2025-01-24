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

// 应付评估表相关类型
export type PayableEvaluationQuery = {
  page: number;
  pageSize: number;
  orderNo?: string;
  inputValue?: string;
  orderDate?: string;
};

export type PayableEvaluationData = {
  id: string;
  date: string;
  orderNo: string;
  businessType: string;
  payableAmount: number;
  paidAmount: number;
};

export type PayableEvaluationStatistics = {
  totalPayable: number;
  totalPaid: number;
  totalUnpaid: number;
};

// 应收评估表相关类型
export type ReceivableEvaluationQuery = {
  page: number;
  pageSize: number;
  orderNo?: string;
  materialName?: string;
  orderDate?: string;
};

export type ReceivableEvaluationData = {
  id: string;
  date: string;
  orderNo: string;
  businessType: string;
  receivableAmount: number;
  receivedAmount: number;
};

export type ReceivableEvaluationStatistics = {
  totalReceivable: number;
  totalReceived: number;
  totalUnreceived: number;
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

/** 获取应付评估表列表 */
export const getPayableEvaluationList = (data: PayableEvaluationQuery) => {
  return http.request<{
    success: boolean;
    data: {
      list: PayableEvaluationData[];
      total: number;
      page: number;
      pageSize: number;
      statistics: PayableEvaluationStatistics;
    };
  }>("post", "/payable/evaluation/list", { data });
};

/** 获取应付评估表统计数据 */
export const getPayableEvaluationStatistics = () => {
  return http.request<{
    success: boolean;
    data: PayableEvaluationStatistics;
  }>("get", "/payable/evaluation/statistics");
};

/** 获取应收评估表列表 */
export const getReceivableEvaluationList = (
  data: ReceivableEvaluationQuery
) => {
  return http.request<{
    success: boolean;
    data: {
      list: ReceivableEvaluationData[];
      total: number;
      page: number;
      pageSize: number;
      statistics: ReceivableEvaluationStatistics;
    };
  }>("post", "/receivable/evaluation/list", { data });
};

/** 获取应收评估表统计数据 */
export const getReceivableEvaluationStatistics = () => {
  return http.request<{
    success: boolean;
    data: ReceivableEvaluationStatistics;
  }>("get", "/receivable/evaluation/statistics");
};
