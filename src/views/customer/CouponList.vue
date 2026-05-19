<template>
  <div class="coupon-list-page">
    <!-- 分类筛选 -->
    <div class="category-bar">
      <div
        v-for="cat in categories"
        :key="cat"
        class="category-item"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </div>
    </div>

    <!-- 搜索 -->
    <div class="search-bar">
      <el-input v-model="keyword" placeholder="搜索优惠券" prefix-icon="Search" size="small" />
    </div>

    <!-- 优惠券列表 -->
    <div class="coupon-cards">
      <div class="coupon-card" v-for="coupon in filteredCoupons" :key="coupon.id">
        <div class="coupon-left" :style="{ background: typeColors[coupon.type] }">
          <div class="coupon-value">
            <template v-if="coupon.type === '满减'">
              <span class="yen">¥</span>{{ coupon.discount }}
            </template>
            <template v-else-if="coupon.type === '折扣'">
              {{ coupon.discount * 10 }}<span class="unit">折</span>
            </template>
            <template v-else-if="coupon.type === '特价'">
              <span class="yen">¥</span>{{ coupon.discount }}
            </template>
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
            <el-button
              size="small"
              type="primary"
              round
              :disabled="claimedSet.has(coupon.id)"
              @click="claim(coupon)"
            >
              {{ claimedSet.has(coupon.id) ? '已领取' : '领取' }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { coupons as allCoupons } from '../../mock/coupons'

const activeCoupons = allCoupons.filter(c => c.status === 'active')

const keyword = ref('')
const activeCategory = ref('全部')
const categories = ['全部', '餐饮', '服装', '电子', '日用', '超市', '生鲜', '珠宝', '娱乐', '母婴']
const claimedSet = ref(new Set())

const typeColors = {
  '满减': 'linear-gradient(135deg, #f56c6c, #e6a23c)',
  '折扣': 'linear-gradient(135deg, #409eff, #667eea)',
  '赠品': 'linear-gradient(135deg, #67c23a, #38f9d7)',
  '特价': 'linear-gradient(135deg, #f093fb, #f5576c)'
}

const filteredCoupons = computed(() => {
  return activeCoupons.filter(c => {
    if (activeCategory.value !== '全部' && c.category !== activeCategory.value) return false
    if (keyword.value && !c.name.includes(keyword.value) && !c.merchantName.includes(keyword.value)) return false
    return true
  })
})

function claim(coupon) {
  claimedSet.value.add(coupon.id)
  ElMessage.success(`已领取「${coupon.name}」`)
}
</script>

<style scoped>
.coupon-list-page {
  padding: 0 0 16px;
}

.category-bar {
  display: flex;
  gap: 0;
  overflow-x: auto;
  background: #fff;
  padding: 10px 16px;
  margin-bottom: 8px;
}

.category-item {
  padding: 6px 14px;
  font-size: 13px;
  color: #606266;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.2s;
}

.category-item.active {
  background: #409eff;
  color: #fff;
}

.search-bar {
  padding: 0 16px;
  margin-bottom: 12px;
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
}

.coupon-left {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  padding: 16px 0;
}

.coupon-value {
  font-size: 28px;
  font-weight: 700;
}

.coupon-value .yen {
  font-size: 14px;
}

.coupon-value .unit {
  font-size: 14px;
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
</style>
