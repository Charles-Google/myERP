<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Download } from "@element-plus/icons-vue";
import {
  getPayableEvaluationList,
  getPayableEvaluationStatistics
} from "@/api/material";
import type { PayableEvaluationData } from "@/api/material";

defineOptions({
  name: "PayableEvaluation"
});

// 查询条件
const queryForm = ref({
  orderNo: "",
  inputValue: "",
  orderDate: ""
});

// 表格数据
const tableData = ref<PayableEvaluationData[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 统计数据
const statistics = ref({
  totalPayable: 0,
  totalPaid: 0,
  totalUnpaid: 0
});

// 获取表格数据
const fetchTableData = async () => {
  try {
    console.log("开始获取应付评估表数据");
    const response = await getPayableEvaluationList({
      page: currentPage.value,
      pageSize: pageSize.value,
      ...queryForm.value
    });
    console.log("应付评估表响应数据:", response);

    if (response.success && response.data) {
      console.log("设置表格数据:", response.data);
      tableData.value = response.data.list;
      total.value = response.data.total;
      statistics.value = response.data.statistics;
    }
  } catch (error) {
    console.error("获取表格数据失败:", error);
  }
};

// 获取统计数据
const fetchStatistics = async () => {
  try {
    console.log("开始获取应付评估表统计数据");
    const response = await getPayableEvaluationStatistics();
    console.log("应付评估表统计响应数据:", response);
    if (response.success && response.data) {
      statistics.value = response.data;
    }
  } catch (error) {
    console.error("获取统计数据失败:", error);
  }
};

// 处理查询
const handleSearch = () => {
  currentPage.value = 1;
  fetchTableData();
};

// 处理重置
const handleReset = () => {
  queryForm.value = {
    orderNo: "",
    inputValue: "",
    orderDate: ""
  };
  currentPage.value = 1;
  pageSize.value = 10;
  handleSearch();
};

// 处理导出
const handleExport = () => {
  console.log("导出数据");
};

// 处理分页变化
const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchTableData();
};

// 处理分页大小变化
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  fetchTableData();
};

// 初始化数据
onMounted(() => {
  fetchTableData();
  fetchStatistics();
});
</script>

<template>
  <div class="p-5 bg-white h-cal[calc(100vh-100px)]">
    <!-- 查询条件 -->
    <div class="bg-white rounded-lg p-5 mb-5">
      <div class="font-bold text-xl mb-4">查询条件</div>
      <el-form :model="queryForm" inline class="w-full text-base">
        <el-form-item label="单据编号" class="text-base">
          <el-input
            v-model="queryForm.orderNo"
            placeholder="请输入"
            class="text-base"
          />
        </el-form-item>
        <el-form-item label="单据日期" class="text-base">
          <el-date-picker
            v-model="queryForm.orderDate"
            type="date"
            placeholder="请选择"
            class="text-base"
          />
        </el-form-item>
        <el-form-item class="ml-auto">
          <el-button type="primary" class="text-base" @click="handleSearch"
            >查询</el-button
          >
          <el-button class="text-base" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <div class="bg-white border-t border-gray-200">
      <div class="flex justify-between items-center p-4">
        <div class="flex items-center space-x-4">
          <el-button
            class="border-1 border-blue-500 text-blue-400"
            aria-label="导出数据"
            tabindex="0"
            @keydown.enter="handleExport"
            @click="handleExport"
          >
            <span class="flex items-center">
              <el-icon class="mr-2"><Download /></el-icon>
              导出
            </span>
          </el-button>
        </div>
        <div class="flex space-x-4">
          <span class="bg-blue-500 text-white px-2 py-1 rounded text-base"
            >应付金额合计：{{ statistics.totalPayable.toLocaleString() }}</span
          >
          <span class="bg-blue-500 text-white px-2 py-1 rounded text-base"
            >已付金额合计：{{ statistics.totalPaid.toLocaleString() }}</span
          >
          <span class="bg-blue-500 text-white px-2 py-1 rounded text-base"
            >剩余未付金额合计：{{
              statistics.totalUnpaid.toLocaleString()
            }}</span
          >
        </div>
      </div>

      <el-table :data="tableData" class="w-full">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="date" label="单据日期" align="center" />
        <el-table-column prop="orderNo" label="单据编号" align="center" />
        <el-table-column prop="businessType" label="业务类型" align="center" />
        <el-table-column prop="payableAmount" label="应付金额" align="center" />
        <el-table-column prop="paidAmount" label="已付金额" align="center" />
        <el-table-column label="操作" width="100" align="center">
          <template #default>
            <el-button type="primary" link class="text-blue-500"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-between items-center p-4">
        <span class="text-gray-600">共 {{ total }} 项数据</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          class="justify-end"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
