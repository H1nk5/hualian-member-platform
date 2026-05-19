<template>
  <div class="merchant-dashboard">
    <!-- 欢迎区 -->
    <div class="welcome-card">
      <div class="welcome-left">
        <h2>早上好，{{ merchantName }}</h2>
        <p>今天是 {{ today }}，祝生意兴隆！</p>
      </div>
      <div class="welcome-right">
        <el-button type="primary" @click="$router.push('/merchant/coupons')">
          <el-icon><Plus /></el-icon> 发优惠券
        </el-button>
      </div>
    </div>

    <!-- 今日数据 -->
    <el-row :gutter="16">
      <el-col :span="6" v-for="stat in todayStats" :key="stat.label">
        <div class="stat-card">
          <div class="stat-icon" :style="{ background: stat.bg }">
            <el-icon :size="20" color="#fff"><component :is="stat.icon" /></el-icon>
          </div>
          <div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value">{{ stat.value }}</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 待办事项 & 快捷操作 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="12">
        <div class="card">
          <h3>待办事项</h3>
          <div class="todo-list">
            <div class="todo-item" v-for="todo in todos" :key="todo.text">
              <el-badge :value="todo.count" :type="todo.type">
                <span>{{ todo.text }}</span>
              </el-badge>
              <el-button size="small" text type="primary">去处理</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card">
          <h3>快捷操作</h3>
          <div class="quick-actions">
            <div class="action-item" v-for="action in actions" :key="action.label" @click="action.fn">
              <div class="action-icon" :style="{ background: action.bg }">
                <el-icon :size="24" color="#fff"><component :is="action.icon" /></el-icon>
              </div>
              <span>{{ action.label }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 最近核销 -->
    <div class="card" style="margin-top: 16px">
      <div class="card-header">
        <h3>最近核销记录</h3>
        <el-button text type="primary">查看全部</el-button>
      </div>
      <el-table :data="recentVerifications" style="width: 100%">
        <el-table-column prop="time" label="时间" width="160" />
        <el-table-column prop="customer" label="顾客" width="100" />
        <el-table-column prop="coupon" label="优惠券" />
        <el-table-column prop="discount" label="优惠金额" width="100">
          <template #default="{ row }">
            <span style="color: #f56c6c; font-weight: 600">-¥{{ row.discount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="100">
          <template #default="{ row }">¥{{ row.orderAmount }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMerchantStore } from '../../stores/merchant'

const router = useRouter()
const merchantStore = useMerchantStore()

const merchantName = computed(() => merchantStore.currentMerchant?.name || '商户')
const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })

const todayStats = [
  { label: '今日营业额', value: '¥3,680', icon: 'Money', bg: 'linear-gradient(135deg, #f56c6c, #e6a23c)' },
  { label: '今日订单', value: '48', icon: 'Document', bg: 'linear-gradient(135deg, #409eff, #667eea)' },
  { label: '优惠券核销', value: '23', icon: 'Ticket', bg: 'linear-gradient(135deg, #67c23a, #38f9d7)' },
  { label: '新增会员', value: '12', icon: 'User', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' }
]

const todos = [
  { text: '待审核优惠券', count: 3, type: 'warning' },
  { text: '待回复评价', count: 5, type: 'primary' },
  { text: '库存预警商品', count: 2, type: 'danger' }
]

const actions = [
  { label: '发优惠券', icon: 'Ticket', bg: '#409eff', fn: () => router.push('/merchant/coupons') },
  { label: '查看顾客', icon: 'User', bg: '#67c23a', fn: () => router.push('/merchant/customers') },
  { label: '经营报表', icon: 'TrendCharts', bg: '#e6a23c', fn: () => router.push('/merchant/report') },
  { label: '店铺设置', icon: 'Setting', bg: '#909399', fn: () => {} }
]

const recentVerifications = [
  { time: '2026-05-19 14:32', customer: '张**', coupon: '满50减10', discount: 10, orderAmount: 68 },
  { time: '2026-05-19 13:18', customer: '李**', coupon: '招牌烩面8折', discount: 8, orderAmount: 40 },
  { time: '2026-05-19 12:45', customer: '王**', coupon: '满50减10', discount: 10, orderAmount: 55 },
  { time: '2026-05-19 11:20', customer: '赵**', coupon: '招牌烩面8折', discount: 6, orderAmount: 30 },
  { time: '2026-05-19 10:05', customer: '刘**', coupon: '满50减10', discount: 10, orderAmount: 72 }
]
</script>

<style scoped>
.welcome-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #fff;
}

.welcome-card h2 {
  font-size: 20px;
  margin-bottom: 4px;
}

.welcome-card p {
  opacity: 0.85;
  font-size: 14px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 14px;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-label {
  font-size: 13px;
  color: #909399;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #303133;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.card h3 {
  font-size: 16px;
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #f5f7fa;
  border-radius: 8px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-item:hover {
  background: #ecf5ff;
  transform: translateY(-2px);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-item span {
  font-size: 13px;
  color: #606266;
}
</style>
