<template>
  <div class="profile-page">
    <!-- 会员卡片 -->
    <div class="member-card">
      <div class="card-top">
        <el-avatar :size="56" style="background: rgba(255,255,255,0.2); font-size: 24px">
          {{ user?.name?.[0] || '会' }}
        </el-avatar>
        <div class="user-info">
          <div class="user-name">{{ user?.name || '会员' }}</div>
          <div class="user-level">
            <el-tag size="small" effect="dark" :type="levelTagType">{{ user?.level || '普通会员' }}</el-tag>
          </div>
        </div>
      </div>
      <div class="card-stats">
        <div class="card-stat">
          <div class="stat-value">{{ user?.points || 0 }}</div>
          <div class="stat-label">积分</div>
        </div>
        <div class="card-stat">
          <div class="stat-value">¥{{ user?.balance || 0 }}</div>
          <div class="stat-label">余额</div>
        </div>
        <div class="card-stat">
          <div class="stat-value">{{ user?.visitCount || 0 }}</div>
          <div class="stat-label">到店</div>
        </div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-card">
      <div class="menu-item" v-for="item in menus" :key="item.label">
        <div class="menu-left">
          <el-icon :size="20" :color="item.color"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </div>
        <el-icon color="#c0c4cc"><ArrowRight /></el-icon>
      </div>
    </div>

    <!-- 消费记录 -->
    <div class="section">
      <div class="section-header">
        <h3>最近消费</h3>
        <span class="more">全部 ></span>
      </div>
      <div class="order-list">
        <div class="order-item" v-for="order in recentOrders" :key="order.id">
          <div class="order-left">
            <div class="order-merchant">{{ order.merchant }}</div>
            <div class="order-time">{{ order.time }}</div>
          </div>
          <div class="order-right">
            <div class="order-amount">-¥{{ order.amount }}</div>
            <div class="order-discount" v-if="order.discount">已优惠¥{{ order.discount }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 等级进度 -->
    <div class="section">
      <div class="section-header">
        <h3>升级进度</h3>
      </div>
      <div class="level-progress">
        <div class="level-bar">
          <div class="level-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="level-info">
          <span>当前：{{ user?.level || '普通会员' }}</span>
          <span>下一级：{{ nextLevel }}</span>
        </div>
        <div class="level-tip">还需消费 ¥{{ remaining }} 升级</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)

const levelTagType = computed(() => {
  const map = { '普通会员': 'info', '银卡会员': '', '金卡会员': 'warning', '钻石会员': 'primary' }
  return map[user.value?.level] || 'info'
})

const nextLevel = computed(() => {
  const levels = ['普通会员', '银卡会员', '金卡会员', '钻石会员']
  const idx = levels.indexOf(user.value?.level || '普通会员')
  return levels[Math.min(idx + 1, levels.length - 1)]
})

const progressPercent = computed(() => {
  const spent = user.value?.totalSpent || 0
  if (spent < 5000) return (spent / 5000) * 33
  if (spent < 20000) return 33 + ((spent - 5000) / 15000) * 33
  if (spent < 50000) return 66 + ((spent - 20000) / 30000) * 34
  return 100
})

const remaining = computed(() => {
  const spent = user.value?.totalSpent || 0
  if (spent < 5000) return 5000 - spent
  if (spent < 20000) return 20000 - spent
  if (spent < 50000) return 50000 - spent
  return 0
})

const menus = [
  { label: '我的积分', icon: 'Coin', color: '#e6a23c' },
  { label: '我的余额', icon: 'Wallet', color: '#409eff' },
  { label: '收货地址', icon: 'Location', color: '#67c23a' },
  { label: '帮助中心', icon: 'QuestionFilled', color: '#909399' },
  { label: '联系客服', icon: 'ChatDotRound', color: '#f093fb' }
]

const recentOrders = [
  { id: 1, merchant: '兰考烩面馆', time: '今天 14:32', amount: 68, discount: 10 },
  { id: 2, merchant: '蜜雪冰城', time: '今天 12:15', amount: 15, discount: 4 },
  { id: 3, merchant: '永辉超市', time: '昨天 18:20', amount: 156, discount: 10 },
  { id: 4, merchant: '万达影城', time: '昨天 14:00', amount: 76, discount: 5 },
  { id: 5, merchant: '名创优品', time: '05-16 16:45', amount: 89, discount: 15 }
]
</script>

<style scoped>
.profile-page {
  padding: 0 0 16px;
}

.member-card {
  margin: 0 16px 16px;
  background: linear-gradient(135deg, #1a1a2e, #2d2d44);
  border-radius: 14px;
  padding: 20px;
  color: #fff;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.user-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.card-stats {
  display: flex;
  justify-content: space-around;
}

.card-stat {
  text-align: center;
}

.card-stat .stat-value {
  font-size: 20px;
  font-weight: 700;
}

.card-stat .stat-label {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 2px;
}

.menu-card {
  margin: 0 16px 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f5f7fa;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background: #f5f7fa;
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.section {
  margin: 0 16px 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.section-header h3 {
  font-size: 15px;
  font-weight: 600;
}

.section-header .more {
  font-size: 13px;
  color: #909399;
  cursor: pointer;
}

.order-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f5f7fa;
}

.order-item:last-child {
  border-bottom: none;
}

.order-merchant {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
}

.order-time {
  font-size: 12px;
  color: #909399;
}

.order-amount {
  font-size: 15px;
  font-weight: 600;
  text-align: right;
}

.order-discount {
  font-size: 11px;
  color: #67c23a;
  text-align: right;
}

.level-progress {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
}

.level-bar {
  height: 8px;
  background: #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.level-fill {
  height: 100%;
  background: linear-gradient(90deg, #409eff, #667eea);
  border-radius: 4px;
  transition: width 0.5s;
}

.level-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #606266;
  margin-bottom: 6px;
}

.level-tip {
  font-size: 12px;
  color: #909399;
  text-align: center;
}
</style>
