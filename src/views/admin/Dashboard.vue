<template>
  <div class="dashboard">
    <!-- 核心指标 -->
    <el-row :gutter="16" class="stat-row">
      <el-col :span="6" v-for="stat in stats" :key="stat.label">
        <div class="stat-card">
          <div class="stat-icon" :style="{ background: stat.bg }">
            <el-icon :size="24" color="#fff"><component :is="stat.icon" /></el-icon>
          </div>
          <div class="stat-body">
            <div class="label">{{ stat.label }}</div>
            <div class="value">{{ stat.value }}</div>
            <div class="trend" :class="stat.trendType">
              {{ stat.trend }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="16">
        <div class="chart-card">
          <div class="card-header">
            <h3>经营趋势</h3>
            <el-radio-group v-model="chartType" size="small">
              <el-radio-button value="GMV">GMV</el-radio-button>
              <el-radio-button value="orders">订单</el-radio-button>
              <el-radio-button value="couponUsed">核销</el-radio-button>
            </el-radio-group>
          </div>
          <div ref="trendChart" style="height: 320px"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-card">
          <div class="card-header">
            <h3>会员等级分布</h3>
          </div>
          <div ref="levelChart" style="height: 320px"></div>
        </div>
      </el-col>
    </el-row>

    <!-- 商户排行 & 最新订单 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="12">
        <div class="chart-card">
          <div class="card-header">
            <h3>商户GMV排行</h3>
          </div>
          <el-table :data="topMerchants" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="商户名称" />
            <el-table-column prop="category" label="品类" width="80">
              <template #default="{ row }">
                <el-tag size="small">{{ row.category }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="monthlyGMV" label="月GMV" width="120">
              <template #default="{ row }">
                <span style="font-weight: 600; color: #f56c6c">¥{{ row.monthlyGMV.toLocaleString() }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-card">
          <div class="card-header">
            <h3>优惠券核销排行</h3>
          </div>
          <el-table :data="topCoupons" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="优惠券" />
            <el-table-column prop="merchantName" label="商户" width="120" />
            <el-table-column label="核销率" width="100">
              <template #default="{ row }">
                <el-progress :percentage="Math.round(row.used / row.claimed * 100)" :stroke-width="8" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { users, levelStats } from '../../mock/users'
import { merchants } from '../../mock/merchants'
import { coupons } from '../../mock/coupons'
import { getDailyStats } from '../../mock/orders'

const chartType = ref('GMV')
const trendChart = ref(null)
const levelChart = ref(null)

const stats = [
  { label: '总会员数', value: users.length.toLocaleString(), icon: 'User', bg: 'linear-gradient(135deg, #667eea, #764ba2)', trend: '↑ 12.5% 较上月', trendType: 'up' },
  { label: '活跃商户', value: merchants.filter(m => m.status === 'active').length, icon: 'Shop', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', trend: '↑ 3家 本月新增', trendType: 'up' },
  { label: '今日核销', value: '156', icon: 'Ticket', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', trend: '↑ 8.2% 较昨日', trendType: 'up' },
  { label: '本月GMV', value: '¥1,285,600', icon: 'Money', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', trend: '↑ 15.3% 较上月', trendType: 'up' }
]

const topMerchants = computed(() => {
  return [...merchants].sort((a, b) => b.monthlyGMV - a.monthlyGMV).slice(0, 8)
})

const topCoupons = computed(() => {
  return [...coupons].filter(c => c.status === 'active').sort((a, b) => b.used - a.used).slice(0, 8)
})

const dailyStats = getDailyStats(30)

let trendChartInstance = null
let levelChartInstance = null

function renderTrendChart() {
  if (!trendChart.value) return
  if (!trendChartInstance) {
    trendChartInstance = echarts.init(trendChart.value)
  }

  const key = chartType.value === 'GMV' ? 'GMV' : chartType.value === 'orders' ? 'orderCount' : 'couponUsed'
  const label = chartType.value === 'GMV' ? 'GMV(元)' : chartType.value === 'orders' ? '订单数' : '核销数'

  trendChartInstance.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: dailyStats.map(d => d.date.slice(5)), axisLabel: { fontSize: 11 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 11 } },
    series: [{
      type: 'line',
      data: dailyStats.map(d => d[key]),
      smooth: true,
      lineStyle: { width: 3, color: '#409eff' },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(64,158,255,0.3)' },
        { offset: 1, color: 'rgba(64,158,255,0.02)' }
      ]) },
      itemStyle: { color: '#409eff' }
    }]
  })
}

function renderLevelChart() {
  if (!levelChart.value) return
  if (!levelChartInstance) {
    levelChartInstance = echarts.init(levelChart.value)
  }

  levelChartInstance.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: 10, textStyle: { fontSize: 12 } },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '45%'],
      data: [
        { value: levelStats['普通会员'], name: '普通会员', itemStyle: { color: '#909399' } },
        { value: levelStats['银卡会员'], name: '银卡会员', itemStyle: { color: '#c0c4cc' } },
        { value: levelStats['金卡会员'], name: '金卡会员', itemStyle: { color: '#e6a23c' } },
        { value: levelStats['钻石会员'], name: '钻石会员', itemStyle: { color: '#409eff' } }
      ],
      label: { formatter: '{b}\n{c}人', fontSize: 12 },
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.2)' } }
    }]
  })
}

watch(chartType, renderTrendChart)

onMounted(() => {
  renderTrendChart()
  renderLevelChart()
  window.addEventListener('resize', () => {
    trendChartInstance?.resize()
    levelChartInstance?.resize()
  })
})
</script>

<style scoped>
.stat-row .el-col {
  margin-bottom: 0;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-body .label {
  font-size: 13px;
  color: #909399;
  margin-bottom: 4px;
}

.stat-body .value {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
}

.stat-body .trend {
  font-size: 12px;
  margin-top: 2px;
}

.stat-body .trend.up {
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
  font-weight: 600;
}
</style>
