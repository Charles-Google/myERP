// src/views/report/material-sale/index.vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Download } from "@element-plus/icons-vue";
import { getMaterialSaleList, getMaterialSaleStatistics } from "@/api/material";
import type { MaterialSaleData, MaterialSaleStatistics } from "@/api/material";

defineOptions({
  name: "MaterialSale"
});

// 查询条件
const queryForm = ref({
  contractNo: "",
  materialName: "",
  customerName: "",
  saleDate: ""
});

// 表格数据
const tableData = ref<MaterialSaleData[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 总计数据
const totalMaterials = ref(0);
const totalAmount = ref("");

// 统计数据
const statistics = ref({
  todayAmount: "",
  monthAmount: "",
  inventory: "",
  pending: ""
});

// 获取表格数据
const fetchTableData = async () => {
  try {
    console.log("开始获取销售列表数据");
    const response = await getMaterialSaleList({
      page: currentPage.value,
      pageSize: pageSize.value,
      ...queryForm.value
    });
    console.log("销售列表响应数据:", response);

    if (response.success && response.data) {
      console.log("设置表格数据:", response.data);
      tableData.value = response.data.list;
      total.value = response.data.total;
      totalMaterials.value = response.data.statistics.totalMaterials;
      totalAmount.value = response.data.statistics.totalAmount;
    }
  } catch (error) {
    console.error("获取表格数据失败:", error);
  }
};

// 获取统计数据
const fetchStatistics = async () => {
  try {
    console.log("开始获取销售统计数据");
    const response = await getMaterialSaleStatistics();
    console.log("销售统计响应数据:", response);
    if (response.success && response.data) {
      statistics.value = response.data;
    }
  } catch (error) {
    console.error("获取统计数据失败:", error);
  }
};

// 处理查询
const handleSearch = () => {
  console.log("触发查询操作");
  currentPage.value = 1;
  fetchTableData();
};

// 处理重置
const handleReset = () => {
  queryForm.value = {
    contractNo: "",
    materialName: "",
    customerName: "",
    saleDate: ""
  };
  handleSearch();
};

// 处理导出
const handleExport = () => {
  console.log("导出数据");
};

// 处理分页变化
const handlePageChange = (page: number) => {
  console.log("页码变化:", page);
  currentPage.value = page;
  fetchTableData();
};

// 处理分页大小变化
const handleSizeChange = (size: number) => {
  console.log("每页条数变化:", size);
  pageSize.value = size;
  currentPage.value = 1;
  fetchTableData();
};

// 初始化数据
onMounted(() => {
  console.log("组件挂载，开始初始化数据");
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
        <el-form-item label="合同编号" class="text-base">
          <el-input
            v-model="queryForm.contractNo"
            placeholder="请输入"
            class="text-base"
          />
        </el-form-item>
        <el-form-item label="物料名称" class="text-base">
          <el-input
            v-model="queryForm.materialName"
            placeholder="请输入"
            class="text-base"
          />
        </el-form-item>
        <el-form-item label="客户名称" class="text-base">
          <el-input
            v-model="queryForm.customerName"
            placeholder="请输入"
            class="text-base"
          />
        </el-form-item>
        <el-form-item label="销售日期" class="text-base">
          <el-date-picker
            v-model="queryForm.saleDate"
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
        <div class="flex space-x-6">
          <span class="bg-blue-500 text-white p-2 rounded"
            >物料总数量：{{ totalMaterials }}</span
          >
          <span class="bg-blue-500 text-white p-2 rounded"
            >销售总金额：{{ totalAmount }}</span
          >
        </div>
      </div>

      <el-table :data="tableData" class="w-full">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="saleDate" label="销售日期" align="center" />
        <el-table-column prop="contractNo" label="合同编号" align="center" />
        <el-table-column prop="customerName" label="客户名称" align="center" />
        <el-table-column
          prop="materialName"
          label="销售物料名称"
          align="center"
        />
        <el-table-column prop="specModel" label="规格型号" align="center" />
        <el-table-column label="操作" width="100" align="center">
          <template #default>
            <el-button type="primary" link class="text-blue-500"
              >销售记录</el-button
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
