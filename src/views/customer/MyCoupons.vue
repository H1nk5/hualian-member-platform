<template>
  <div class="my-coupons">
    <!-- Tab切换 -->
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span class="tab-count">{{ tab.count }}</span>
      </div>
    </div>

    <!-- 优惠券列表 -->
    <div class="coupon-cards">
      <div
        class="coupon-card"
        v-for="coupon in displayCoupons"
        :key="coupon.id"
        :class="{ used: coupon.status === 'used', expired: coupon.status === 'expired' }"
      >
        <div class="coupon-left" :style="{ background: coupon.status === 'unused' ? typeColors[coupon.type] : '#c0c4cc' }">
          <div class="coupon-value">
            <template v-if="coupon.type === '满减'">¥{{ coupon.discount }}</template>
            <template v-else-if="coupon.type === '折扣'">{{ coupon.discount * 10 }}折</template>
            <template v-else-if="coupon.type === '特价'">¥{{ coupon.discount }}</template>
            <template v-else>赠品</template>
          </div>
          <div class="coupon-cond" v-if="coupon.minSpend">满{{ coupon.minSpend }}可用</div>
        </div>
        <div class="coupon-right">
          <div class="coupon-info">
            <h4>{{ coupon.name }}</h4>
            <div class="merchant">{{ coupon.merchantName }}</div>
            <div class="coupon-date">截止 {{ coupon.endDate }}</div>
          </div>
          <div class="coupon-action">
            <template v-if="coupon.status === 'unused'">
              <el-button size="small" type="primary" round>去使用</el-button>
            </template>
            <template v-else-if="coupon.status === 'used'">
              <el-tag type="info" size="small">已使用</el-tag>
            </template>
            <template v-else>
              <el-tag type="info" size="small">已过期</el-tag>
            </template>
          </div>
        </div>
        <!-- 状态角标 -->
        <div class="status-badge" v-if="coupon.status !== 'unused'">
          {{ coupon.status === 'used' ? '已使用' : '已过期' }}
        </div>
      </div>
    </div>

    <div class="empty" v-if="displayCoupons.length === 0">
      <el-icon :size="48" color="#c0c4cc"><Document /></el-icon>
      <p>暂无优惠券</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('unused')

const tabs = [
  { key: 'unused', label: '未使用', count: 5 },
  { key: 'used', label: '已使用', count: 12 },
  { key: 'expired', label: '已过期', count: 3 }
]

const typeColors = {
  '满减': 'linear-gradient(135deg, #f56c6c, #e6a23c)',
  '折扣': 'linear-gradient(135deg, #409eff, #667eea)',
  '赠品': 'linear-gradient(135deg, #67c23a, #38f9d7)',
  '特价': 'linear-gradient(135deg, #f093fb, #f5576c)'
}

const myCoupons = ref([
  { id: 1, name: '满50减10', type: '满减', discount: 10, minSpend: 50, merchantName: '兰考烩面馆', endDate: '2026-05-31', status: 'unused' },
  { id: 2, name: '满100减25', type: '满减', discount: 25, minSpend: 100, merchantName: '老王烧烤', endDate: '2026-05-31', status: 'unused' },
  { id: 3, name: '第二杯半价', type: '折扣', discount: 0.75, minSpend: 0, merchantName: '蜜雪冰城', endDate: '2026-05-31', status: 'unused' },
  { id: 4, name: '满200减50', type: '满减', discount: 50, minSpend: 200, merchantName: '森马服饰', endDate: '2026-06-01', status: 'unused' },
  { id: 5, name: '电影票立减5元', type: '满减', discount: 5, minSpend: 30, merchantName: '万达影城', endDate: '2026-05-31', status: 'unused' },
  { id: 6, name: '满30减8', type: '满减', discount: 8, minSpend: 30, merchantName: '兰考烩面馆', endDate: '2026-02-28', status: 'used' },
  { id: 7, name: '全场85折', type: '折扣', discount: 0.85, minSpend: 0, merchantName: '鸿星尔克', endDate: '2026-04-30', status: 'used' },
  { id: 8, name: '满100减10', type: '满减', discount: 10, minSpend: 100, merchantName: '永辉超市', endDate: '2026-04-15', status: 'used' },
  { id: 9, name: '鸡排+饮品套餐15元', type: '特价', discount: 15, minSpend: 0, merchantName: '正新鸡排', endDate: '2026-04-30', status: 'used' },
  { id: 10, name: '满68减15', type: '满减', discount: 15, minSpend: 68, merchantName: '名创优品', endDate: '2026-04-20', status: 'used' },
  { id: 11, name: '春节特惠满30减8', type: '满减', discount: 8, minSpend: 30, merchantName: '兰考烩面馆', endDate: '2026-02-28', status: 'expired' },
  { id: 12, name: '年货节满200减30', type: '满减', discount: 30, minSpend: 200, merchantName: '永辉超市', endDate: '2026-02-15', status: 'expired' },
  { id: 13, name: '元旦特惠', type: '满减', discount: 20, minSpend: 100, merchantName: '华联城', endDate: '2026-01-03', status: 'expired' }
])

const displayCoupons = computed(() => {
  return myCoupons.value.filter(c => c.status === activeTab.value)
})
</script>

<style scoped>
.my-coupons {
  padding: 0 0 16px;
}

.tabs {
  display: flex;
  background: #fff;
  padding: 12px 16px;
  margin-bottom: 12px;
  gap: 24px;
}

.tab-item {
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  position: relative;
  padding-bottom: 8px;
}

.tab-item.active {
  color: #409eff;
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #409eff;
  border-radius: 1px;
}

.tab-count {
  font-size: 11px;
  color: #909399;
  margin-left: 4px;
}

.coupon-cards {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.coupon-card {
  display: flex;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  position: relative;
}

.coupon-card.used,
.coupon-card.expired {
  opacity: 0.6;
}

.coupon-left {
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  padding: 14px 0;
}

.coupon-value {
  font-size: 24px;
  font-weight: 700;
}

.coupon-cond {
  font-size: 10px;
  opacity: 0.85;
  margin-top: 2px;
}

.coupon-right {
  flex: 1;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.coupon-info h4 {
  font-size: 14px;
  margin-bottom: 3px;
}

.coupon-info .merchant {
  font-size: 12px;
  color: #909399;
  margin-bottom: 2px;
}

.coupon-info .coupon-date {
  font-size: 11px;
  color: #c0c4cc;
}

.status-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 10px;
  color: #c0c4cc;
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 4px;
}

.empty {
  text-align: center;
  padding: 60px 0;
  color: #c0c4cc;
}

.empty p {
  margin-top: 12px;
  font-size: 14px;
}
</style>
