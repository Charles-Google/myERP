import { ref, unref, watch, onUnmounted } from "vue";
import type { Ref } from "vue";
import { useTimeoutFn } from "@vueuse/core";
import type { EChartsOption } from "echarts";
import echarts from "@/plugins/echarts";
import { useAppStoreHook } from "@/store/modules/app";
import { useEventListener } from "@vueuse/core";

export type ECOption = EChartsOption;

export const useECharts = (
  elRef: Ref<HTMLDivElement | undefined>,
  autoChartSize = true,
  animation = true
) => {
  const chartInstance = ref<echarts.ECharts>();

  // 初始化图表
  const initCharts = () => {
    const el = unref(elRef);
    if (!el) return;
    chartInstance.value = echarts.init(el);
  };

  // 更新图表
  const setOptions = (option: ECOption) => {
    if (!chartInstance.value) {
      initCharts();
    }
    if (!chartInstance.value) return;
    chartInstance.value.setOption(option);
    if (!animation) {
      chartInstance.value.setOption({
        animation: false
      });
    }
  };

  // 获取图表实例
  const getInstance = () => {
    if (!chartInstance.value) {
      initCharts();
    }
    return chartInstance.value;
  };

  // 更新图表大小
  const resize = () => {
    chartInstance.value?.resize();
  };

  // 监听主题变化
  watch(
    () => useAppStoreHook().getDarkMode,
    () => {
      if (chartInstance.value) {
        chartInstance.value.dispose();
        initCharts();
      }
    }
  );

  // 自动适应容器大小
  if (autoChartSize) {
    useEventListener(window, "resize", resize);
  }

  onUnmounted(() => {
    if (!chartInstance.value) return;
    chartInstance.value.dispose();
    chartInstance.value = undefined;
  });

  return {
    setOptions,
    getInstance,
    resize
  };
}; 