<template>
  <div class="data-report">
    <!-- 时间筛选 -->
    <div class="filter-bar">
      <el-radio-group v-model="timeRange">
        <el-radio-button value="week">近7天</el-radio-button>
        <el-radio-button value="month">近30天</el-radio-button>
        <el-radio-button value="quarter">近90天</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 核心指标 -->
    <el-row :gutter="16">
      <el-col :span="6" v-for="kpi in kpis" :key="kpi.label">
        <div class="kpi-card">
          <div class="kpi-label">{{ kpi.label }}</div>
          <div class="kpi-value">{{ kpi.value }}</div>
          <div class="kpi-trend" :class="kpi.trendType">{{ kpi.trend }}</div>
        </div>
      </el-col>
    </el-row>

    <!-- 销售趋势图 -->
    <div class="chart-card" style="margin-top: 16px">
      <div class="card-header">
        <h3>销售趋势</h3>
        <el-radio-group v-model="chartMetric" size="small">
          <el-radio-button value="revenue">营业额</el-radio-button>
          <el-radio-button value="orders">订单数</el-radio-button>
          <el-radio-button value="customers">顾客数</el-radio-button>
        </el-radio-group>
      </div>
      <div ref="salesChart" style="height: 300px"></div>
    </div>

    <!-- 核销统计 & 时段分析 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="12">
        <div class="chart-card">
          <div class="card-header">
            <h3>优惠券核销统计</h3>
          </div>
          <div ref="couponChart" style="height: 280px"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-card">
          <div class="card-header">
            <h3>到店时段分布</h3>
          </div>
          <div ref="hourChart" style="height: 280px"></div>
        </div>
      </el-col>
    </el-row>

    <!-- 复购分析 -->
    <div class="chart-card" style="margin-top: 16px">
      <div class="card-header">
        <h3>复购率分析</h3>
      </div>
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="repurchase-item">
            <el-progress type="circle" :percentage="68" :width="100" :stroke-width="10" color="#409eff" />
            <div class="repurchase-label">整体复购率</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="repurchase-item">
            <el-progress type="circle" :percentage="45" :width="100" :stroke-width="10" color="#67c23a" />
            <div class="repurchase-label">30天内复购</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="repurchase-item">
            <el-progress type="circle" :percentage="82" :width="100" :stroke-width="10" color="#e6a23c" />
            <div class="repurchase-label">优惠券复购</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const timeRange = ref('month')
const chartMetric = ref('revenue')

const salesChart = ref(null)
const couponChart = ref(null)
const hourChart = ref(null)

const kpis = [
  { label: '总营业额', value: '¥86,520', trend: '↑ 12.5%', trendType: 'up' },
  { label: '订单总数', value: '1,089', trend: '↑ 8.3%', trendType: 'up' },
  { label: '客单价', value: '¥79.4', trend: '↑ 3.2%', trendType: 'up' },
  { label: '优惠券核销', value: '456', trend: '↑ 15.6%', trendType: 'up' }
]

function initCharts() {
  // 销售趋势
  const salesInstance = echarts.init(salesChart.value)
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date('2026-05-19')
    d.setDate(d.getDate() - 29 + i)
    return d.toISOString().split('T')[0].slice(5)
  })
  salesInstance.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: days, axisLabel: { fontSize: 11 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 11 } },
    series: [{
      type: 'line',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5000) + 1500),
      smooth: true,
      lineStyle: { width: 3, color: '#409eff' },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(64,158,255,0.3)' },
        { offset: 1, color: 'rgba(64,158,255,0.02)' }
      ]) }
    }]
  })

  // 优惠券核销
  const couponInstance = echarts.init(couponChart.value)
  couponInstance.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: 10 },
    series: [{
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['50%', '45%'],
      data: [
        { value: 328, name: '满减券', itemStyle: { color: '#f56c6c' } },
        { value: 180, name: '折扣券', itemStyle: { color: '#409eff' } },
        { value: 98, name: '赠品券', itemStyle: { color: '#67c23a' } },
        { value: 67, name: '特价券', itemStyle: { color: '#e6a23c' } }
      ],
      label: { formatter: '{b}\n{c}张' }
    }]
  })

  // 时段分布
  const hourInstance = echarts.init(hourChart.value)
  const hours = Array.from({ length: 14 }, (_, i) => `${i + 8}:00`)
  hourInstance.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: hours, axisLabel: { fontSize: 11 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 11 } },
    series: [{
      type: 'bar',
      data: [5, 12, 28, 45, 32, 38, 52, 48, 56, 42, 35, 22, 15, 8],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#f093fb' },
          { offset: 1, color: '#f5576c' }
        ]),
        borderRadius: [4, 4, 0, 0]
      }
    }]
  })

  window.addEventListener('resize', () => {
    salesInstance.resize()
    couponInstance.resize()
    hourInstance.resize()
  })
}

onMounted(initCharts)
</script>

<style scoped>
.filter-bar {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.kpi-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.kpi-label {
  font-size: 13px;
  color: #909399;
  margin-bottom: 6px;
}

.kpi-value {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
}

.kpi-trend {
  font-size: 12px;
  margin-top: 4px;
}

.kpi-trend.up {
  color: #67c23a;
}

.chart-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  font-size: 16px;
}

.repurchase-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
}

.repurchase-label {
  font-size: 14px;
  color: #606266;
}
</style>
