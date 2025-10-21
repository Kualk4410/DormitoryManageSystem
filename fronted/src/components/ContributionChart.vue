<template>
  <div class="contribute-chart">
    <!-- 气泡提示框 -->
    <div
      v-if="tooltipVisible"
      :style="{
        left: tooltipX + 'px',
        top: tooltipY + 'px',
      }"
      class="custom-tooltip"
    >
      <div class="tooltip-name">{{ tooltipName }}</div>
      <div class="tooltip-count">清洁次数: {{ tooltipCount }}</div>
    </div>

    <!-- 图表容器 -->
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chartRef = ref(null);
let myChart = null;

// 气泡状态
const tooltipVisible = ref(false);
const tooltipName = ref("");
const tooltipCount = ref(0);
const tooltipX = ref(0);
const tooltipY = ref(0);

onMounted(() => {
  const ctx = chartRef.value.getContext("2d");

  const labels = ["代双遥", "李一赫", "熊雨田", "冯奕铖", "杨竣胜", "张子鸣"];
  const data = [6, 6, 3, 4, 3, 2];
  const colors = [
    "rgb(54, 162, 235)",
    "rgb(75, 192, 192)",
    "rgb(255, 159, 64)",
    "rgb(255, 99, 132)",
    "rgb(153, 102, 255)",
    "rgb(59, 130, 246)",
  ];

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false, // 禁用默认 tooltip
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
    },
  });

  // 点击柱形事件
  chartRef.value.addEventListener("click", (e) => {
    const activePoints = myChart.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      false
    );

    if (activePoints.length > 0) {
      const firstPoint = activePoints[0];
      const index = firstPoint.index;

      // 设置气泡内容
      tooltipName.value = labels[index];
      tooltipCount.value = data[index];

      // 计算气泡位置（相对于canvas）
      const canvasRect = chartRef.value.getBoundingClientRect();
      tooltipX.value = e.clientX - canvasRect.left + 10;
      tooltipY.value = e.clientY - canvasRect.top - 60; // 往上偏移

      // 显示气泡
      tooltipVisible.value = true;
    } else {
      // 点击空白处隐藏气泡
      tooltipVisible.value = false;
    }
  });

  // 点击其他地方隐藏气泡
  document.addEventListener("click", (e) => {
    if (!chartRef.value.contains(e.target)) {
      tooltipVisible.value = false;
    }
  });
});
</script>

<style scoped>
.contribute-chart {
  width: 100%;
  height: 240px;
  position: relative; /* 让气泡可以绝对定位 */
}

.custom-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  pointer-events: none; /* 避免鼠标事件被气泡遮挡 */
  z-index: 10;
  white-space: nowrap;
}

.tooltip-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.tooltip-count {
  font-size: 13px;
}
</style>
