<script setup lang="ts">
defineOptions({
  name: "ReceivableEvaluation"
});
</script>

<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="font-medium">应收评估表</span>
        </div>
      </template>
      <div class="card-content">
        <!-- 内容区域 -->
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.main {
  @apply w-full h-full p-4;
}
.box-card {
  @apply w-full h-full;
}
.card-header {
  @apply flex items-center justify-between;
}
.card-content {
  @apply min-h-[500px];
}
</style>
